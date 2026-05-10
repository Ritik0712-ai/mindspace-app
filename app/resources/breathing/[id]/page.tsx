"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import { BREATHING_EXERCISES } from "@/lib/resources";

const PHASE_COLORS = {
  Inhale: "#10B981",
  Hold: "#F59E0B",
  Exhale: "#6366F1",
};

export default function BreathingExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [exerciseId, setExerciseId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    params.then((p) => setExerciseId(p.id));
  }, [params]);

  const exercise = exerciseId
    ? BREATHING_EXERCISES.find((e) => e.id === exerciseId)
    : null;

  const runCycle = useCallback(() => {
    if (!exercise) return;

    let totalPhases = exercise.steps.length;
    let phaseIndex = 0;
    let duration = exercise.steps[0].duration;

    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          phaseIndex++;
          if (phaseIndex >= totalPhases) {
            phaseIndex = 0;
            setCycleCount((c) => c + 1);
          }
          setCurrentPhase(phaseIndex);
          return exercise.steps[phaseIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [exercise]);

  useEffect(() => {
    if (!isActive || !exercise) return;

    const cleanup = runCycle();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isActive, runCycle, exercise]);

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase(0);
    setCycleCount(0);
    if (exercise) {
      setTimeLeft(exercise.steps[0].duration);
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeLeft(0);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Exercise not found</p>
      </div>
    );
  }

  const phase = exercise.steps[currentPhase];
  const phaseColor = PHASE_COLORS[phase.phase as keyof typeof PHASE_COLORS] || "#7C6FF7";
  const scale = phase.phase === "Inhale" ? 1.5 : phase.phase === "Exhale" ? 0.7 : 1;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/resources"
              className="text-[var(--text-muted)] hover:text-[var(--primary)]"
            >
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
                {exercise.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {exercise.pattern}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 text-center" id="main-content">
        {/* Instructions */}
        <div className="mb-8">
          <p className="text-[var(--text-secondary)] mb-2">{exercise.description}</p>
          <p className="text-sm text-[var(--text-muted)]">
            Cycles completed: {cycleCount}
          </p>
        </div>

        {/* Breathing Circle Animation */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="breathing"
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${phaseColor}20`, border: `4px solid ${phaseColor}` }}
                initial={{ scale: 0.7 }}
                animate={{ scale }}
                exit={{ scale: 0.7 }}
                transition={{ duration: phase.duration, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <motion.p
                    key={phase.phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-2"
                    style={{ color: phaseColor }}
                  >
                    {phase.phase}
                  </motion.p>
                  <p className="text-5xl font-bold text-[var(--text-primary)]">
                    {timeLeft}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full rounded-full bg-[var(--primary)]/10 flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-4xl mb-2">🌬️</p>
                  <p className="text-[var(--text-secondary)]">Ready</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase Indicators */}
        <div className="flex justify-center gap-4 mb-12">
          {exercise.steps.map((step, index) => (
            <div
              key={step.phase}
              className={`flex flex-col items-center px-4 py-2 rounded-xl ${
                isActive && currentPhase === index
                  ? "bg-[var(--primary)]/10"
                  : ""
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isActive && currentPhase === index
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {step.phase}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {step.duration}s
              </span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="btn btn-primary px-8 py-4 text-lg"
            >
              Start Exercise
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="btn btn-outline px-8 py-4 text-lg"
            >
              Stop
            </button>
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 bg-[var(--surface)] rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-[var(--text-primary)] mb-3">
            💡 Tips for this exercise:
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>• Sit comfortably with your back straight</li>
            <li>• Breathe through your nose if possible</li>
            <li>• If you feel dizzy, stop and breathe normally</li>
            <li>• Try to do at least 3-4 cycles for best effect</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
