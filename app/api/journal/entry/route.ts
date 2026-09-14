import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getAIJournalResponse } from "@/lib/ai";
import { detectCrisis, CRISIS_HELPLINES } from "@/lib/crisis";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    const { content, mood, moodScore, tags } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Journal content is required" },
        { status: 400 }
      );
    }

    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }

    const wordCount = content.trim().split(/\s+/).length;

    const crisisDetection = detectCrisis(content);
    const isCrisis = crisisDetection.isCrisis;
    const riskLevel = crisisDetection.riskLevel;

    let aiResponse: string | null = null;
    try {
      const aiResult = await getAIJournalResponse(
        content,
        mood,
        session.user.pseudonym || "Anonymous"
      );
      aiResponse = aiResult.response;
    } catch (error) {
      console.error("AI response error:", error);
      aiResponse =
        "Thank you for sharing. Your feelings are valid. Take care of yourself. 💙";
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        content,
        mood,
        moodScore: moodScore || 5,
        tags: tags || [],
        aiResponse,
        isCrisis,
        crisisRiskLevel: riskLevel,
        wordCount,
      },
    });

    return NextResponse.json(
      {
        success: true,
        entry,
        helplines: isCrisis ? CRISIS_HELPLINES : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Journal entry error:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const moodFilter = searchParams.get("mood");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: Record<string, unknown> = { userId };
    if (moodFilter) where.mood = moodFilter;
    if (startDate || endDate) {
      where.createdAt = {
        ...(startDate ? { gte: new Date(startDate) } : {}),
        ...(endDate ? { lte: new Date(endDate) } : {}),
      };
    }

    const [total, entries] = await Promise.all([
      prisma.journalEntry.count({ where }),
      prisma.journalEntry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get entries error:", error);
    return NextResponse.json(
      { error: "Failed to get journal entries" },
      { status: 500 }
    );
  }
}
