"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    subtitle: "Forever",
    price: "₹0",
    period: "forever",
    description: "Everything you need to get started on your wellness journey.",
    features: [
      { text: "Daily journaling (unlimited entries)", included: true },
      { text: "5 AI responses per day", included: true },
      { text: "Join 2 support circles", included: true },
      { text: "Basic mood tracking", included: true },
      { text: "Self-help library (limited)", included: true },
      { text: "1-on-1 peer chat", included: false },
      { text: "Advanced mood analytics", included: false },
      { text: "Unlimited AI responses", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    subtitle: "Most Popular",
    price: "₹99",
    period: "/month",
    description: "Complete access to accelerate your healing journey.",
    features: [
      { text: "Daily journaling (unlimited entries)", included: true },
      { text: "Unlimited AI responses", included: true },
      { text: "Join unlimited circles", included: true },
      { text: "1-on-1 peer chat (unlimited)", included: true },
      { text: "Advanced mood analytics", included: true },
      { text: "Full self-help library", included: true },
      { text: "Priority support", included: true },
      { text: "Early access to new features", included: true },
    ],
    cta: "Try Premium Free",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-[var(--surface)]">
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
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
            Choose Your Path
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no commitment.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-2xl scale-105"
                  : "bg-white border-2 border-[var(--surface-hover)] shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--secondary)] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="text-center mb-6">
                <h3
                  className={`text-2xl font-bold mb-1 font-[family-name:var(--font-outfit)] ${
                    plan.popular ? "text-white" : "text-[var(--text-primary)]"
                  }`}
                >
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/80" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {plan.subtitle}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span
                  className={`text-5xl font-bold ${
                    plan.popular ? "text-white" : "text-[var(--text-primary)]"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-lg ${
                    plan.popular ? "text-white/80" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={`text-center mb-8 ${
                  plan.popular ? "text-white/90" : "text-[var(--text-secondary)]"
                }`}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        feature.included
                          ? plan.popular
                            ? "bg-white/20 text-white"
                            : "bg-[var(--success)]/10 text-[var(--success)]"
                          : "bg-[var(--text-muted)]/10 text-[var(--text-muted)]"
                      }`}
                    >
                      {feature.included ? (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={
                        feature.included
                          ? plan.popular
                            ? "text-white"
                            : "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] line-through opacity-60"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/signup"
                className={`block w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 ${
                  plan.popular
                    ? "bg-white text-[var(--primary)] hover:bg-white/90 shadow-lg"
                    : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--text-muted)] text-sm flex items-center justify-center gap-2">
            <span className="text-lg">🔒</span>
            <span>
              Your data is encrypted and never shared. Cancel anytime.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
