"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiSun, HiMoon, HiBell, HiShieldCheck, HiDownload, HiTrash } from "react-icons/hi";
import { generatePseudonym } from "@/lib/pseudonyms";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [pseudonym, setPseudonym] = useState(generatePseudonym());

  const handleRegeneratePseudonym = () => {
    setPseudonym(generatePseudonym());
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
              Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Identity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Your Identity
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${pseudonym.color}20` }}
            >
              {pseudonym.emoji}
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] text-lg">
                {pseudonym.pseudonym}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Your anonymous identity on MindSpace
              </p>
            </div>
          </div>
          <button
            onClick={handleRegeneratePseudonym}
            className="btn btn-outline w-full"
          >
            Regenerate Identity
          </button>
          <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
            Note: Posts will still show your old name
          </p>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Preferences
          </h2>
          
          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <HiMoon className="w-5 h-5 text-[var(--primary)]" />
                ) : (
                  <HiSun className="w-5 h-5 text-[var(--primary)]" />
                )}
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Dark Mode</p>
                  <p className="text-sm text-[var(--text-muted)]">Easier on eyes at night</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  darkMode ? "bg-[var(--primary)]" : "bg-[var(--surface-hover)]"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    darkMode ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HiBell className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Daily Reminders</p>
                  <p className="text-sm text-[var(--text-muted)]">Gentle nudge to journal</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  notifications ? "bg-[var(--primary)]" : "bg-[var(--surface-hover)]"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Privacy & Security
          </h2>
          
          <div className="space-y-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <HiShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Crisis Contact</p>
                  <p className="text-sm text-[var(--text-muted)]">Add someone we can alert</p>
                </div>
              </div>
              <span className="text-[var(--text-muted)]">→</span>
            </button>

            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <HiDownload className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Download My Data</p>
                  <p className="text-sm text-[var(--text-muted)]">Export all your entries</p>
                </div>
              </div>
              <span className="text-[var(--text-muted)]">→</span>
            </button>

            <button className="flex items-center justify-between w-full text-left text-[var(--danger)]">
              <div className="flex items-center gap-3">
                <HiTrash className="w-5 h-5" />
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm opacity-70">Permanently remove all data</p>
                </div>
              </div>
              <span>→</span>
            </button>
          </div>
        </motion.div>

        {/* Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Help & Support
          </h2>
          
          <div className="space-y-3">
            <Link href="/privacy" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
              Mental Health Disclaimer
            </Link>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="bg-[var(--background)] rounded-xl p-4 text-sm text-[var(--text-muted)]">
          <p>
            <strong>Disclaimer:</strong> MindSpace is a peer support platform, not a substitute for professional mental health care. We do not provide therapy, diagnosis, or medical advice. If you are in crisis, please contact a mental health professional or call AASRA: 9152987821
          </p>
        </div>

        {/* Version */}
        <p className="text-center text-sm text-[var(--text-muted)]">
          MindSpace v1.0.0 · Made with 💙 for India
        </p>
      </div>
    </div>
  );
}
