// OpenAI Integration for MindSpace
// Empathetic AI companion for journal responses

import OpenAI from "openai";
import { detectCrisis, getCrisisMessage, type CrisisLevel } from "./crisis";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

interface JournalAIResponse {
  response: string;
  isCrisis: boolean;
  riskLevel: CrisisLevel;
  crisisMessage?: string;
}

export async function getAIJournalResponse(
  userEntry: string,
  mood: string,
  pseudonym: string
): Promise<JournalAIResponse> {
  // First check for crisis keywords
  const crisisDetection = detectCrisis(userEntry);

  if (crisisDetection.isCrisis) {
    return {
      response: getCrisisMessage(crisisDetection.riskLevel),
      isCrisis: true,
      riskLevel: crisisDetection.riskLevel,
    };
  }

  // Build the user message with context
  const userMessage = `The user (${pseudonym}) wrote in their journal about feeling ${mood}:

"${userEntry}"

Please respond with empathy and warmth.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const response = completion.choices[0]?.message?.content || "";

    return {
      response: response,
      isCrisis: false,
      riskLevel: "none",
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      response: `Thank you for sharing what you've written, ${pseudonym}. I'm here to listen. Due to high demand, my response might be delayed. Please know that your feelings are valid, and it's okay to take your time.

How are you feeling right now after writing this? 💙`,
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

  const summary = `Over your last ${entries.length} journal entries, you've most often felt ${mostCommonMood[0]}. This pattern might help you understand your emotional triggers better.`;

  return summary;
}

// Check if user has remaining API calls (rate limiting)
export function checkRateLimit(): { remaining: number; reset: Date } {
  // For demo purposes, allow 50 requests per day
  const limit = 50;
  const reset = new Date();
  reset.setHours(24, 0, 0, 0);

  return {
    remaining: limit,
    reset,
  };
}
