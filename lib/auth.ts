import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// For demo, we'll use mock auth. For production with Google:
// 1. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env
// 2. Add proper database connection

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
        // Demo mode - allow any credentials for testing
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // In production, validate against database
        return {
          id: "demo_user",
          email: credentials.email,
          name: "Demo User",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user) return false;
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.pseudonym = user.name || "Anonymous User";
        token.avatarEmoji = "🐘";
        token.avatarColor = "#60A5FA";
        token.onboardingComplete = false;
      }
      if (account?.provider === "google" && !token.pseudonym) {
        token.pseudonym = user?.name || "Anonymous User";
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

// Type declarations for NextAuth
declare module "next-auth" {
  interface User {
    pseudonym?: string;
    avatarEmoji?: string;
    avatarColor?: string;
    onboardingComplete?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      pseudonym: string;
      avatarEmoji: string;
      avatarColor: string;
      onboardingComplete: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    pseudonym: string;
    avatarEmoji: string;
    avatarColor: string;
    onboardingComplete: boolean;
  }
}
