import { NextRequest, NextResponse } from "next/server";
import { getAIJournalResponse } from "@/lib/openai";
import { detectCrisis, CRISIS_HELPLINES } from "@/lib/crisis";

// In-memory storage for demo (replace with database in production)
const journalEntries: Map<string, {
  id: string;
  userId: string;
  content: string;
  mood: string;
  moodScore: number;
  tags: string[];
  aiResponse: string | null;
  isCrisis: boolean;
  riskLevel: string | null;
  wordCount: number;
  createdAt: Date;
}[]> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, mood, moodScore, tags, userId, pseudonym } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Journal content is required" },
        { status: 400 }
      );
    }

    if (!mood) {
      return NextResponse.json(
        { error: "Mood is required" },
        { status: 400 }
      );
    }

    // Count words
    const wordCount = content.trim().split(/\s+/).length;

    // Check for crisis
    const crisisDetection = detectCrisis(content);
    const isCrisis = crisisDetection.isCrisis;
    const riskLevel = crisisDetection.riskLevel;

    // Get AI response
    let aiResponse = null;
    if (!isCrisis || moodScore <= 5) {
      try {
        const aiResult = await getAIJournalResponse(
          content,
          mood,
          pseudonym || "Anonymous"
        );
        aiResponse = aiResult.response;
      } catch (error) {
        console.error("AI response error:", error);
        aiResponse = "Thank you for sharing. Your feelings are valid. Take care of yourself. 💙";
      }
    }

    const entry = {
      id: `entry_${Date.now()}`,
      userId: userId || "demo_user",
      content,
      mood,
      moodScore: moodScore || 5,
      tags: tags || [],
      aiResponse,
      isCrisis,
      riskLevel,
      wordCount,
      createdAt: new Date(),
    };

    // Store entry
    const userIdKey = userId || "demo_user";
    const existingEntries = journalEntries.get(userIdKey) || [];
    existingEntries.unshift(entry);
    journalEntries.set(userIdKey, existingEntries);

    return NextResponse.json({
      success: true,
      entry: {
        id: entry.id,
        content: entry.content,
        mood: entry.mood,
        moodScore: entry.moodScore,
        tags: entry.tags,
        aiResponse: entry.aiResponse,
        isCrisis: entry.isCrisis,
        riskLevel: entry.riskLevel,
        wordCount: entry.wordCount,
        createdAt: entry.createdAt,
      },
      helplines: isCrisis ? CRISIS_HELPLINES : null,
    }, { status: 201 });

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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo_user";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const moodFilter = searchParams.get("mood");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let entries = journalEntries.get(userId) || [];

    // Apply filters
    if (moodFilter) {
      entries = entries.filter(e => e.mood === moodFilter);
    }
    if (startDate) {
      entries = entries.filter(e => new Date(e.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      entries = entries.filter(e => new Date(e.createdAt) <= new Date(endDate));
    }

    // Sort by date (newest first)
    entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Paginate
    const total = entries.length;
    const startIndex = (page - 1) * limit;
    const paginatedEntries = entries.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      entries: paginatedEntries.map(e => ({
        id: e.id,
        content: e.content,
        mood: e.mood,
        moodScore: e.moodScore,
        tags: e.tags,
        aiResponse: e.aiResponse,
        wordCount: e.wordCount,
        createdAt: e.createdAt,
      })),
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
