"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg -z-10" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-10 w-64 h-64 bg-[var(--primary-light)] rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-10 w-80 h-80 bg-[var(--secondary-light)] rounded-full blur-3xl opacity-15"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 badge badge-primary mb-6"
            >
              <span>🔒</span>
              <span>100% Anonymous</span>
              <span>·</span>
              <span>Free to Start</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6 font-[family-name:var(--font-outfit)]"
            >
              Your Safe Space.{" "}
              <span className="text-gradient">No Judgment.</span>{" "}
              Always Here.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              A private, anonymous platform to journal your thoughts, connect
              with people who understand, and find your calm. Built for Indians
              who need support but cannot afford ₹2000/session therapy.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/signup" className="btn btn-primary text-lg px-8 py-4">
                Start Journaling Free
                <span className="ml-2">→</span>
              </Link>
              <a href="#how-it-works" className="btn btn-secondary text-lg px-8 py-4">
                See How It Works
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-lg">🔒</span>
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-lg">👤</span>
                <span>No real name needed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-lg">💰</span>
                <span>Free forever (basic)</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual - Animated Journal & Chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Floating journal */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="w-72 h-96 sm:w-80 sm:h-[450px] bg-white rounded-3xl shadow-2xl p-6 border border-[var(--surface-hover)]">
                {/* Journal Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      My Safe Space
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">Today at 10:30 PM</p>
                  </div>
                </div>

                {/* Journal Content */}
                <div className="space-y-4">
                  <div className="bg-[var(--background)] rounded-2xl p-4">
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      How are you feeling?
                    </p>
                    <div className="flex gap-2">
                      {["😊", "😌", "😔", "😰"].map((emoji) => (
                        <span
                          key={emoji}
                          className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[var(--surface-hover)] rounded-2xl p-4">
                    <p className="text-sm text-[var(--text-secondary)] italic">
                      "Feeling overwhelmed with everything lately. Need to get
                      it out..."
                    </p>
                  </div>

                  {/* AI Response */}
                  <div className="bg-[var(--primary-light)]/10 rounded-2xl p-4 border border-[var(--primary-light)]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">💙</span>
                      <span className="text-xs font-medium text-[var(--primary)]">
                        MindSpace AI
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      I hear you. It sounds like you're carrying a lot right now.
                      That takes courage to admit...
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating chat bubbles */}
            <motion.div
              animate={{
                y: [0, 15, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-8 -right-4 sm:right-0 z-20"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 max-w-[180px] border border-[var(--surface-hover)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#60A5FA] flex items-center justify-center text-xs">
                    🦊
                  </div>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    Green Fox
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  "I totally understand what you're going through..."
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 sm:left-0 z-20"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 max-w-[160px] border border-[var(--surface-hover)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#34D399] flex items-center justify-center text-xs">
                    🐘
                  </div>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    Blue Elephant
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  "You're not alone in this 💙"
                </p>
              </div>
            </motion.div>

            {/* Decorative circles */}
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[var(--primary-light)]/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--primary-light)]/10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-[var(--text-muted)] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
