import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

import Billboard from "@/components/Billboard";
import MoviesCategory from "@/components/MoviesCategory";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites"
import Navbar from "@/components/Navbar";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import InfoModal from "@/components/InfoModal";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";

export async function getServerSideProps({ req, res }: any) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    // const sub = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment/create?type=subscription`);
    const useSubFound: any = await prismadb.userSubscription.findMany({
        where: {
            userId: session?.user?.id,
        }
    });

    if (!useSubFound || !useSubFound[0]) {
        return {
            redirect: {
                destination: "/plans",
                permanent: false,
            }
        }
    }

    const isActive = useSubFound[0].stripePriceId && useSubFound[0].stripeCurrentPeriodEnd?.getTime() + 86_400_400 > Date.now();
    if (!useSubFound || !isActive) {
        return {
            redirect: {
                destination: "/plans",
                permanent: false,
            }
        }
    }

    return {
        props: {},
    }
}

function Movies() {
    var { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const [ profile ] = useCurrentProfile();

    if (profile?.profile?.supervision) {
        movies = movies.filter((movie: any) => movie.genre === "Cartoon");
    }

    return (
        <div>
            <Navbar />
            <InfoModal />
            <Billboard />
            {favorites.length && <MoviesCategory category="My List" movies={favorites} />}
            <MoviesCategory category="Trending Now" movies={movies} />
        </div>
    )
}
export default Movies