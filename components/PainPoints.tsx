"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    icon: "💸",
    title: "Therapy costs ₹1500-3000/session.",
    subtitle: "That's not accessible.",
    description:
      "Not everyone can afford that. But everyone deserves support.",
  },
  {
    icon: "😟",
    title: "Scared of being judged?",
    subtitle: "'Log kya kahenge?' We get it.",
    description:
      "In India, mental health still carries stigma. Here, you're completely anonymous.",
  },
  {
    icon: "📍",
    title: "No therapist in your city?",
    subtitle: "You deserve support anyway.",
    description:
      "Tier-2 and tier-3 cities have limited mental health resources. We're available 24/7.",
  },
];

export default function PainPoints() {
  return (
    <section className="section-sm bg-[var(--surface)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
            You're not alone in feeling this
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Millions of Indians struggle with mental health every day. You don't
            have to face it by yourself.
          </p>
        </motion.div>

        {/* Pain Point Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 border-2 border-[var(--primary-light)]/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{point.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-[family-name:var(--font-outfit)]">
                {point.title}
              </h3>
              <p className="text-lg text-[var(--primary)] font-medium mb-4">
                {point.subtitle}
              </p>

              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {point.description}
              </p>

              {/* Decorative gradient line */}
              <div className="mt-6 h-1 w-20 rounded-full gradient-primary" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
