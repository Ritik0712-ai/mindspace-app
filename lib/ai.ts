// Gemini AI Integration for MindSpace
// Empathetic AI companion for journal responses using Google Gemini via OpenAI-compatible endpoint

import OpenAI from "openai";
import { detectCrisis, getCrisisMessage, type CrisisLevel } from "./crisis";

export interface JournalAIResponse {
  response: string;
  isCrisis: boolean;
  riskLevel: CrisisLevel;
  crisisMessage?: string;
}

// Lazily initialize the Gemini client using the OpenAI-compatible endpoint.
// Instantiating at module scope with no API key crashes builds or tests,
// so we only construct it the first time it is actually needed.
let geminiClient: OpenAI | null = null;
let geminiInitAttempted = false;

function getGeminiClient(): OpenAI | null {
  if (geminiInitAttempted) return geminiClient;
  geminiInitAttempted = true;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith("placeholder") || apiKey.startsWith("sk-placeholder")) {
    return null;
  }

  try {
    geminiClient = new OpenAI({
      apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
    geminiClient = null;
  }
  return geminiClient;
}

// System prompt for the AI companion - warm, empathetic, non-clinical
const SYSTEM_PROMPT = `You are a warm, empathetic companion on MindSpace, a mental health support platform for Indians.

Your role:
- Listen deeply and reflect back what the user is feeling
- Validate their emotions without judgment
- Gently offer perspective or questions that help them reflect
- Suggest simple coping strategies when appropriate
- Use a warm, conversational tone (like a caring friend, not a therapist)

Cultural context:
- Users are from India, often tier-2/3 cities
- They face family pressure, career stress, societal expectations ("log kya kahenge")
- They may feel guilty for struggling (normalize it)
- They may be dealing with arranged marriage pressure, competitive exams, toxic workplaces

STRICT RULES:
1. Never diagnose any mental health condition (no "you have anxiety" or "you seem depressed")
2. Never recommend or mention specific medications
3. Keep responses under 200 words (concise but warm)
4. End with an open question to encourage reflection
5. Use Hindi words occasionally if it feels natural (yaar, bilkul, theek hai, bahut hard)
6. Be culturally sensitive - acknowledge their specific context

Response format:
- Start by reflecting/validating (1-2 sentences)
- Offer gentle perspective or question (1-2 sentences)
- Optional: 1 simple coping suggestion
- End with an open, caring question

Remember: You're here to listen and support, not diagnose or prescribe.`;

function getEmpatheticFallback(pseudonym: string): string {
  return `Thank you for sharing what you've written, ${pseudonym}. I'm here to listen. Your feelings are valid, and it's okay to take your time.\n\nHow are you feeling right now after writing this? 💙`;
}

// Retry with exponential backoff on HTTP 429 (Gemini free tier RPM/RPD limits)
async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 2,
  baseDelayMs = 1000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: unknown) {
      attempt++;
      const err = error as {
        status?: number;
        statusCode?: number;
        code?: string | number;
        message?: string;
      };

      const is429 =
        err?.status === 429 ||
        err?.statusCode === 429 ||
        String(err?.code) === "429" ||
        String(err?.message).includes("429") ||
        String(err?.message).toLowerCase().includes("rate limit") ||
        String(err?.message).toLowerCase().includes("quota");

      if (is429 && attempt <= maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        console.warn(
          `Gemini rate limit (429) on attempt ${attempt}. Retrying in ${delay}ms...`
        );
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function getAIJournalResponse(
  userEntry: string,
  mood: string,
  pseudonym: string
): Promise<JournalAIResponse> {
  // CRITICAL: Stage 1 keyword crisis pass MUST run before any model call
  const crisisDetection = detectCrisis(userEntry);

  if (crisisDetection.isCrisis) {
    return {
      response: getCrisisMessage(crisisDetection.riskLevel),
      isCrisis: true,
      riskLevel: crisisDetection.riskLevel,
    };
  }

  const client = getGeminiClient();
  if (!client) {
    return {
      response: getEmpatheticFallback(pseudonym),
      isCrisis: false,
      riskLevel: "none",
    };
  }

  const userMessage = `The user (${pseudonym}) wrote in their journal about feeling ${mood}:

"${userEntry}"

Please respond with empathy and warmth.`;

  const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";

  try {
    const completion = await callWithRetry(async () => {
      return await client.chat.completions.create({
        model: modelName,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        max_tokens: 1500,
        temperature: 0.8,
      });
    });

    // Check for safety finish reason or promptFeedback blockReason
    const choice = completion.choices?.[0];
    const finishReason = String(choice?.finish_reason || "").toLowerCase();
    const rawData = completion as unknown as {
      promptFeedback?: { blockReason?: string };
    };

    const isSafetyBlocked =
      finishReason === "content_filter" ||
      finishReason === "safety" ||
      Boolean(rawData?.promptFeedback?.blockReason);

    if (isSafetyBlocked) {
      console.warn("Gemini generation triggered safety filter. Falling back to crisis protocol.");
      return {
        response: getCrisisMessage("medium"),
        isCrisis: true,
        riskLevel: "medium",
      };
    }

    const responseContent = choice?.message?.content?.trim();
    if (!responseContent) {
      // If empty content received, fallback to empathetic response
      return {
        response: getEmpatheticFallback(pseudonym),
        isCrisis: false,
        riskLevel: "none",
      };
    }

    return {
      response: responseContent,
      isCrisis: false,
      riskLevel: "none",
    };
  } catch (error: unknown) {
    const err = error as {
      status?: number;
      message?: string;
      code?: string;
    };
    console.error("Gemini API error:", error);

    // If the error itself is a safety block from Gemini, treat as crisis/medium
    const isSafetyError =
      String(err?.message).toLowerCase().includes("safety") ||
      String(err?.message).toLowerCase().includes("blocked") ||
      String(err?.message).toLowerCase().includes("content_filter");

    if (isSafetyError) {
      return {
        response: getCrisisMessage("medium"),
        isCrisis: true,
        riskLevel: "medium",
      };
    }

    // Default canned empathetic fallback - never show raw error
    return {
      response: getEmpatheticFallback(pseudonym),
      isCrisis: false,
      riskLevel: "none",
    };
  }
}

// Generate a mood summary based on recent entries
export async function generateMoodSummary(
  entries: { mood: string; content: string; createdAt: Date }[]
): Promise<string> {
  if (entries.length === 0) {
    return "Start journaling to see insights about your emotional patterns!";
  }

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

  return `Over your last ${entries.length} journal entries, you've most often felt ${mostCommonMood[0]}. This pattern might help you understand your emotional triggers better.`;
}

// Check if user has remaining API calls (rate limiting)
export function checkRateLimit(): { remaining: number; reset: Date } {
  const limit = 50;
  const reset = new Date();
  reset.setHours(24, 0, 0, 0);

  return {
    remaining: limit,
    reset,
  };
}
