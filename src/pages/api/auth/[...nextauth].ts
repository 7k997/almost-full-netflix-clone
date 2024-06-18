import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID || "",
                clientSecret: process.env.GITHUB_SECRET || "",
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_ID || "",
                clientSecret: process.env.GOOGLE_SECRET || "",
            }),
            Credentials({
                id: "credentials",
                name: "Credentials",
                credentials: {
                    email: {
                        label: "Email",
                        type: "text",
                    },
                    password: {
                        label: "Password",
                        type: "password",
                    },
                },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) throw new Error("Email and password required!");
                    const user = await prismadb.user.findUnique({
                        where: {
                            email: credentials.email
                        },
                    });

                    if (!user || !user.hashedPassword) throw new Error("Credentials invalid!");
                    const passwordInvalid = await !compare(credentials.password, user.hashedPassword);
                    if (passwordInvalid) throw new Error("Incorrect credentials aba");

                    return user;
                }
            })
        ],
        pages: {
            signIn: "/",
        },
        adapter: PrismaAdapter(prismadb),
        debug: process.env.NODE_ENV === "development",
        session: {
            strategy: "jwt",
        },
        jwt: {
            secret: process.env.NEXTAUTH_JWT_SECRET,
        },
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.id = user.id;
                }

                return token;
            },
            async session({ token , session, user}) {
                if (session.user) {
                    session.user = {
                        ...session.user,
                        id: token.id as string,
                    }
                }
                return session
            },
        }
};

export default NextAuth(authOptions)