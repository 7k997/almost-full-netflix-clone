import Stripe from "stripe"
import { NextApiResponse, NextApiRequest } from "next";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const buf = await buffer(req);
    const rawBody: string = buf.toString();
    const sig = req.headers["stripe-signature"]!;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error: any) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
        case "checkout.session.completed":
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            if (!session?.metadata?.userId) {
                return res.status(400).end();
            }
            await prismadb.userSubscription.create({
                data: {
                    userId: session.metadata.userId,
                    stripeCustomerId: subscription.customer as string,
                    stripeSubscriptionId: subscription.id,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                }
            })

            break;

        case "invoice.payment_succeeded":
            const subscription2 = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            await prismadb.userSubscription.update({
                where: {
                    stripeSubscriptionId: subscription2.id,
                },
                data: {
                    stripePriceId: subscription2.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription2.current_period_end * 1000),
                }
            })

            break;

        default:
            console.log(`Webhook unhandled error: ${event.type}`);
    }

    res.status(200).json({ received: true });
}