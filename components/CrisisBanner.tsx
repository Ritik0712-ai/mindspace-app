"use client";

import { motion } from "framer-motion";

export default function CrisisBanner() {
  return (
    <section className="bg-[var(--crisis-bg)] py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💙</span>
            <p className="text-[var(--crisis-red)] font-medium">
              If you're in crisis right now, please reach out:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="tel:9152987821"
              className="flex items-center gap-2 text-[var(--crisis-red)] font-semibold hover:underline"
            >
              <span className="text-lg">📞</span>
              <span>AASRA: 9152987821</span>
              <span className="text-xs text-[var(--text-muted)]">(24/7)</span>
            </a>

            <a
              href="tel:18602662345"
              className="flex items-center gap-2 text-[var(--crisis-red)] font-semibold hover:underline"
            >
              <span className="text-lg">📞</span>
              <span>Vandrevala: 1860-2662-345</span>
              <span className="text-xs text-[var(--text-muted)]">(24/7)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
