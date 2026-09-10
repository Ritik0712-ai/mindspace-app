import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const VALID_CONCERNS = [
  "anxiety",
  "depression",
  "stress",
  "relationships",
  "family",
  "loneliness",
  "identity",
  "exploring",
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    const {
      primaryConcern = [],
      language = "en",
      notificationsOn = true,
      reminderTime = null,
      crisisContact = null,
    } = body;

    const filteredConcerns = (primaryConcern as string[]).filter((c: string) =>
      VALID_CONCERNS.includes(c)
    );

    await prisma.profile.upsert({
      where: { userId },
      update: {
        primaryConcern: filteredConcerns,
        notificationsOn,
        reminderTime,
        crisisContact,
        onboardingComplete: true,
      },
      create: {
        userId,
        primaryConcern: filteredConcerns,
        notificationsOn,
        reminderTime,
        crisisContact,
        onboardingComplete: true,
      },
    });

    if (language) {
      await prisma.user.update({
        where: { id: userId },
        data: { language },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding completed successfully",
        profile: {
          primaryConcern: filteredConcerns,
          language,
          notificationsOn,
          reminderTime,
          onboardingComplete: true,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json(
      {
        onboardingComplete: profile?.onboardingComplete ?? false,
        primaryConcern: profile?.primaryConcern ?? [],
        notificationsOn: profile?.notificationsOn ?? true,
        reminderTime: profile?.reminderTime ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get onboarding error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
