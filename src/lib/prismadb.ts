import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient({ log: ["info"], });

if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;