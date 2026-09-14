import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: { profile: true },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.pseudonym,
          pseudonym: user.pseudonym,
          avatarEmoji: user.avatarEmoji,
          avatarColor: user.avatarColor,
          onboardingComplete: user.profile?.onboardingComplete ?? false,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // DO NOT add a `cookies:` block here.
  // Hardcoding `sessionToken.name` breaks NextAuth's secure-cookie auto-detection:
  // `withAuth()` in `middleware.ts` calls the same `getToken()` logic and computes
  // a different cookie name in production, causing redirect loops to /login.
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.pseudonym = user.pseudonym || user.name || "Anonymous User";
        token.avatarEmoji = user.avatarEmoji || "🐘";
        token.avatarColor = user.avatarColor || "#60A5FA";
        token.onboardingComplete = user.onboardingComplete ?? false;
      }
      if (account) {
        token.provider = account.provider;
      }
      // Client called `update({ onboardingComplete: true })` (see
      // app/onboarding/page.tsx) — merge whatever it passed into the token.
      if (trigger === "update" && session) {
        Object.assign(token, session);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.pseudonym = token.pseudonym as string;
        session.user.avatarEmoji = token.avatarEmoji as string;
        session.user.avatarColor = token.avatarColor as string;
        session.user.onboardingComplete = token.onboardingComplete as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
