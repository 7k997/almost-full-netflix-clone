import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if ((req.method !== "POST") && (req.method !== "DELETE")) return res.status(405).end()
    try {
        const currentUser = await serverAuth(req, res);

        const { movieId } = req.body;
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) throw new Error("Movie error");

        var withoutMovie = currentUser.favoriteIds;
        if (req.method === "DELETE") {
            withoutMovie = withoutMovie.filter(movId => movId !== movieId);
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || "",
            },
            data: {
                favoriteIds: (req.method === "POST") ? {
                    push: movieId,
                } : withoutMovie
            }
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}