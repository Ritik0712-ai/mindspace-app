"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Journal Freely",
    description:
      "Write how you feel. Our AI listens with empathy, not diagnosis. Express yourself without fear of judgment.",
    icon: "📝",
  },
  {
    number: "02",
    title: "Connect Anonymously",
    description:
      "Join support circles with people who truly understand. Your identity stays protected — always.",
    icon: "👥",
  },
  {
    number: "03",
    title: "Find Your Calm",
    description:
      "Tools, resources, and community to help you heal. One step at a time, at your own pace.",
    icon: "🧘",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-light)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--secondary-light)]/10 rounded-full blur-3xl" />
      </div>

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
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
            How It Works
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Getting started takes less than 2 minutes. No complicated forms, no
            commitment — just you and your safe space.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-[var(--primary-light)] via-[var(--primary)] to-[var(--secondary-light)]" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number badge */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary text-white text-2xl font-bold mb-6 shadow-lg relative z-10"
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  className="text-5xl mb-6"
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>

                {/* Arrow (desktop only) */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-24 -right-6 text-[var(--primary-light)]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/signup"
            className="btn btn-primary text-lg px-10 py-4 shadow-lg"
          >
            Begin Your Journey
            <span className="ml-2">→</span>
          </a>
          <p className="text-sm text-[var(--text-muted)] mt-4">
            Free forever. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
