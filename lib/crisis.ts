// Crisis Detection for MindSpace
// Detects high-risk language related to self-harm and suicide

export type CrisisLevel = "high" | "medium" | "none";

// High risk keywords - immediate intervention required
const HIGH_RISK_KEYWORDS = [
  "want to die",
  "end my life",
  "kill myself",
  "better off dead",
  "don't want to exist",
  "suicide",
  "cut myself",
  "hurt myself",
  "end it all",
  "no reason to live",
  "wish i was dead",
  "मरना चाहता",
  "जीना नहीं",
  "खत्म करना",
  "mar jaana chahta",
  "jeena nahi",
  "khtm karna",
];

// Medium risk keywords - concerning but not immediate crisis
const MEDIUM_RISK_KEYWORDS = [
  "hopeless",
  "no point",
  "give up on everything",
  "nobody cares",
  "tired of living",
  "disappear forever",
  "burden to everyone",
  "wish i never existed",
  "life is meaningless",
  "not worth living",
  "better without me",
  "useless",
  "worthless",
  "koi ni hai",
  "kuch nahi badhta",
];

export function detectCrisis(text: string): { isCrisis: boolean; riskLevel: CrisisLevel } {
  const lowerText = text.toLowerCase();

  // Check high risk keywords first
  for (const keyword of HIGH_RISK_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return { isCrisis: true, riskLevel: "high" };
    }
  }

  // Check medium risk keywords
  for (const keyword of MEDIUM_RISK_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return { isCrisis: true, riskLevel: "medium" };
    }
  }

  return { isCrisis: false, riskLevel: "none" };
}

export function getCrisisMessage(riskLevel: CrisisLevel): string {
  if (riskLevel === "high") {
    return `I'm really concerned about what you shared. You don't have to face this alone.

Please reach out to someone who can help right now:

📞 **AASRA Helpline**: 9152987821 (24/7, free)
📞 **Vandrevala Foundation**: 1860-2662-345 (24/7)
📞 **iCall**: 9152987821

If you're in immediate danger, please go to your nearest hospital or call emergency services.

You matter. Your life has value. Please reach out for support. 💙`;
  }

  if (riskLevel === "medium") {
    return `Thank you for sharing how you're feeling. It takes courage to express these thoughts.

I want you to know that you're not alone, and what you're feeling is valid. Many people have felt this way at some point.

If things get harder, please don't hesitate to reach out:

📞 **AASRA**: 9152987821
📞 **Vandrevala**: 1860-2662-345

You're welcome to continue journaling here, but if you need to talk to someone right now, these helplines are available 24/7. 💙`;
  }

  return "";
}

export const CRISIS_HELPLINES = [
  { name: "AASRA Helpline", number: "9152987821", available: "24/7 (Free)" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", available: "24/7 (Free)" },
  { name: "iCall", number: "9152987821", available: "24/7 (Free)" },
  { name: "Fortis Mental Health", number: "8376804102", available: "24/7" },
];
