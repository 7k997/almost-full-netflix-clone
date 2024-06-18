import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import useStripe from "@/hooks/useStripe";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback } from "react";
import axios from "axios";
import { format } from "date-fns";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment/create?type=p`);
    const products = await response.json();

    return {
        props: {
            products,
        }
    }
}

function Plans({ products }: any) {
    const router = useRouter();
    const { data: user } = useCurrentUser();
    const { data: subscription } = useStripe("subscription");

    const subscriptionClickHandler = useCallback(async (choosenProduct: any) => {
        const response = await axios.post(`/api/payment/create`, {
            productId: `${choosenProduct?.productData?.id}`,
        });

        if (response && response.data.url) {
            window.location.href = response.data.url;
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="text-white flex flex-col pt-20 gap-6 px-6 md:px-32 xl:px-60">
                <h1 className="font-bold text-3xl mb-6 border-b-[1px] border-b-[#282c2d]">Edit Profile</h1>
                <div className="flex">
                    <Image onClick={() => router.push("/profiles")} className="rounded-md" src={"/avatar_default_1.png"} alt="avatar_default_1" width={0} sizes="100vw" height={0} style={{ width: "48px", height: "48px" }}></Image>
                    <div className="ml-6 w-full">
                        <h2 onClick={() => router.push("/profiles")} className="p-2 bg-gray-500">test@testmail.com</h2>
                        <div className="mt-6">
                            <h3 className="font-bold pb-2 border-b-[1px] border-[#282c2d]">Plans</h3>
                            <div>
                                <p>{subscription && subscription[0] ? `Renewal Date: ${format(subscription[0].stripeCurrentPeriodEnd, "dd.mm.yyyy HH:mm")}` : "NOT SUBSCRIBED"}</p>
                                {!!products && Object.entries(products).map(([productId, productData]: [string, any]) => {
                                    const currentPackage = productData.default_price === (subscription && subscription[0] && subscription[0].stripePriceId);
                                    return (
                                        <div key={productId} className="flex justify-between p-2 flex-grow items-center text-center">
                                            <div className="text-left">
                                                <h5 className="font-bold">{productData.name}</h5>
                                                <h6>{productData.description}</h6>
                                            </div>

                                            <button onClick={() => subscriptionClickHandler({ productId, productData })} className={`px-2 py-2 rounded-md ${!currentPackage ? "bg-netflix_red" : "bg-gray-600"}`}>{!currentPackage ? "Subscribe" : "Current"}</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={() => signOut()} className="mt-6 px-2 py-2 w-full bg-netflix_red rounded-md">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Plans;