import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
    typescript: true
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST" && req.method !== "GET") return res.status(405).end();

    if (req.method === "GET") {
        const { type } = req.query;
        if (type === 'subscription') {
            try {
                const currentUser = await serverAuth(req, res);

                const data: any = await prismadb.userSubscription.findMany({
                    where: {
                        userId: currentUser.id
                    }
                });

                if (!data) throw new Error("Plan error");

                const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + 86_400_400 > Date.now();

                return res.status(200).json({
                    ...data,
                    isActive: !!isActive,
                });

            } catch (error) {
                console.log("err ", error);
                return res.status(400).end();
            }
        } else if(type === 'p') {
            try {
                const products = await stripe.products.list();
                if (!products) throw new Error("Products error");
                return res.status(200).json(products?.data);
            } catch (error) {
                return res.status(400).end()
            }
        }
    }

    if (req.method === "POST") {
        const { productId } = req.body;
        try {
            const successReturnUrl = `${process.env.NEXT_PUBLIC_APP_URL}success`
            const failedReturnUrl = `${process.env.NEXT_PUBLIC_APP_URL}failed`
            /* if (userSubscription && userSubscription.stripeCustomerId) {
                const stripeSession = await stripe.billingPortal.sessions.create({
                    customer: userSubscription.stripeCustomerId,
                    return_url: moviesReturnUrl,
                })

                return { data: stripeSession.url };
            }
            */
            const currentUser = await serverAuth(req, res);
            const products = await stripe.products.list();

            const found_product = products?.data.find(product => product.id === productId);

            const stripeSession = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                customer_email: currentUser.email,
                line_items: [
                    {
                        quantity: 1,
                        price: found_product?.default_price as string,
                    },
                ],
                metadata: {
                    userId: currentUser?.id,
                },
                success_url: successReturnUrl,
                cancel_url: failedReturnUrl,
            }, undefined);

            return res.status(200).json({ url: stripeSession.url });
        } catch (error) {
            console.log('error', error);
            return res.status(400).end();
        }
    }

}