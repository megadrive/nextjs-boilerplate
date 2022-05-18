import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { UserModel } from "../../../models/User";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await UserModel.get(credentials.email);
        if (user) {
          const userIsValidated = await UserModel.validatePassword(
            credentials.email,
            credentials.password
          );
          if (userIsValidated) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  events: {
    async signIn(message) {
      /* on successful sign in */
      console.log("signIn", message);
    },
    async signOut(message) {
      /* on signout */
      console.log("signOut", message);
    },
    async createUser(message) {
      /* user created */
      console.log("createUser", message);
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
      console.log("updateUser", message);
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
      console.log("linkAccount", message);
    },
    async session(message) {
      /* session is active */
      console.log("session", message);
    },
    /* @ts-ignore */
    async error(message: any) {
      /* error in authentication flow */
      console.log("error", message);
    },
  },
});
