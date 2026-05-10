"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiPlay, HiClock, HiBookOpen } from "react-icons/hi";
import { MEDITATIONS, COURSES, BREATHING_EXERCISES, CRISIS_RESOURCES, WORKSHEETS } from "@/lib/resources";

type TabType = "meditations" | "courses" | "breathing" | "worksheets" | "crisis";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("meditations");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  const tabs = [
    { id: "meditations" as const, label: "Meditations", emoji: "🧘" },
    { id: "courses" as const, label: "Courses", emoji: "📚" },
    { id: "breathing" as const, label: "Breathing", emoji: "🌬️" },
    { id: "worksheets" as const, label: "Worksheets", emoji: "📝" },
    { id: "crisis" as const, label: "Crisis Help", emoji: "🆘" },
  ];

  const openVideo = (youtubeId: string, title: string) => {
    setPlayingVideo(youtubeId);
    setVideoTitle(title);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
    setVideoTitle("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
              Self-Help Library 💙
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--background)] text-[var(--text-secondary)]"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Meditations */}
        {activeTab === "meditations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Guided Meditations
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Click play to start a guided meditation. Find a quiet space and let yourself relax.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MEDITATIONS.map((meditation) => (
                <div
                  key={meditation.id}
                  className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)] hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => openVideo(meditation.youtubeId, meditation.title)}
                      className="w-16 h-16 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl hover:bg-[var(--primary)]/20 transition-colors flex-shrink-0 relative group"
                      aria-label={`Play ${meditation.title}`}
                    >
                      <HiPlay className="w-8 h-8 text-[var(--primary)]" />
                      <span className="absolute inset-0 rounded-xl border-2 border-[var(--primary)]/30 scale-110 group-hover:scale-125 transition-transform" />
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {meditation.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {meditation.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <HiClock className="w-3 h-3" />
                        {meditation.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Courses */}
        {activeTab === "courses" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Mini Courses
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Self-paced courses to help you understand and manage your mental health.
            </p>
            <div className="space-y-4">
              {COURSES.map((course) => (
                <Link
                  key={course.id}
                  href={`/resources/course/${course.id}`}
                  className="block bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {course.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          {course.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--background)] text-[var(--text-muted)]">
                          {course.level}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {course.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--primary)]">
                        <HiBookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Breathing Exercises */}
        {activeTab === "breathing" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Breathing Exercises
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Simple breathing techniques you can do anywhere to calm your mind.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BREATHING_EXERCISES.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/resources/breathing/${exercise.id}`}
                  className="block bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)] hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {exercise.title}
                  </h3>
                  <p className="text-sm text-[var(--primary)] font-medium mb-2">
                    {exercise.pattern}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {exercise.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Worksheets */}
        {activeTab === "worksheets" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Worksheets
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Printable exercises to help you reflect and grow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKSHEETS.map((worksheet) => (
                <div
                  key={worksheet.id}
                  className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {worksheet.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {worksheet.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {worksheet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Crisis Resources */}
        {activeTab === "crisis" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-[#DC2626] mb-2">
                If you need immediate help 💙
              </h2>
              <p className="text-[var(--text-primary)]">
                If you're in crisis or having thoughts of self-harm, please reach out to these helplines immediately. They're free, confidential, and available 24/7.
              </p>
            </div>

            <div className="space-y-4">
              {CRISIS_RESOURCES.map((resource, index) => (
                <div
                  key={index}
                  className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)]"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {resource.description}
                      </p>
                      <span className="text-xs text-[var(--text-muted)]">
                        {resource.available}
                      </span>
                    </div>
                    <a
                      href={`tel:${resource.number.replace(/[^0-9]/g, "")}`}
                      className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary)]/90 transition-colors"
                    >
                      {resource.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[var(--background)] rounded-xl">
              <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                What to do in a crisis:
              </h4>
              <ol className="text-sm text-[var(--text-secondary)] space-y-1 list-decimal list-inside">
                <li>Call one of the helplines above</li>
                <li>Stay with someone you trust</li>
                <li>If in immediate danger, go to nearest hospital</li>
                <li>Remember: You matter. Help is available.</li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* Video Modal */}
        {playingVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--surface)] rounded-2xl p-4 max-w-3xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{videoTitle}</h3>
                  <p className="text-sm text-[var(--text-muted)]">Guided Meditation</p>
                </div>
                <button
                  onClick={closeVideo}
                  className="w-10 h-10 rounded-full bg-[var(--background)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${playingVideo}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={videoTitle}
                />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
                Take deep breaths and let the guided meditation help you relax. 💙
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
