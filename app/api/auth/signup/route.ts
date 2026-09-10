import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generatePseudonym } from "@/lib/pseudonyms";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const pseudonym = generatePseudonym();

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: passwordHash,
        pseudonym: pseudonym.pseudonym,
        avatarEmoji: pseudonym.emoji,
        avatarColor: pseudonym.color,
        profile: {
          create: {},
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          pseudonym: user.pseudonym,
          avatarEmoji: user.avatarEmoji,
          avatarColor: user.avatarColor,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
