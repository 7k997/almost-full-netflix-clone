import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

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
    return {
        props: {},
    }
}

function success() {

    return (
        <div className="relative h-screen w-screen">
            <Navbar />
            <div className="flex h-full relative flex-col justify-center items-center text-white text-center pt-20">
                <FaCircleCheck className="" fill="white" size={60} />
                <h1 className="text-3xl p-5">Payment Successful!</h1>
                <p className="text-2xl font-thin p-3">Thank you for your purchase!</p>
                <p className="text-lg font-thin p-5">..Payment is going to be recurring monthly..</p>
                <Link href="/movies" className="mt-6 px-6 py-4 bg-netflix_red rounded-md text-2xl font-bold cursor-pointer">Proceed to movies</Link>
            </div>
        </div>
    )
}
export default success