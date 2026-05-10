// Journal Prompts Library for MindSpace
// Categorized by mood for personalized journaling experience

export type MoodType = "great" | "okay" | "low" | "sad" | "anxious" | "frustrated";

export interface JournalPrompt {
  id: string;
  mood: MoodType;
  text: string;
  hint?: string;
}

// Collection of prompts for different moods
export const JOURNAL_PROMPTS: JournalPrompt[] = [
  // GREAT / HAPPY prompts
  {
    id: "great-1",
    mood: "great",
    text: "What's making today feel so good? Let's hold onto that feeling.",
    hint: "Notice the small things that brought you joy",
  },
  {
    id: "great-2",
    mood: "great",
    text: "Who made a positive impact on your day? How can you spread that energy?",
  },
  {
    id: "great-3",
    mood: "great",
    text: "What's one thing you're grateful for right now?",
  },
  {
    id: "great-4",
    mood: "great",
    text: "What's a small win you're proud of today?",
  },

  // OKAY prompts
  {
    id: "okay-1",
    mood: "okay",
    text: "What's been quietly bothering you that you haven't said out loud?",
    hint: "Give voice to the unspoken thoughts",
  },
  {
    id: "okay-2",
    mood: "okay",
    text: "What does 'okay' feel like for you today?",
  },
  {
    id: "okay-3",
    mood: "okay",
    text: "If your feelings could speak, what would they be trying to tell you?",
  },
  {
    id: "okay-4",
    mood: "okay",
    text: "What's one thing you wish others understood about how you're feeling?",
  },
  {
    id: "okay-5",
    mood: "okay",
    text: "How has your body been feeling lately? Any tension or heaviness?",
  },

  // ANXIOUS prompts
  {
    id: "anxious-1",
    mood: "anxious",
    text: "What's the worst thing you're imagining right now? Let's look at it together.",
    hint: "Name the worry to shrink it",
  },
  {
    id: "anxious-2",
    mood: "anxious",
    text: "Name 3 things that are actually within your control right now.",
  },
  {
    id: "anxious-3",
    mood: "anxious",
    text: "What would you tell your younger self about this worry?",
  },
  {
    id: "anxious-4",
    mood: "anxious",
    text: "Where do you feel the anxiety in your body? Describe it.",
  },
  {
    id: "anxious-5",
    mood: "anxious",
    text: "When did this anxiety start? What was happening around that time?",
  },
  {
    id: "anxious-6",
    mood: "anxious",
    text: "If this worry came true, what's the worst that could happen? And then what?",
    hint: "Often our imagined catastrophes don't unfold the way we fear",
  },

  // SAD prompts
  {
    id: "sad-1",
    mood: "sad",
    text: "What does this sadness feel like in your body?",
    hint: "Describe the physical sensations",
  },
  {
    id: "sad-2",
    mood: "sad",
    text: "If your sadness could speak, what would it say it needs?",
  },
  {
    id: "sad-3",
    mood: "sad",
    text: "What's one small thing that's brought you even tiny comfort recently?",
  },
  {
    id: "sad-4",
    mood: "sad",
    text: "If your best friend was feeling this way, what would you tell them?",
  },
  {
    id: "sad-5",
    mood: "sad",
    text: "What are you grieving right now? It could be big or small.",
  },
  {
    id: "sad-6",
    mood: "sad",
    text: "When did you last feel at peace? What was different then?",
  },

  // LOW prompts
  {
    id: "low-1",
    mood: "low",
    text: "What has been weighing on you lately? You don't have to carry it alone.",
  },
  {
    id: "low-2",
    mood: "low",
    text: "What would 'taking care of yourself' look like today? Even something tiny.",
  },
  {
    id: "low-3",
    mood: "low",
    text: "Is there something you've been avoiding thinking about?",
  },
  {
    id: "low-4",
    mood: "low",
    text: "What would make tomorrow slightly better than today?",
  },

  // FRUSTRATED prompts
  {
    id: "frustrated-1",
    mood: "frustrated",
    text: "What boundary feels like it's being crossed right now?",
    hint: "Identifying boundaries helps us protect them",
  },
  {
    id: "frustrated-2",
    mood: "frustrated",
    text: "Who or what are you most frustrated with, and why?",
  },
  {
    id: "frustrated-3",
    mood: "frustrated",
    text: "What do you need that's not being met?",
  },
  {
    id: "frustrated-4",
    mood: "frustrated",
    text: "What would 'letting go' of this frustration feel like? Is that possible right now?",
  },

  // GENERAL prompts (for when no mood is selected)
  {
    id: "general-1",
    mood: "okay",
    text: "How are you really doing today? Be honest with yourself.",
  },
  {
    id: "general-2",
    mood: "okay",
    text: "What's been on your mind lately?",
  },
  {
    id: "general-3",
    mood: "okay",
    text: "Write about anything that's been affecting your peace.",
  },
  {
    id: "general-4",
    mood: "okay",
    text: "What do you need to get off your chest today?",
  },
  {
    id: "general-5",
    mood: "okay",
    text: "Describe how your week has been going so far.",
  },
];

// Get a random prompt for a specific mood
export function getPromptForMood(mood: MoodType): JournalPrompt {
  const promptsForMood = JOURNAL_PROMPTS.filter((p) => p.mood === mood);
  if (promptsForMood.length === 0) {
    return JOURNAL_PROMPTS[0]; // Fallback to first prompt
  }
  return promptsForMood[Math.floor(Math.random() * promptsForMood.length)];
}

// Get a different prompt for the same mood
export function getAlternativePrompt(mood: MoodType, currentId: string): JournalPrompt {
  const promptsForMood = JOURNAL_PROMPTS.filter(
    (p) => p.mood === mood && p.id !== currentId
  );
  if (promptsForMood.length === 0) {
    return getPromptForMood(mood);
  }
  return promptsForMood[Math.floor(Math.random() * promptsForMood.length)];
}

// Get daily rotating prompt (based on day of year)
export function getDailyPrompt(mood: MoodType): JournalPrompt {
  const promptsForMood = JOURNAL_PROMPTS.filter((p) => p.mood === mood);
  if (promptsForMood.length === 0) {
    return JOURNAL_PROMPTS[0];
  }
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return promptsForMood[dayOfYear % promptsForMood.length];
}
