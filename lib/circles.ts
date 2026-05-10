// Support Circles Data for MindSpace

export interface Circle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  memberCount: number;
  postCount: number;
  category: string;
}

export const CIRCLES: Circle[] = [
  {
    id: "college-stress",
    name: "College & Career Stress",
    emoji: "🎓",
    description: "Exams, peer pressure, career anxiety — you're not alone.",
    color: "#818CF8",
    memberCount: 1247,
    postCount: 89,
    category: "education",
  },
  {
    id: "work-burnout",
    name: "Work & Burnout",
    emoji: "💼",
    description: "Office stress, toxic workplaces, feeling stuck.",
    color: "#F59E0B",
    memberCount: 892,
    postCount: 67,
    category: "work",
  },
  {
    id: "relationship-struggles",
    name: "Relationship Struggles",
    emoji: "💔",
    description: "Breakups, toxic dynamics, loneliness in relationships.",
    color: "#F87171",
    memberCount: 1456,
    postCount: 124,
    category: "relationships",
  },
  {
    id: "family-pressure",
    name: "Family Pressure",
    emoji: "👨‍👩‍👧",
    description: "Marriage pressure, expectations, toxic family dynamics.",
    color: "#34D399",
    memberCount: 1873,
    postCount: 156,
    category: "family",
  },
  {
    id: "lgbtq-safe-space",
    name: "LGBTQ+ Safe Space",
    emoji: "🏳️‍🌈",
    description: "Identity, coming out, acceptance. Zero judgment here.",
    color: "#A78BFA",
    memberCount: 654,
    postCount: 45,
    category: "identity",
  },
  {
    id: "anxiety-depression",
    name: "Anxiety & Depression",
    emoji: "🌧️",
    description: "Living with anxiety and depression. You belong here.",
    color: "#60A5FA",
    memberCount: 2134,
    postCount: 198,
    category: "mental-health",
  },
  {
    id: "new-parents",
    name: "New Parents",
    emoji: "🤱",
    description: "Postpartum, parenting stress, identity shifts.",
    color: "#FCD34D",
    memberCount: 423,
    postCount: 34,
    category: "parenting",
  },
  {
    id: "general-support",
    name: "General Support",
    emoji: "🫂",
    description: "Not sure where to start? Everyone is welcome here.",
    color: "#6EE7B7",
    memberCount: 3456,
    postCount: 287,
    category: "general",
  },
];

export const POST_TYPES = [
  { id: "venting", label: "Venting", emoji: "🌊", description: "Just need to let it out" },
  { id: "seeking_advice", label: "Seeking Advice", emoji: "🤔", description: "Want perspective" },
  { id: "celebration", label: "Sharing a Win", emoji: "🎉", description: "Celebrate small victories" },
  { id: "offering_support", label: "Offering Support", emoji: "💙", description: "Here for others" },
];

export const REACTION_TYPES = [
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "hug", emoji: "🫂", label: "Hug" },
  { id: "strength", emoji: "💪", label: "Strength" },
  { id: "seen", emoji: "✨", label: "Seen" },
];

export function getCircleById(id: string): Circle | undefined {
  return CIRCLES.find((c) => c.id === id);
}

export function getCircleColor(id: string): string {
  const circle = getCircleById(id);
  return circle?.color || "#7C6FF7";
}
