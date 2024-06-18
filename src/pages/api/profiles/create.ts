import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end()

    try {
        const { name, supervision, avatar } = req.body;
        const currentUser = await serverAuth(req, res);

        const duplicateName = await prismadb.profile.findUnique({
            where: {
                name,
            }
        })

        if (duplicateName) return res.status(422).json({ error: "Name already exists" })

        const profile = await prismadb.profile.create({
            data: {
                userId: currentUser?.id,
                name,
                supervision,
                avatar: "",
            }
        });

        return res.status(200).json(profile);
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
