"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiRefresh, HiClock, HiCheck, HiChevronRight, HiChevronLeft, HiCalendar } from "react-icons/hi";
import toast from "react-hot-toast";
import { getPromptForMood, getAlternativePrompt, type MoodType, type JournalPrompt } from "@/lib/prompts";
import { CRISIS_HELPLINES } from "@/lib/crisis";

// Mood emoji mapping
const MOODS: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: "great", emoji: "😊", label: "Great", color: "#10B981" },
  { type: "okay", emoji: "😐", label: "Okay", color: "#F59E0B" },
  { type: "low", emoji: "😔", label: "Low", color: "#6366F1" },
  { type: "sad", emoji: "😢", label: "Sad", color: "#8B5CF6" },
  { type: "anxious", emoji: "😰", label: "Anxious", color: "#EF4444" },
  { type: "frustrated", emoji: "😡", label: "Frustrated", color: "#F97316" },
];

// Mood tags
const MOOD_TAGS: Record<MoodType, string[]> = {
  great: ["Grateful", "Excited", "Peaceful", "Loved"],
  okay: ["Tired", "Neutral", "Managing", "Meh"],
  low: ["Empty", "Heavy", "Numb", "Quiet"],
  sad: ["Heartbroken", "Lonely", "Hopeless", "Disappointed"],
  anxious: ["Worried", "Overwhelmed", "Heart Racing", "Restless"],
  frustrated: ["Angry", "Annoyed", "Stuck", "Stressed"],
};

// Demo entries for history
const DEMO_ENTRIES = [
  {
    id: "1",
    content: "Today was really tough. My parents compared me to my cousin again about placements. Feeling overwhelmed with all the pressure...",
    mood: "anxious",
    moodScore: 3,
    tags: ["Overwhelmed", "Heart Racing"],
    aiResponse: "I hear you. The pressure from family can feel suffocating at times. Remember, your worth isn't defined by comparisons. What's one small thing that felt manageable today?",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    content: "Had a good conversation with a friend today. It helped to just talk about things without judgment.",
    mood: "okay",
    moodScore: 6,
    tags: ["Managing"],
    aiResponse: "That's wonderful! Connection really does help. Even small conversations can shift our perspective. What's one thing you're grateful for today?",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    content: "Finally submitted my assignment. Small win but I'll take it.",
    mood: "great",
    moodScore: 8,
    tags: ["Grateful", "Peaceful"],
    aiResponse: "You did it! Celebrating small wins is so important. You showed up for yourself today, and that matters. 💙",
    createdAt: "2 days ago",
  },
];

export default function JournalPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodScore, setMoodScore] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "history" | "trends">("write");
  const [entries, setEntries] = useState(DEMO_ENTRIES);

  // Get prompt when mood changes
  useEffect(() => {
    if (selectedMood) {
      setCurrentPrompt(getPromptForMood(selectedMood));
    }
  }, [selectedMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setSelectedTags([]);
    setAiResponse(null);
    setShowCrisis(false);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleRefreshPrompt = () => {
    if (selectedMood && currentPrompt) {
      setCurrentPrompt(getAlternativePrompt(selectedMood, currentPrompt.id));
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something before submitting");
      return;
    }
    if (!selectedMood) {
      toast.error("Please select your mood");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/journal/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          mood: selectedMood,
          moodScore,
          tags: selectedTags,
          pseudonym: "Blue Elephant",
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.helplines) {
          setShowCrisis(true);
        }
        if (data.entry.aiResponse) {
          setAiResponse(data.entry.aiResponse);
        }
        
        // Add to entries list
        const newEntry = {
          id: data.entry.id,
          content: content,
          mood: selectedMood,
          moodScore: moodScore,
          tags: selectedTags,
          aiResponse: data.entry.aiResponse,
          createdAt: "Just now",
        };
        setEntries([newEntry, ...entries]);
        
        toast.success("Entry saved! 💙");
        setContent("");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const found = MOODS.find((m) => m.type === mood);
    return found?.emoji || "😊";
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                <HiChevronLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
                📝 Journal
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {isSaved && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm text-[var(--success)] flex items-center gap-1"
                >
                  <HiCheck className="w-4 h-4" /> Saved
                </motion.span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4 border-b border-[var(--surface-hover)]">
            <button
              onClick={() => setActiveTab("write")}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === "write"
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === "history"
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("trends")}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === "trends"
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Trends
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6" id="main-content">
        {activeTab === "write" && (
          <div className="space-y-6">
            {/* Mood Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                How are you feeling right now?
              </h2>
              <div className="flex flex-wrap gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood.type}
                    onClick={() => handleMoodSelect(mood.type)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedMood === mood.type
                        ? "border-[var(--primary)] bg-[var(--primary)]/10"
                        : "border-[var(--surface-hover)] hover:border-[var(--primary)]/50"
                    }`}
                    aria-label={`Select ${mood.label} mood`}
                  >
                    <span className="text-3xl" role="img" aria-label={mood.label}>{mood.emoji}</span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Intensity Slider */}
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6"
                >
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Intensity: {moodScore}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(parseInt(e.target.value))}
                    className="w-full accent-[var(--primary)]"
                    aria-label="Mood intensity slider"
                  />
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                    <span>Mild</span>
                    <span>Strong</span>
                  </div>

                  {/* Mood Tags */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      What's contributing to this feeling?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {MOOD_TAGS[selectedMood].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-all ${
                            selectedTags.includes(tag)
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--background)] text-[var(--text-secondary)] hover:bg-[var(--primary)]/10"
                          }`}
                          aria-pressed={selectedTags.includes(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Journal Editor */}
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
              >
                {/* Prompt */}
                {currentPrompt && (
                  <div className="mb-4 flex items-start gap-3">
                    <div className="bg-[var(--primary)]/10 rounded-lg p-3 flex-1">
                      <p className="text-[var(--text-primary)] italic">
                        {currentPrompt.text}
                      </p>
                      {currentPrompt.hint && (
                        <p className="text-sm text-[var(--text-muted)] mt-2">
                          💡 {currentPrompt.hint}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleRefreshPrompt}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                      title="Get a different prompt"
                      aria-label="Get a different prompt"
                    >
                      <HiRefresh className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Textarea */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="This is your safe space. Write anything. There are no right answers here."
                  className="w-full h-64 p-4 bg-[var(--background)] rounded-xl border border-[var(--surface-hover)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  aria-label="Journal entry"
                />

                {/* Word count */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-[var(--text-muted)]">
                    {wordCount} words
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !content.trim()}
                  className="w-full btn btn-primary mt-4 py-4 text-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Reading your words with care...
                    </span>
                  ) : (
                    "Share with my AI companion 💙"
                  )}
                </button>
              </motion.div>
            )}

            {/* Crisis Banner */}
            <AnimatePresence>
              {showCrisis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-[#DC2626] mb-3">
                    💙 We're concerned about you
                  </h3>
                  <p className="text-[var(--text-primary)] mb-4">
                    Please reach out to someone who can help right now:
                  </p>
                  <div className="space-y-2">
                    {CRISIS_HELPLINES.map((line) => (
                      <div key={line.name} className="flex items-center gap-2">
                        <span className="font-medium text-[var(--text-primary)]">{line.name}:</span>
                        <a href={`tel:${line.number}`} className="text-[var(--primary)] font-bold" aria-label={`Call ${line.name}`}>
                          {line.number}
                        </a>
                        <span className="text-sm text-[var(--text-muted)]">({line.available})</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowCrisis(false)}
                    className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--primary)]"
                  >
                    I'm safe, continue journaling →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Response */}
            <AnimatePresence>
              {aiResponse && !showCrisis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--primary)]/5 rounded-2xl p-6 border border-[var(--primary)]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      <span className="text-xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                        MindSpace
                      </h3>
                      <div className="prose prose-sm max-w-none text-[var(--text-primary)] whitespace-pre-wrap">
                        {aiResponse.split("\n").map((paragraph, i) => (
                          <p key={i} className="mb-2">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Journal Entries</h2>
              <span className="text-sm text-[var(--text-muted)]">{entries.length} entries</span>
            </div>
            
            {entries.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <p className="text-4xl mb-4">📚</p>
                <p>Your journal history will appear here.</p>
                <p className="text-sm mt-2">Start writing to see your entries!</p>
              </div>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={entry.mood}>
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <div>
                        <p className="font-medium text-[var(--text-primary)] capitalize">{entry.mood}</p>
                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <HiCalendar className="w-3 h-3" />
                          {entry.createdAt}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">
                      Score: {entry.moodScore}/10
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                    {entry.content}
                  </p>
                  
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[var(--background)] rounded-full text-xs text-[var(--text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {entry.aiResponse && (
                    <div className="bg-[var(--primary)]/5 rounded-xl p-4 border-l-4 border-[var(--primary)]">
                      <p className="text-sm font-medium text-[var(--primary)] mb-1">AI Companion Response:</p>
                      <p className="text-sm text-[var(--text-secondary)]">{entry.aiResponse}</p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === "trends" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Mood Trends</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--surface-hover)] text-center">
                <p className="text-3xl font-bold text-[var(--primary)]">{entries.length}</p>
                <p className="text-sm text-[var(--text-muted)]">Total Entries</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--surface-hover)] text-center">
                <p className="text-3xl font-bold text-[var(--success)]">
                  {entries.length > 0 ? Math.round(entries.reduce((acc, e) => acc + e.moodScore, 0) / entries.length) : 0}
                </p>
                <p className="text-sm text-[var(--text-muted)]">Avg Mood</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--surface-hover)] text-center">
                <p className="text-3xl font-bold text-[var(--secondary)]">
                  {entries.filter(e => e.moodScore >= 7).length}
                </p>
                <p className="text-sm text-[var(--text-muted)]">Good Days</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--surface-hover)] text-center">
                <p className="text-3xl font-bold text-[#F59E0B]">🔥</p>
                <p className="text-sm text-[var(--text-muted)]">Keep Going!</p>
              </div>
            </div>

            {/* Mood Distribution */}
            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Mood Distribution</h3>
              <div className="space-y-3">
                {MOODS.map((mood) => {
                  const count = entries.filter(e => e.mood === mood.type).length;
                  const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0;
                  return (
                    <div key={mood.type} className="flex items-center gap-3">
                      <span className="text-xl w-8" role="img" aria-label={mood.label}>{mood.emoji}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%`, backgroundColor: mood.color }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-[var(--text-muted)] w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Insight */}
            <div className="bg-[var(--primary)]/5 rounded-2xl p-6 border border-[var(--primary)]/20">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">💡 Weekly Insight</h3>
              <p className="text-[var(--text-secondary)]">
                {entries.length > 0 
                  ? `You've written ${entries.length} entries this week. Your most common mood has been "${entries[0]?.mood}". Keep journaling to discover more patterns!`
                  : "Start journaling to see insights about your emotional patterns. Every entry helps you understand yourself better."
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
