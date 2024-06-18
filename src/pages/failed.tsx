import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { FaCircleXmark } from "react-icons/fa6";
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

function failed() {

    return (
        <div className="relative h-screen w-screen">
            <Navbar />
            <div className="flex h-full relative flex-col justify-center items-center text-white text-center pt-20">
                <FaCircleXmark className="" fill="white" size={60} />
                <h1 className="text-3xl p-5">Payment Failed!</h1>
                <p className="text-2xl font-thin p-3">Try again later!</p>
                <Link href="/plans" className="mt-6 px-6 py-4 bg-netflix_red rounded-md text-2xl font-bold cursor-pointer">Back</Link>
            </div>
        </div>
    )
}
export default failed