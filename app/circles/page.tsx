"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiUsers, HiChatAlt2, HiSearch } from "react-icons/hi";
import { CIRCLES, type Circle } from "@/lib/circles";

export default function CirclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedCircles, setJoinedCircles] = useState<string[]>([]);

  const filteredCircles = CIRCLES.filter(
    (circle) =>
      circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinCircle = (circleId: string) => {
    if (joinedCircles.includes(circleId)) {
      setJoinedCircles(joinedCircles.filter((id) => id !== circleId));
    } else {
      setJoinedCircles([...joinedCircles, circleId]);
    }
  };

  const myCircles = CIRCLES.filter((c) => joinedCircles.includes(c.id));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
                Find your people 💙
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Anonymous spaces where people who understand are waiting.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--background)] rounded-xl border border-[var(--surface-hover)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* My Circles */}
        {myCircles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Your Circles
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {myCircles.map((circle) => (
                <Link
                  key={circle.id}
                  href={`/circles/${circle.id}`}
                  className="flex-shrink-0 bg-[var(--surface)] rounded-xl p-4 border border-[var(--surface-hover)] hover:shadow-lg transition-all w-48"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                    style={{ backgroundColor: `${circle.color}20` }}
                  >
                    {circle.emoji}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {circle.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {circle.postCount} new posts
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Circles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Explore Circles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCircles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/circles/${circle.id}`}
                  className="block bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)] hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${circle.color}20` }}
                    >
                      {circle.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          {circle.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleJoinCircle(circle.id);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            joinedCircles.includes(circle.id)
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--background)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
                          }`}
                        >
                          {joinedCircles.includes(circle.id) ? "Joined" : "Join"}
                        </button>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                        {circle.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <HiUsers className="w-4 h-4" />
                          {circle.memberCount.toLocaleString()} members
                        </span>
                        <span className="flex items-center gap-1">
                          <HiChatAlt2 className="w-4 h-4" />
                          {circle.postCount} posts today
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Anonymity Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-[var(--primary)]/5 rounded-2xl p-6 border border-[var(--primary)]/20 text-center"
        >
          <p className="text-[var(--text-primary)]">
            🔒 <strong>Your privacy matters.</strong> Everyone here is anonymous. Share freely — no judgment, ever.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
