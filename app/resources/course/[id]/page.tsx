"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight, HiCheck } from "react-icons/hi";
import { COURSES } from "@/lib/resources";

// Course content
const COURSE_CONTENT: Record<string, { title: string; content: string; keyTakeaway: string }[]> = {
  "understanding-anxiety": [
    {
      title: "What is Anxiety?",
      content: `Anxiety is your body's natural response to perceived threats. It's that feeling of worry, nervousness, or fear that something bad might happen.

In today's world, our brains haven't evolved to distinguish between a tiger chasing us and a deadline at work. Both trigger the same "fight or flight" response.

**Common signs of anxiety include:**
- Racing thoughts that won't stop
- Difficulty concentrating
- Restlessness or feeling on edge
- Physical symptoms like rapid heartbeat, sweating
- Trouble sleeping

**The important thing to remember:** A little anxiety is normal and even helpful. It keeps us alert and motivated. It's when it becomes overwhelming or constant that we need to address it.

**In Indian context:** Many of us grow up with "log kya kahenge" (what will people think) culture, which can add layers of social anxiety on top of regular stress. Recognizing this is the first step.`,
      keyTakeaway: "Anxiety is a normal human response. It's not weakness—it's your brain trying to protect you.",
    },
    {
      title: "Recognizing Your Triggers",
      content: `Understanding what triggers your anxiety is like having a map. Once you know the terrain, you can navigate it better.

**Common triggers include:**
- Work pressure and deadlines
- Financial concerns
- Relationship difficulties
- Social situations
- Major life changes
- Health worries

**How to identify YOUR triggers:**
1. **Keep a journal** - Write down when you feel anxious and what happened before
2. **Notice patterns** - Is it always Sunday night? Before meetings?
3. **Body scan** - Where do you feel anxiety physically?

**Questions to ask yourself:**
- What was I worried about?
- What was I doing?
- Who was I with?
- What was the time of day?

Over time, you'll see patterns emerge. Maybe it's the news before bed, or coffee on an empty stomach, or certain people who drain your energy.`,
      keyTakeaway: "You can't avoid all triggers, but knowing them helps you prepare and develop coping strategies.",
    },
    {
      title: "Simple Coping Techniques",
      content: `When anxiety hits, having tools in your toolkit makes all the difference. Here are proven techniques:

**1. Deep Breathing (Box Breathing)**
- Breathe in for 4 seconds
- Hold for 4 seconds
- Breathe out for 4 seconds
- Hold for 4 seconds
- Repeat 4 times

**2. 5-4-3-2-1 Grounding**
- Name 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

**3. Challenge Your Thoughts**
Ask yourself:
- What's the evidence for this worry?
- What's the worst that could realistically happen?
- Has this happened before? What was the outcome?

**4. Physical Movement**
- Take a walk
- Stretch your body
- Shake out your hands
- Splash cold water on your face

**5. Talk to Someone**
Sometimes just sharing what you're feeling helps. That's what MindSpace is here for!`,
      keyTakeaway: "Coping techniques work best when practiced regularly—not just when you're already anxious.",
    },
    {
      title: "Building Resilience",
      content: `Resilience isn't about never feeling anxious. It's about bouncing back when you do.

**Ways to build resilience:**

**1. Build Your Support System**
- Connect with people who understand
- Don't isolate when anxious
- Ask for help when needed

**2. Take Care of Basics**
- Sleep: 7-9 hours matters more than you think
- Exercise: Even 20 minutes of walking helps
- Nutrition: Skip excessive caffeine and sugar
- Limit alcohol: It worsens anxiety

**3. Challenge "All or Nothing" Thinking**
Instead of "I must be perfect," try "I did my best."
Instead of "Everything is ruined," try "This is hard, but I can handle it."

**4. Celebrate Small Wins**
- Managed to go to that social event? Win!
- Used a breathing technique? Win!
- Even acknowledging you feel anxious is a win!

**5. Remember: Progress, Not Perfection**
Recovery isn't linear. Some days will be better than others. That's okay.`,
      keyTakeaway: "Resilience is a skill that grows stronger with practice. Every small step counts.",
    },
  ],
  "breaking-shame": [
    {
      title: "Understanding Shame",
      content: `Shame is that deep feeling that "I am bad" versus guilt which is "I did something bad."

Shame says: "I'm worthless"
Guilt says: "I made a mistake"

**Where does shame come from?**
- Childhood experiences
- Cultural messages about perfection
- Being criticized for mistakes
- Comparing ourselves to others
- "Log kya kahenge" pressure

**In Indian culture specifically:**
- Academic pressure from a young age
- Marriage and career expectations
- Family reputation concerns
- Not meeting "what society expects"

Shame thrives in secrecy. The more we hide, the stronger it grows. But here's the truth: shame is universal. Everyone feels it. You're not alone.`,
      keyTakeaway: "Shame tells us we're fundamentally flawed. But we are not our worst moments—we are humans who grow.",
    },
    {
      title: "Challenging Shameful Thoughts",
      content: `Shame loves to lie to us. Here's how to challenge those lies:

**Common Shame Lies:**
1. "I'm not good enough"
2. "Everyone else has it together"
3. "I should be over this by now"
4. "If people knew the real me..."

**Challenge them with questions:**
- Where is the evidence for this?
- Would I judge a friend this harshly?
- Is this a fact or a feeling?
- What's the worst that would actually happen?

**Practice Self-Compassion:**
Talk to yourself like you'd talk to a dear friend:
- "This is hard. It's understandable to feel this way."
- "Many people struggle with this too."
- "I deserve kindness, especially from myself."

**Remember:** Shame loses power when we speak it out loud. That's why sharing in safe spaces like MindSpace can be healing.`,
      keyTakeaway: "Shame shrinks when we bring it into the light and challenge its lies with truth.",
    },
    {
      title: "Practicing Self-Compassion",
      content: `Self-compassion is the opposite of shame. It means being kind to yourself, especially when you're struggling.

**Three parts of self-compassion:**

**1. Self-Kindness vs. Self-Judgment**
When you make a mistake, instead of "I'm so stupid," try:
"I'm human. I made a mistake. It's okay."

**2. Common Humanity vs. Isolation**
Instead of "Why am I the only one feeling this?" try:
"This is part of the human experience. Many people feel this way."

**3. Mindfulness vs. Over-identification**
Acknowledge the feeling without getting lost in it:
"I'm feeling shame right now. That's painful. It will pass."

**Daily Practices:**
- Start each day with one kind thought about yourself
- End each day by listing 3 things you did well
- When you make a mistake, say "Oops" instead of "I'm worthless"
- Treat yourself like you'd treat a child you love`,
      keyTakeaway: "Self-compassion is a skill. The more you practice, the more natural it becomes.",
    },
  ],
  "healthy-boundaries": [
    {
      title: "Why Boundaries Matter",
      content: `Boundaries are the limits we set to protect our physical, emotional, and mental space.

**Without boundaries, we:**
- Feel exhausted and resentful
- Say yes when we want to say no
- Neglect our own needs
- Attract people who take advantage
- Lose ourselves trying to please everyone

**Types of boundaries:**
- **Physical:** Personal space, privacy, physical touch
- **Emotional:** Not taking responsibility for others' feelings
- **Time:** Protecting your time from demands
- **Material:** What you're willing to share or lend
- **Mental:** Your opinions, values, beliefs

**In Indian families:**
Setting boundaries can feel especially challenging because of:
- "Family comes first" expectations
- Joint family systems
- Respect for elders overriding your needs
- Guilt when saying no to family

But here's the truth: Healthy boundaries don't mean you don't love your family. They mean you respect both yourself and others.`,
      keyTakeaway: "Boundaries aren't walls—they're gates that let the right things in and keep the harmful things out.",
    },
    {
      title: "Identifying Your Limits",
      content: `Before you can set boundaries, you need to know where your limits are.

**Exercise: The Boundary Inventory**

**1. Physical Limits**
- How much personal space do you need?
- What physical activities drain or energize you?
- When do you need to be alone?

**2. Emotional Limits**
- What topics are off-limits for certain people?
- How much drama can you handle?
- When do you start feeling overwhelmed?

**3. Time Limits**
- How many commitments can you realistically handle?
- What's your work-life balance?
- When do you need to say no?

**Warning signs you need a boundary:**
- Feeling used or taken for granted
- Resentment building up
- Physical symptoms (headaches, tiredness)
- Dread about certain people or situations
- Saying yes when you mean no

**Ask yourself:**
"What am I willing to accept? What am I NOT willing to accept?"`,
      keyTakeaway: "Knowing your limits is the first step. You can't protect what you haven't defined.",
    },
    {
      title: "Communicating Boundaries",
      content: `Saying your boundaries clearly and calmly is a skill that improves with practice.

**The Boundary Formula:**
1. **State the boundary clearly** (no explanation needed)
2. **Be firm but kind**
3. **Offer alternatives if appropriate**

**Examples:**
- "I can't lend money right now, but I can help you look for resources."
- "I need advance notice before visits. Can we plan for next week instead?"
- "I'm not comfortable discussing my salary. Let's talk about something else."
- "I need to leave work at 6pm to take care of myself. I'll handle the rest tomorrow."

**When people push back:**
- "That's not how family works!" → "I understand this feels different. This is what works for me."
- "You're being selfish." → "I care about you, and I also need to care for myself."
- "Just this once." → "Thanks for understanding. This is my consistent boundary."

**Remember:**
- You don't owe explanations beyond stating your limit
- "No" is a complete sentence
- It's okay if people are upset
- Your needs matter as much as others'`,
      keyTakeaway: "Communicating boundaries isn't about changing others—it's about being clear about what you will and won't accept.",
    },
    {
      title: "Dealing with Pushback",
      content: `When you set boundaries, not everyone will be happy. That's normal and okay.

**Common reactions and how to handle them:**

**1. Guilt**
This is normal! It's not evidence that you're wrong.
Remind yourself: "Guilt is uncomfortable but temporary. Resentment is worse and longer-lasting."

**2. Anger**
"Some people will get angry. Let them. Being angry is their right. Not accepting their anger is yours."

**3. Manipulation**
"I'm sorry you feel that way" is not accepting responsibility for their feelings.
You are not responsible for managing others' emotions.

**4. Threats**
"I'm going to tell everyone you're terrible." → True friends and family will respect boundaries. Those who don't reveal themselves.

**5. Silent Treatment**
This is a form of manipulation. Stay firm. Eventually, most people adapt.

**Taking care of yourself:**
- It's okay to end a conversation when it becomes unproductive
- Seek support from people who understand
- Remember: boundary-setting is a form of self-respect

**The ultimate truth:**
People who respect you will learn to respect your boundaries. Those who don't were never truly respecting you.`,
      keyTakeaway: "Not everyone will accept your boundaries—and that's okay. The right people will.",
    },
  ],
};

// Default content for courses without specific content
const DEFAULT_CONTENT = [
  {
    title: "Welcome",
    content: "This course will help you understand and manage your mental health better. Let's begin this journey together.\n\nIn the following lessons, we'll explore practical techniques and insights you can apply in your daily life.\n\nRemember: progress, not perfection. Every small step counts.",
    keyTakeaway: "You're taking an important step by being here. That's worth celebrating.",
  },
];

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    params.then((p) => setCourseId(p.id));
  }, [params]);

  const course = courseId ? COURSES.find((c) => c.id === courseId) : null;
  const lessons = courseId ? COURSE_CONTENT[courseId] || DEFAULT_CONTENT : DEFAULT_CONTENT;

  const lesson = lessons[currentLesson];

  const markComplete = () => {
    const lessonKey = `${courseId}-${currentLesson}`;
    if (!completedLessons.includes(lessonKey)) {
      setCompletedLessons([...completedLessons, lessonKey]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/resources"
              className="text-[var(--text-muted)] hover:text-[var(--primary)]"
            >
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
                {course.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Lesson {currentLesson + 1} of {lessons.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            {lesson.title}
          </h2>
          <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
            {lesson.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <p key={i}>
                    <strong>{paragraph.replace(/\*\*/g, "")}</strong>
                  </p>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((item) => item.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-[var(--primary)] mb-2">💡 Key Takeaway</h3>
          <p className="text-[var(--text-primary)]">{lesson.keyTakeaway}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            disabled={currentLesson === 0}
            className="btn btn-outline disabled:opacity-50"
          >
            <HiChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="flex gap-2">
            {lessons.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentLesson
                    ? "bg-[var(--primary)]"
                    : completedLessons.includes(`${courseId}-${i}`)
                    ? "bg-[var(--success)]"
                    : "bg-[var(--surface-hover)]"
                }`}
              />
            ))}
          </div>

          {currentLesson < lessons.length - 1 ? (
            <button onClick={markComplete} className="btn btn-primary">
              Next
              <HiChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <Link href="/resources" className="btn btn-primary">
              Complete Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
