"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Journal",
    description:
      "Empathetic responses, not robotic ones. Our AI listens with care and responds with understanding.",
  },
  {
    icon: "👥",
    title: "Anonymous Support Circles",
    description:
      "Share without fear of judgment. Connect with people who truly understand what you're going through.",
  },
  {
    icon: "💬",
    title: "1-on-1 Peer Chat",
    description:
      "Talk to someone who gets it. Match with peers who share similar experiences.",
  },
  {
    icon: "📊",
    title: "Mood Tracking",
    description:
      "Understand your emotional patterns. See how your mood changes over time with beautiful insights.",
  },
  {
    icon: "🧘",
    title: "Guided Self-Help",
    description:
      "Meditations, exercises, mini courses. Tools to help you cope, right at your fingertips.",
  },
  {
    icon: "🚨",
    title: "Crisis Support",
    description:
      "Always here when it gets really hard. Instant access to helplines and emergency resources.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section bg-[var(--surface)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--primary)] uppercase tracking-wider mb-4 block">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
            Features Built for Your Wellbeing
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            A complete toolkit for your mental health journey — all in one safe,
            anonymous space.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-[var(--surface-hover)] transition-all duration-300 group"
            >
              {/* Icon with gradient background */}
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-[family-name:var(--font-outfit)]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
