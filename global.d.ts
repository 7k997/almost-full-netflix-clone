import { PrismaClient } from "@prisma/client"

declare global {
    namespace globalThis {
       var prismadb: PrismaClient
    }
}

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image: string;
        };
    }
}