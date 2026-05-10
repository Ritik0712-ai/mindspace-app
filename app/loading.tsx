"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-6xl mb-6"
        >
          🧠
        </motion.div>
        <p className="text-xl text-[var(--text-secondary)] font-medium">
          Creating your safe space...
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          Almost there 💙
        </p>
      </div>
    </div>
  );
}
