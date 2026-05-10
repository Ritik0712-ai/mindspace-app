// Mock auth for development without database
// This allows testing the UI flow without needing a PostgreSQL setup

import { generatePseudonym } from "./pseudonyms";

// In-memory user store for development
const users = new Map<string, {
  id: string;
  email: string;
  password: string;
  pseudonym: string;
  avatarEmoji: string;
  avatarColor: string;
  language: string;
  onboardingComplete: boolean;
}>();

// Simple password hashing (NOT for production)
function simpleHash(password: string): string {
  return Buffer.from(password).toString("base64");
}

function simpleCompare(password: string, hash: string): boolean {
  return Buffer.from(password).toString("base64") === hash;
}

export async function createUser(email: string, password: string) {
  if (users.has(email.toLowerCase())) {
    throw new Error("An account with this email already exists");
  }

  const pseudonym = generatePseudonym();
  const id = `user_${Date.now()}`;
  
  const user = {
    id,
    email: email.toLowerCase(),
    password: simpleHash(password),
    pseudonym: pseudonym.pseudonym,
    avatarEmoji: pseudonym.emoji,
    avatarColor: pseudonym.color,
    language: "en",
    onboardingComplete: false,
  };

  users.set(email.toLowerCase(), user);
  return user;
}

export async function validateUser(email: string, password: string) {
  const user = users.get(email.toLowerCase());
  if (!user) return null;
  if (!simpleCompare(password, user.password)) return null;
  return user;
}

export async function updateUser(id: string, updates: Partial<{
  language: string;
  onboardingComplete: boolean;
  primaryConcern: string[];
}>) {
  for (const [email, user] of users.entries()) {
    if (user.id === id) {
      Object.assign(user, updates);
      return user;
    }
  }
  throw new Error("User not found");
}

export async function getUserById(id: string) {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return null;
}
