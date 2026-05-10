import { NextRequest, NextResponse } from "next/server";
import { detectCrisis, CRISIS_HELPLINES } from "@/lib/crisis";

// In-memory storage for demo
const moodLogs: Map<string, {
  id: string;
  userId: string;
  mood: string;
  moodScore: number;
  tags: string[];
  loggedAt: Date;
}[]> = new Map();

// Track today's mood for users
const todayMood: Map<string, { mood: string; score: number; logged: boolean }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, moodScore, tags, userId } = body;

    if (!mood) {
      return NextResponse.json(
        { error: "Mood is required" },
        { status: 400 }
      );
    }

    // Check for crisis in tags or mood
    const crisisDetection = detectCrisis([mood, ...(tags || [])].join(" "));

    const log = {
      id: `mood_${Date.now()}`,
      userId: userId || "demo_user",
      mood,
      moodScore: moodScore || 5,
      tags: tags || [],
      loggedAt: new Date(),
    };

    // Store log
    const userIdKey = userId || "demo_user";
    const existingLogs = moodLogs.get(userIdKey) || [];
    existingLogs.unshift(log);
    moodLogs.set(userIdKey, existingLogs);

    // Update today's mood
    todayMood.set(userIdKey, { mood, score: moodScore || 5, logged: true });

    return NextResponse.json({
      success: true,
      moodLog: log,
      helplines: crisisDetection.isCrisis ? CRISIS_HELPLINES : null,
    }, { status: 201 });

  } catch (error) {
    console.error("Mood log error:", error);
    return NextResponse.json(
      { error: "Failed to log mood" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo_user";
    const days = parseInt(searchParams.get("days") || "30");

    const logs = moodLogs.get(userId) || [];
    
    // Filter to last N days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const filteredLogs = logs.filter(log => new Date(log.loggedAt) >= cutoffDate);

    // Calculate stats
    const moodCounts: Record<string, number> = {};
    let totalScore = 0;
    
    filteredLogs.forEach(log => {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
      totalScore += log.moodScore;
    });

    const avgScore = filteredLogs.length > 0 ? totalScore / filteredLogs.length : 0;
    const mostFrequentMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

    // Calculate streak (consecutive days with entries)
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];
      
      const hasEntry = logs.some(log => {
        const logDate = new Date(log.loggedAt).toISOString().split("T")[0];
        return logDate === dateStr;
      });
      
      if (hasEntry) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // Get today's status
    const todayKey = userId;
    const todayStatus = todayMood.get(todayKey) || { logged: false };

    return NextResponse.json({
      logs: filteredLogs,
      stats: {
        totalEntries: filteredLogs.length,
        averageScore: Math.round(avgScore * 10) / 10,
        mostFrequentMood: mostFrequentMood?.[0] || null,
        moodCounts,
        currentStreak: streak,
        loggedToday: todayStatus.logged,
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
