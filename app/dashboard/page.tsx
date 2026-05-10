"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrisisBanner from "@/components/CrisisBanner";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const { data: session } = useSession();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const quickActions = [
    { emoji: "📝", label: "Journal today", href: "/journal", color: "#7C6FF7" },
    { emoji: "🧘", label: "Meditate", href: "/resources", color: "#10B981" },
    { emoji: "👥", label: "Visit circles", href: "/circles", color: "#F59E0B" },
    { emoji: "📊", label: "My mood", href: "/journal/trends", color: "#60A5FA" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)] mb-2">
              Good {getGreeting()},{" "}
              <span className="text-[var(--primary)]">
                {session?.user?.pseudonym || "Friend"} 💙
              </span>
            </h1>
            <p className="text-[var(--text-secondary)]">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-[var(--surface)] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[var(--surface-hover)]"
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-3xl"
                    style={{
                      backgroundColor: `${action.color}15`,
                    }}
                  >
                    {action.emoji}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Daily Check-in Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl p-8 text-white mb-8"
          >
            <h2 className="text-xl font-bold mb-2 font-[family-name:var(--font-outfit)]">
              How are you feeling today?
            </h2>
            <p className="text-white/80 mb-6">
              Taking a moment to check in with yourself can make a big difference.
            </p>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
            >
              Start journaling
              <span>→</span>
            </Link>
          </motion.div>

          {/* Recent Activity & Motivation */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Motivation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--surface)] rounded-3xl p-6 shadow-sm border border-[var(--surface-hover)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💭</span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Daily Reminder
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] text-lg italic leading-relaxed">
                "Khud se pyaar karo. Self-love pehle. You're doing better than you think. 💙"
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[var(--surface)] rounded-3xl p-6 shadow-sm border border-[var(--surface-hover)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Your Journey
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">🔥 Journaling streak</span>
                  <span className="font-semibold text-[var(--primary)]">0 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">📝 Total entries</span>
                  <span className="font-semibold text-[var(--primary)]">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">👥 Circles joined</span>
                  <span className="font-semibold text-[var(--primary)]">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">💙 Days on MindSpace</span>
                  <span className="font-semibold text-[var(--primary)]">0</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Resource of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-[var(--surface)] rounded-3xl p-6 shadow-sm border border-[var(--surface-hover)]"
          >
            <span className="text-sm font-medium text-[var(--secondary)] uppercase tracking-wider">
              Resource of the Day
            </span>
            <div className="flex items-center gap-4 mt-3">
              <div className="w-16 h-16 rounded-2xl bg-[var(--success)]/10 flex items-center justify-center text-3xl">
                🧘
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  5-Minute Calm
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  A quick breathing exercise to help you find peace in moments of stress.
                </p>
              </div>
              <Link
                href="/resources"
                className="btn btn-secondary text-sm"
              >
                Try it
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <CrisisBanner />
      <Footer />
    </div>
  );
}
