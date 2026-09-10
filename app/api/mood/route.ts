import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { detectCrisis, CRISIS_HELPLINES } from "@/lib/crisis";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    const { mood, moodScore, tags } = body;

    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }

    const crisisDetection = detectCrisis([mood, ...(tags || [])].join(" "));

    const log = await prisma.moodLog.create({
      data: {
        userId,
        mood,
        moodScore: moodScore || 5,
        tags: tags || [],
      },
    });

    return NextResponse.json(
      {
        success: true,
        moodLog: log,
        helplines: crisisDetection.isCrisis ? CRISIS_HELPLINES : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Mood log error:", error);
    return NextResponse.json({ error: "Failed to log mood" }, { status: 500 });
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
    const days = parseInt(searchParams.get("days") || "30");

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const [allLogs, filteredLogs] = await Promise.all([
      prisma.moodLog.findMany({ where: { userId }, orderBy: { loggedAt: "desc" } }),
      prisma.moodLog.findMany({
        where: { userId, loggedAt: { gte: cutoffDate } },
        orderBy: { loggedAt: "desc" },
      }),
    ]);

    const moodCounts: Record<string, number> = {};
    let totalScore = 0;
    filteredLogs.forEach((log) => {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
      totalScore += log.moodScore;
    });

    const avgScore = filteredLogs.length > 0 ? totalScore / filteredLogs.length : 0;
    const mostFrequentMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

    // Streak: consecutive days (working backward from today) with an entry
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const loggedDates = new Set(
      allLogs.map((l) => new Date(l.loggedAt).toISOString().split("T")[0])
    );
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];
      if (loggedDates.has(dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    const todayStr = today.toISOString().split("T")[0];
    const loggedToday = loggedDates.has(todayStr);

    return NextResponse.json({
      logs: filteredLogs,
      stats: {
        totalEntries: filteredLogs.length,
        averageScore: Math.round(avgScore * 10) / 10,
        mostFrequentMood: mostFrequentMood?.[0] || null,
        moodCounts,
        currentStreak: streak,
        loggedToday,
      },
    });
  } catch (error) {
    console.error("Get mood logs error:", error);
    return NextResponse.json(
      { error: "Failed to get mood logs" },
      { status: 500 }
    );
  }
}
