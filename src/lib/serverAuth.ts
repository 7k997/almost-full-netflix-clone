import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req,res,authOptions);

    if (!session?.user?.email) throw new Error("No session");
    const userFound = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
        include: {
            profiles: true,
        },
    });
    if (!userFound) throw new Error("No session");

    return userFound;
};

export default serverAuth;