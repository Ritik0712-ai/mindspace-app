// Self-Help Resources Data for MindSpace

export interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  category: string;
  youtubeId: string;
}

export interface Course {
  id: string;
  title: string;
  emoji: string;
  lessons: number;
  level: string;
  description: string;
}

export interface BreathingExercise {
  id: string;
  title: string;
  pattern: string;
  description: string;
  steps: { phase: string; duration: number }[];
}

export interface CrisisResource {
  name: string;
  number: string;
  description: string;
  available: string;
}

export const MEDITATIONS: Meditation[] = [
  {
    id: "calm-5min",
    title: "5-Minute Calm",
    duration: "5 min",
    description: "Quick anxiety relief. Simple breathing and grounding.",
    category: "anxiety",
    youtubeId: "inpok4MKVLM",
  },
  {
    id: "sleep-better",
    title: "Sleep Better Tonight",
    duration: "20 min",
    description: "Guided relaxation for better sleep.",
    category: "sleep",
    youtubeId: "aqz-KE-bpKQ",
  },
  {
    id: "morning-grounding",
    title: "Morning Grounding",
    duration: "10 min",
    description: "Start your day with clarity.",
    category: "grounding",
    youtubeId: "h-9emarjXhw",
  },
  {
    id: "letting-go-anger",
    title: "Letting Go of Anger",
    duration: "12 min",
    description: "Release frustration and stress.",
    category: "anger",
    youtubeId: "Z70C4YBr9aY",
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Practice",
    duration: "15 min",
    description: "Be kind to yourself.",
    category: "self-worth",
    youtubeId: "jJrS93J-X7I",
  },
  {
    id: "anxiety-sos",
    title: "Anxiety SOS",
    duration: "8 min",
    description: "Emergency calm for panic attacks.",
    category: "anxiety",
    youtubeId: "OJuT56w69xw",
  },
  {
    id: "body-scan",
    title: "Body Scan Relaxation",
    duration: "15 min",
    description: "Release physical tension.",
    category: "sleep",
    youtubeId: "15qR-6_1c5U",
  },
  {
    id: "breathing-calm",
    title: "Calming Breath",
    duration: "5 min",
    description: "Simple breathing technique.",
    category: "anxiety",
    youtubeId: "F-ARj38H6fA",
  },
];

export const COURSES = [
  {
    id: "understanding-anxiety",
    title: "Understanding Anxiety",
    emoji: "😰",
    lessons: 4,
    level: "Beginner",
    description: "What anxiety is, why it happens, how to cope in Indian context.",
  },
  {
    id: "breaking-shame",
    title: "Breaking Free from Shame",
    emoji: "🔄",
    lessons: 3,
    level: "Intermediate",
    description: "Why we feel shame, how to challenge it and be free.",
  },
  {
    id: "healthy-boundaries",
    title: "Setting Healthy Boundaries",
    emoji: "🚧",
    lessons: 4,
    level: "Intermediate",
    description: "What boundaries are, how to set them especially in Indian family context.",
  },
  {
    id: "processing-grief",
    title: "Processing Grief & Loss",
    emoji: "💔",
    lessons: 3,
    level: "Advanced",
    description: "Any kind of loss: relationship, job, person, dream.",
  },
  {
    id: "building-self-worth",
    title: "Building Self-Worth",
    emoji: "💪",
    lessons: 5,
    level: "Beginner",
    description: "Where self-worth comes from, how to rebuild it when it's low.",
  },
];

export const BREATHING_EXERCISES = [
  {
    id: "box-breathing",
    title: "Box Breathing (4-4-4-4)",
    pattern: "Inhale → Hold → Exhale → Hold",
    description: "Great for calming anxiety. Navy SEAL technique.",
    steps: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Exhale", duration: 4 },
      { phase: "Hold", duration: 4 },
    ],
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    pattern: "Inhale 4s → Hold 7s → Exhale 8s",
    description: "Promotes deep relaxation and sleep.",
    steps: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 7 },
      { phase: "Exhale", duration: 8 },
    ],
  },
  {
    id: "quick-calm",
    title: "Quick Calm (3-3)",
    pattern: "Inhale 3s → Exhale 3s",
    description: "Simplest technique for immediate anxiety relief.",
    steps: [
      { phase: "Inhale", duration: 3 },
      { phase: "Exhale", duration: 3 },
    ],
  },
];

export const CRISIS_RESOURCES = [
  {
    name: "AASRA Helpline",
    number: "9152987821",
    description: "India's premier 24/7 suicide prevention helpline",
    available: "24/7 (Free)",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    description: "Free, confidential mental health support",
    available: "24/7 (Free)",
  },
  {
    name: "iCall (TISS)",
    number: "9152987821",
    description: "Psychosocial helpline by TISS",
    available: "24/7 (Free)",
  },
  {
    name: "Fortis Mental Health",
    number: "8376804102",
    description: "Crisis support and referrals",
    available: "24/7",
  },
];

export const WORKSHEETS = [
  {
    id: "thought-challenging",
    title: "Thought Challenging Worksheet",
    emoji: "🧠",
    description: "Identify negative thoughts and challenge them with evidence.",
  },
  {
    id: "trigger-tracker",
    title: "Trigger Tracker",
    emoji: "📋",
    description: "Log what triggers your anxiety or sadness.",
  },
  {
    id: "self-care",
    title: "Self-Care Planning",
    emoji: "🌿",
    description: "Build a personalized self-care routine.",
  },
  {
    id: "gratitude",
    title: "Gratitude Journal",
    emoji: "🙏",
    description: "Daily gratitude practice.",
  },
];
