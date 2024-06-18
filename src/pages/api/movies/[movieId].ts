import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        await serverAuth(req, res);
        const { movieId } = req.query;

        if (!movieId || typeof(movieId) !== "string") throw new Error("Invalid movie");

        const movieFound = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movieFound) throw new Error("Invalid movie");

        return res.status(200).json(movieFound);

    } catch (error) {
        console.log(error);

    }
};