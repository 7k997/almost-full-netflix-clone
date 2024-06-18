import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import Input from "@/components/Input";
import Image from 'next/image'

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

function ProfilesNew() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [supervision, setSupervision] = useState(false);
    const createNewProfile = useCallback(async (e: FormEvent) => {
        e.preventDefault()
        try {
            const profileCreated = await axios.post("/api/profiles/create", {
                name,
                supervision,
                avatar,
            })
            router.replace("/movies")
        } catch (e: any) {
            alert(e.message)
        }
    }, [name, supervision, avatar, router]);

    return (
        <>
            <Navbar />
            <div className="flex pt-20 px-6 w-full h-screen justify-center">
                <div className="flex flex-col w-full pt-20">
                    <h1 className="text-3xl md:text-6xl text-white text-center">Fill profile info..</h1>
                    <div className="flex items-start justify-center gap-8 mt-10">
                        <form onSubmit={(e) => createNewProfile(e)}>
                            <div className="relative w-24 h-24 mx-auto my-auto mb-6 rounded-md">
                                <Image style={{ objectFit: 'contain' }} fill className="cursor-pointer rounded-md" src="/avatar_default_1.png" alt="avatar_default_1" />
                            </div>
                            <Input id="name" value={name} bg="bg-[#333333]" label="name" onChange={(ev: any) => setName(ev.target.value)} type="text" />
                            <span className="text-white flex justify-between items-end">
                                <span className="text-2xl">Kids account</span>
                                <input className="text-2xl mt-4 h-6 w-6 rounded-full" type="checkbox" checked={supervision} onChange={(ev) => setSupervision(ev.target.checked)} id="supervision" />
                            </span>
                            <button className="py-3 bg-netflix_red text-white rounded-md w-full mt-10 hover:bg-red-700 transition" type="submit">Create profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilesNew