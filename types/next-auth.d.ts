// Type augmentation for NextAuth so session.user / the JWT carry the extra
// MindSpace-specific fields (pseudonym, avatar, onboarding status).
//
// IMPORTANT: this file must contain a top-level import/export to be treated
// as a module. Without one, `declare module "next-auth"` doesn't *augment*
// the real module — it silently replaces it, wiping out NextAuthOptions,
// Session, etc. (that's what broke the build the first time around).
export {};

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
