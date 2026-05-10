"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiFire, HiCheck, HiTrendingUp } from "react-icons/hi";

const HABITS = [
  { id: "journal", emoji: "📝", label: "Journaled today", auto: true },
  { id: "meditation", emoji: "🧘", label: "Meditated", auto: false },
  { id: "sleep", emoji: "😴", label: "Good sleep", auto: false },
  { id: "movement", emoji: "🚶", label: "Some movement", auto: false },
  { id: "connect", emoji: "💬", label: "Connected with someone", auto: false },
  { id: "water", emoji: "💧", label: "Drank enough water", auto: false },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Demo data
const WEEKLY_DATA = [
  [true, false, true, true, true, false, true],
  [false, true, false, true, true, false, false],
  [true, true, true, true, false, false, true],
  [false, false, true, true, true, true, true],
  [true, true, false, true, false, true, false],
  [false, true, true, true, true, false, true],
];

export default function HabitsPage() {
  const [completedHabits, setCompletedHabits] = useState<string[]>(["journal"]);
  const [weeklyHabits] = useState(WEEKLY_DATA);

  const toggleHabit = (id: string) => {
    if (completedHabits.includes(id)) {
      setCompletedHabits(completedHabits.filter((h) => h !== id));
    } else {
      setCompletedHabits([...completedHabits, id]);
    }
  };

  const completionRate = Math.round((completedHabits.length / HABITS.length) * 100);
  const streak = 5; // Demo streak

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
              Daily Habits 💙
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-[var(--surface)] rounded-2xl p-4 text-center border border-[var(--surface-hover)]">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-2">
              <HiFire className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{streak}</p>
            <p className="text-xs text-[var(--text-muted)]">Day Streak</p>
          </div>
          <div className="bg-[var(--surface)] rounded-2xl p-4 text-center border border-[var(--surface-hover)]">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-2">
              <HiTrendingUp className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{completionRate}%</p>
            <p className="text-xs text-[var(--text-muted)]">Today</p>
          </div>
          <div className="bg-[var(--surface)] rounded-2xl p-4 text-center border border-[var(--surface-hover)]">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🏆</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">12</p>
            <p className="text-xs text-[var(--text-muted)]">Badges</p>
          </div>
        </motion.div>

        {/* Today's Habits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Today's Check-in
          </h2>
          <div className="space-y-3">
            {HABITS.map((habit) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  completedHabits.includes(habit.id)
                    ? "bg-[var(--primary)]/10 border border-[var(--primary)]"
                    : "bg-[var(--background)] border border-transparent hover:border-[var(--surface-hover)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    completedHabits.includes(habit.id)
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--surface-hover)]"
                  }`}
                >
                  {completedHabits.includes(habit.id) ? (
                    <HiCheck className="w-5 h-5" />
                  ) : (
                    habit.emoji
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[var(--text-primary)]">{habit.label}</p>
                  {habit.auto && (
                    <p className="text-xs text-[var(--text-muted)]">Auto-tracked from your journal</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Weekly View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            This Week
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2"></th>
                  {WEEKDAYS.map((day) => (
                    <th key={day} className="text-center pb-2 text-xs text-[var(--text-muted)]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HABITS.slice(0, 4).map((habit, habitIndex) => (
                  <tr key={habit.id}>
                    <td className="py-1 pr-4 text-sm text-[var(--text-secondary)]">
                      {habit.emoji} {habit.label}
                    </td>
                    {weeklyHabits[habitIndex].map((done, dayIndex) => (
                      <td key={dayIndex} className="text-center py-1">
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                            done
                              ? "bg-[var(--primary)]"
                              : "bg-[var(--surface-hover)]"
                          }`}
                        >
                          {done && <HiCheck className="w-4 h-4 text-white" />}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Badges Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Your Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { emoji: "🌱", label: "First Entry", earned: true },
              { emoji: "🔥", label: "7-Day Streak", earned: true },
              { emoji: "💙", label: "30 Entries", earned: true },
              { emoji: "🧘", label: "First Meditation", earned: true },
              { emoji: "👥", label: "First Circle", earned: false },
              { emoji: "💬", label: "First Comment", earned: false },
              { emoji: "🌟", label: "30 Days", earned: false },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`flex flex-col items-center p-3 rounded-xl ${
                  badge.earned
                    ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30"
                    : "bg-[var(--background)] opacity-50"
                }`}
              >
                <span className="text-2xl mb-1">{badge.emoji}</span>
                <span className="text-xs text-[var(--text-secondary)]">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
