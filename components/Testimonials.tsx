"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    avatar: "🐘",
    color: "#60A5FA",
    name: "Blue Elephant",
    city: "Nagpur",
    text: "I finally found a place where I could say I was struggling without anyone judging me. The anonymity makes all the difference. I've been journaling here for 3 months now.",
    rating: 5,
  },
  {
    avatar: "🦊",
    color: "#34D399",
    name: "Green Fox",
    city: "Jaipur",
    text: "The AI journal responses actually made me feel heard. I've never had that before. It's like talking to a friend who really understands without trying to fix everything.",
    rating: 5,
  },
  {
    avatar: "🦌",
    color: "#A78BFA",
    name: "Purple Deer",
    city: "Bhopal",
    text: "I was hesitant to join but the anonymity made it feel safe. Talked to someone in the support circle for the first time in months. It felt so good to not be alone.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg -z-10" />

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
            Community Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
            Real Voices from Our Community
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Hear from people just like you who found their safe space on MindSpace.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--surface-hover)] relative"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-6xl text-[var(--primary-light)]/20 font-serif leading-none">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[var(--secondary)]">
                    ★
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${testimonial.color}20` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {testimonial.city}
                  </p>
                </div>
              </div>

              {/* Decorative gradient line at bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-1 rounded-t-full gradient-primary opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--text-muted)] text-sm">
            Join <span className="font-semibold text-[var(--primary)]">2,500+</span> people
            who found their safe space
          </p>
        </motion.div>
      </div>
    </section>
  );
}
