import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo
const userProfiles: Map<string, {
  userId: string;
  primaryConcern: string[];
  language: string;
  notificationsOn: boolean;
  reminderTime: string | null;
  crisisContact: string | null;
  onboardingComplete: boolean;
}> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId = "demo_user",
      primaryConcern = [],
      language = "en",
      notificationsOn = true,
      reminderTime = null,
      crisisContact = null,
    } = body;

    // Validate primary concerns if provided
    const validConcerns = [
      "anxiety",
      "depression",
      "stress",
      "relationships",
      "family",
      "loneliness",
      "identity",
      "exploring",
    ];

    const filteredConcerns = (primaryConcern as string[]).filter((c: string) =>
      validConcerns.includes(c)
    );

    // Store profile (mock)
    userProfiles.set(userId, {
      userId,
      primaryConcern: filteredConcerns,
      language,
      notificationsOn,
      reminderTime,
      crisisContact,
      onboardingComplete: true,
    });

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
  return NextResponse.json(
    {
      onboardingComplete: false,
      primaryConcern: [],
      notificationsOn: true,
      reminderTime: null,
    },
    { status: 200 }
  );
}
