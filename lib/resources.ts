// Self-Help Resources Data for MindSpace

export interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  category: string;
  youtubeId: string;
  youtubeUrl: string;
  benefits: string[];
}

export interface Course {
  id: string;
  title: string;
  emoji: string;
  lessons: number;
  level: string;
  description: string;
  youtubePlaylistId: string;
  youtubeUrl: string;
  methods: string[];
  benefits: string[];
  duration: string;
}

export interface BreathingExercise {
  id: string;
  title: string;
  pattern: string;
  description: string;
  steps: { phase: string; duration: number }[];
  youtubeUrl: string;
  youtubeId: string;
  benefits: string[];
}

export interface CrisisResource {
  name: string;
  number: string;
  description: string;
  available: string;
}

export interface Worksheet {
  id: string;
  title: string;
  emoji: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  steps: string[];
}

export const MEDITATIONS: Meditation[] = [
  {
    id: "calm-5min",
    title: "5-Minute Calm",
    duration: "5 min",
    description: "Quick anxiety relief. Simple breathing and grounding.",
    category: "anxiety",
    youtubeId: "inpok4MKVLM",
    youtubeUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
    benefits: ["Reduces stress", "Calms nervous system", "Grounds you in the present"],
  },
  {
    id: "sleep-better",
    title: "Sleep Better Tonight",
    duration: "20 min",
    description: "Drift into deep, restful sleep with guided body scan.",
    category: "sleep",
    youtubeId: "MIr3RsUWrdo",
    youtubeUrl: "https://www.youtube.com/watch?v=MIr3RsUWrdo",
    benefits: ["Improves sleep quality", "Releases physical tension", "Quietens racing thoughts"],
  },
  {
    id: "morning-energy",
    title: "Morning Energy",
    duration: "10 min",
    description: "Start your day grounded, calm, and centred.",
    category: "energy",
    youtubeId: "H_uc-uQ3Nkc",
    youtubeUrl: "https://www.youtube.com/watch?v=H_uc-uQ3Nkc",
    benefits: ["Sets positive intention", "Boosts alertness", "Reduces morning anxiety"],
  },
  {
    id: "stress-relief",
    title: "Stress Relief",
    duration: "10 min",
    description: "Release tension stored in your body and mind.",
    category: "stress",
    youtubeId: "O-6f5wQXSu8",
    youtubeUrl: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
    benefits: ["Lowers cortisol", "Relaxes muscles", "Restores mental clarity"],
  },
  {
    id: "body-scan",
    title: "Body Scan",
    duration: "7 min",
    description: "Tune into your body and release hidden tension.",
    category: "awareness",
    youtubeId: "QQ0b8XAOZlE",
    youtubeUrl: "https://www.youtube.com/watch?v=QQ0b8XAOZlE",
    benefits: ["Increases body awareness", "Reduces physical stress", "Improves mind-body connection"],
  },
];

export const COURSES: Course[] = [
  {
    id: "mindfulness-fundamentals",
    title: "Mindfulness Fundamentals",
    emoji: "🧘",
    lessons: 5,
    level: "Beginner",
    description: "Build a daily mindfulness practice from scratch — no experience needed.",
    youtubePlaylistId: "PLLldecs20g4T1KvIUfuGsV85v0dBrgdVB",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLLldecs20g4T1KvIUfuGsV85v0dBrgdVB",
    methods: [
      "Breath awareness — observe your breath without judgment",
      "Body scan — systematically notice sensations from head to toe",
      "Thought observation — watch thoughts arise and pass like clouds",
      "Mindful eating — engage all senses with each bite",
      "Daily integration — micro-practices woven into ordinary moments",
    ],
    benefits: [
      "Reduces rumination and worry",
      "Improves emotional regulation",
      "Builds non-reactive awareness",
      "Enhances focus and concentration",
    ],
    duration: "5 sessions × 10–15 min",
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management 101",
    emoji: "🌿",
    lessons: 5,
    level: "Beginner",
    description: "Practical tools to understand and reduce anxiety — based on CBT principles.",
    youtubePlaylistId: "PL4Qw4-tlRJe87je8DARpZLyTX1UrHq_uh",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL4Qw4-tlRJe87je8DARpZLyTX1UrHq_uh",
    methods: [
      "Cognitive restructuring — identify and challenge anxious thought patterns",
      "Behavioural activation — face feared situations gradually",
      "Worry exposure — confront worry in controlled doses",
      "Relaxation training — diaphragmatic breathing and progressive muscle relaxation",
      "Sleep hygiene — establish a calming pre-sleep routine",
    ],
    benefits: [
      "Breaks the anxiety-avoidance cycle",
      "Builds tolerance for uncertainty",
      "Provides immediate relief tools",
      "Teaches long-term self-management",
    ],
    duration: "5 sessions × 15–20 min",
  },
  {
    id: "stress-reduction",
    title: "Stress Reduction",
    emoji: "🌊",
    lessons: 4,
    level: "All Levels",
    description: "Evidence-based stress management using mindfulness and breathwork.",
    youtubePlaylistId: "PLLldecs20g4T1KvIUfuGsV85v0dBrgdVB",
    youtubeUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    methods: [
      "Mindful breathing — anchor attention to the breath",
      "Body awareness — notice stress held in the body",
      "Thought defusion — create distance from stressful thoughts",
      "Loving-kindness — cultivate compassion for self and others",
    ],
    benefits: [
      "Lowers physiological stress markers",
      "Improves sleep and recovery",
      "Boosts resilience under pressure",
      "Enhances emotional balance",
    ],
    duration: "4 sessions × 10–15 min",
  },
  {
    id: "depression-self-help",
    title: "Depression Self-Help",
    emoji: "💙",
    lessons: 4,
    level: "Beginner",
    description: "Gentle, structured steps to lift low mood — built on behavioural activation.",
    youtubePlaylistId: "PLCQACBUblTbUnKweH6XPuV8t9qrS8bbQq",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLCQACBUblTbUnKweH6XPuV8t9qrS8bbQq",
    methods: [
      "Behavioural activation — small pleasurable and mastery activities daily",
      "Thought monitoring — track mood and its connection to thoughts",
      "Activity scheduling — plan valued activities even with low motivation",
      "Sleep and routine — stabilise the day through consistent rhythms",
    ],
    benefits: [
      "Restores routine and structure",
      "Increases positive experiences",
      "Breaks withdrawal patterns",
      "Builds self-efficacy over time",
    ],
    duration: "4 sessions × 10–15 min",
  },
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    pattern: "4-4-4-4",
    description:
      "Navy SEAL technique for calming the nervous system under pressure. Inhale, hold, exhale, hold — all equal counts.",
    steps: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Exhale", duration: 4 },
      { phase: "Hold", duration: 4 },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=tEmt1Znux58",
    youtubeId: "tEmt1Znux58",
    benefits: [
      "Activates the parasympathetic nervous system",
      "Reduces cortisol and adrenaline spikes",
      "Improves focus and mental clarity",
    ],
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    pattern: "4-7-8",
    description:
      "Dr. Andrew Weil's technique for anxiety and sleep. The extended exhale signals safety to your brain.",
    steps: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 7 },
      { phase: "Exhale", duration: 8 },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=IumIKwyx8pg",
    youtubeId: "IumIKwyx8pg",
    benefits: [
      "Rapidly calms anxiety and panic",
      "Promotes natural sleep onset",
      "Regulates the autonomic nervous system",
    ],
  },
  {
    id: "deep-breathing",
    title: "Deep Belly Breathing",
    pattern: "4-0-6-0",
    description:
      "Diaphragmatic breathing to activate the vagus nerve. Slow, deep, and rhythmic — the foundation of all stress reduction.",
    steps: [
      { phase: "Inhale (belly rises)", duration: 4 },
      { phase: "Hold", duration: 0 },
      { phase: "Exhale (belly falls)", duration: 6 },
      { phase: "Rest", duration: 0 },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=bvdzTs0m510",
    youtubeId: "bvdzTs0m510",
    benefits: [
      "Stimulates the vagus nerve",
      "Lowers heart rate and blood pressure",
      "Reduces anxiety and panic symptoms",
    ],
  },
  {
    id: "progressive-muscle",
    title: "Progressive Muscle Relaxation",
    pattern: "5-5-5",
    description:
      "Systematically tense and release muscle groups to dissolve physical tension stored from stress.",
    steps: [
      { phase: "Tense muscle group", duration: 5 },
      { phase: "Hold tension", duration: 5 },
      { phase: "Release fully", duration: 5 },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=2IJUD-e14FY",
    youtubeId: "2IJUD-e14FY",
    benefits: [
      "Reduces muscle tension and physical symptoms of stress",
      "Improves body awareness",
      "Can improve sleep when done before bed",
    ],
  },
];

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "iCall",
    number: "9152987821",
    description: "Confidential psychosocial helpline",
    available: "Mon–Sat, 8am–10pm",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    description: "Free 24/7 mental health support",
    available: "24/7",
  },
  {
    name: "NIMHANS Helpline",
    number: "+91-80-4611-0007",
    description: "Mental health professionals",
    available: "24/7",
  },
  {
    name: "Mindtree Suicide Prevention",
    number: "9881663636",
    description: "Emotional support and crisis intervention",
    available: "24/7",
  },
  {
    name: "Fortis Mental Health",
    number: "8376804102",
    description: "Crisis support and referrals",
    available: "24/7",
  },
];

export const WORKSHEETS: Worksheet[] = [
  {
    id: "thought-challenging",
    title: "Thought Challenging Worksheet",
    emoji: "🧠",
    description: "Identify negative thoughts and challenge them with evidence.",
    youtubeUrl: "https://www.youtube.com/watch?v=TZbFDjH6buk",
    youtubeId: "TZbFDjH6buk",
    steps: [
      "Notice the thought — write it down exactly as it feels.",
      "Ask: Is this fact, or an interpretation? What evidence supports or contradicts it?",
      "Reframe: Write a balanced alternative thought.",
      "Act: What would you tell a friend in this situation?",
    ],
  },
  {
    id: "trigger-tracker",
    title: "Trigger Tracker",
    emoji: "📋",
    description: "Log what triggers your anxiety or sadness.",
    youtubeUrl: "https://www.youtube.com/watch?v=V1QWRNVxK_E",
    youtubeId: "V1QWRNVxK_E",
    steps: [
      "Record the situation — where, when, with whom.",
      "Note your emotional response and rate its intensity (1–10).",
      "Identify the trigger — was it a person, place, memory, or thought?",
      "Plan a coping strategy for next time.",
    ],
  },
  {
    id: "self-care",
    title: "Self-Care Planning",
    emoji: "🌿",
    description: "Build a personalized self-care routine.",
    youtubeUrl: "https://www.youtube.com/watch?v=6T-doDC0QOI",
    youtubeId: "6T-doDC0QOI",
    steps: [
      "List 5 physical activities you enjoy.",
      "List 5 emotional coping strategies.",
      "List 5 social connections you can lean on.",
      "Schedule one self-care act daily for the next week.",
    ],
  },
  {
    id: "gratitude",
    title: "Gratitude Journal",
    emoji: "🙏",
    description: "Daily gratitude practice.",
    youtubeUrl: "https://www.youtube.com/watch?v=utTbTJa4tHc",
    youtubeId: "utTbTJa4tHc",
    steps: [
      "Write 3 specific things you're grateful for today.",
      "Include one thing about yourself — something you did well.",
      "Name one person and why you appreciate them.",
      "End with: One thing I look forward to tomorrow is ___",
    ],
  },
  {
    id: "mood-log",
    title: "Daily Mood Log",
    emoji: "📊",
    description: "Track your emotional patterns over time.",
    youtubeUrl: "https://www.youtube.com/watch?v=3VIL1L_ypMg",
    youtubeId: "3VIL1L_ypMg",
    steps: [
      "Rate your mood from 1–10 at the same time each day.",
      "Note 3 activities you did today.",
      "Record any significant thoughts or feelings.",
      "Identify what helped or made it worse.",
    ],
  },
];
