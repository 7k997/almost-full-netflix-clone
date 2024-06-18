import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai"
import { useCallback } from "react";

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

function Profiles() {
    const router = useRouter();
    const { data: user } = useCurrentUser();
    const [profile, mutate] = useCurrentProfile();
    const MAX_PROFILE_NUMBER = 4;

    const selectProfile = useCallback((profile: any) => {
        mutate({
            profile,
        })

        router.push("/movies");
    }, [mutate, router])

    return (
        <>
            <Navbar />
            <div className="flex pt-20 px-6 w-full h-screen justify-center">
                <div className="flex flex-col w-full pt-20">
                    <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                    <div className="flex flex-wrap items-start justify-center gap-8 mt-10">
                        {user?.profiles.map((profile: any, i: number) => (
                            <div key={i} className="group basis-[45%] lg:basis-0 items-center justify-center flex flex-col" onClick={() => selectProfile(profile)}>
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                    <img src="/avatar_default_1.png" alt="profile_1" />
                                </div>
                                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                    {profile?.name}
                                </div>
                            </div>
                        ))}
                        {user?.profiles.length < MAX_PROFILE_NUMBER &&
                            <div className="group basis-[45%] lg:basis-0 items-center justify-center flex" onClick={() => router.push("/profilesNew")}>
                                <div className="w-20 h-20 mb-auto md:w-32 md:h-32 rounded-md flex items-center justify-center border-2 border-gray-600 group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                    <AiOutlinePlus size={"45%"} color="white" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profiles