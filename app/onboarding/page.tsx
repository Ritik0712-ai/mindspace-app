"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { HiRefresh, HiCheck, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { generatePseudonym, type Pseudonym } from "@/lib/pseudonyms";

const concerns = [
  { id: "anxiety", emoji: "😰", label: "Anxiety & Overthinking" },
  { id: "depression", emoji: "😔", label: "Feeling Low / Depression" },
  { id: "stress", emoji: "💼", label: "Work or Study Stress" },
  { id: "relationships", emoji: "💔", label: "Relationship Struggles" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Family Pressure" },
  { id: "loneliness", emoji: "😶", label: "Loneliness" },
  { id: "identity", emoji: "🏳️‍🌈", label: "Identity & Acceptance" },
  { id: "exploring", emoji: "🤷", label: "Just Exploring" },
];

const steps = [
  { id: 1, name: "Welcome" },
  { id: 2, name: "Your Journey" },
  { id: 3, name: "Preferences" },
  { id: 4, name: "Guidelines" },
];

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pseudonym, setPseudonym] = useState<Pseudonym | null>(null);

  // Form state
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [language, setLanguage] = useState("en");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [reminderTime, setReminderTime] = useState("morning");
  const [crisisContact, setCrisisContact] = useState("");
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);

  // Initialize pseudonym from session
  useEffect(() => {
    if (session?.user) {
      setPseudonym({
        pseudonym: session.user.pseudonym,
        emoji: session.user.avatarEmoji,
        color: session.user.avatarColor,
        colorName: "",
        animalName: "",
      });
    }
  }, [session]);

  const handleRegeneratePseudonym = () => {
    setPseudonym(generatePseudonym());
  };

  const toggleConcern = (concernId: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concernId)
        ? prev.filter((c) => c !== concernId)
        : [...prev, concernId]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!agreedToGuidelines) {
      toast.error("Please agree to the community guidelines to continue");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryConcern: selectedConcerns,
          language,
          notificationsOn,
          reminderTime: notificationsOn ? reminderTime : null,
          crisisContact: crisisContact || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      // Update session with onboarding complete status
      await update({ onboardingComplete: true });

      toast.success("You're all set! 💙");
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <span className="text-xl">🧠</span>
            </div>
            <span className="text-xl font-bold text-[var(--primary)] font-[family-name:var(--font-outfit)]">
              MindSpace
            </span>
          </Link>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep >= step.id
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                  }`}
                >
                  {currentStep > step.id ? (
                    <HiCheck className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-1 transition-all ${
                      currentStep > step.id
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--surface-hover)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
            {currentStep === 1 && "Welcome to your safe space 👋"}
            {currentStep === 2 && "What brings you here?"}
            {currentStep === 3 && "Set up your preferences"}
            {currentStep === 4 && "One quick thing"}
          </h1>
        </div>

        {/* Step Content */}
        <div className="bg-[var(--surface)] rounded-3xl p-8 shadow-xl border border-[var(--surface-hover)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    MindSpace is <strong>100% anonymous</strong>. No one knows who
                    you are. You can be completely honest here.
                  </p>
                </div>

                {/* Pseudonym Card */}
                <div className="bg-[var(--primary-light)]/10 rounded-2xl p-6 border border-[var(--primary-light)]/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      You are:
                    </span>
                    <button
                      onClick={handleRegeneratePseudonym}
                      className="flex items-center gap-1 text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
                    >
                      <HiRefresh className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                  {pseudonym && (
                    <div className="flex items-center justify-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
                        style={{ backgroundColor: `${pseudonym.color}20` }}
                      >
                        {pseudonym.emoji}
                      </div>
                      <span className="text-2xl font-bold text-[var(--text-primary)]">
                        {pseudonym.pseudonym}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm text-[var(--text-muted)]">
                    This is how others will see you in the community.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Concerns */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-[var(--text-secondary)]">
                    No wrong answers. This helps us personalize your experience.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {concerns.map((concern) => (
                    <button
                      key={concern.id}
                      onClick={() => toggleConcern(concern.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedConcerns.includes(concern.id)
                          ? "border-[var(--primary)] bg-[var(--primary-light)]/10"
                          : "border-[var(--surface-hover)] hover:border-[var(--primary-light)]"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{concern.emoji}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {concern.label}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-center text-sm text-[var(--text-muted)]">
                  Select all that apply, or skip this step
                </p>
              </motion.div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Preferred language
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: "en", emoji: "🇬🇧", label: "English" },
                      { id: "hi", emoji: "🇮🇳", label: "Hindi" },
                      { id: "both", emoji: "🌐", label: "Both" },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setLanguage(lang.id)}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          language === lang.id
                            ? "border-[var(--primary)] bg-[var(--primary-light)]/10"
                            : "border-[var(--surface-hover)]"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{lang.emoji}</span>
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {lang.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-[var(--text-primary)]">
                      Daily check-in reminder
                    </label>
                    <button
                      onClick={() => setNotificationsOn(!notificationsOn)}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        notificationsOn
                          ? "bg-[var(--primary)]"
                          : "bg-[var(--surface-hover)]"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          notificationsOn ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {notificationsOn && (
                    <div className="mt-3">
                      <select
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--surface-hover)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      >
                        <option value="morning">🌅 Morning (8:00 AM)</option>
                        <option value="evening">🌆 Evening (6:00 PM)</option>
                        <option value="night">🌙 Night (9:00 PM)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Crisis Contact */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Crisis contact{" "}
                    <span className="text-[var(--text-muted)]">(optional)</span>
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mb-3">
                    If we detect you're in crisis, can we notify someone you trust?
                    This is optional and completely private.
                  </p>
                  <input
                    type="tel"
                    value={crisisContact}
                    onChange={(e) => setCrisisContact(e.target.value)}
                    placeholder="Phone number (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--surface-hover)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Guidelines */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-[var(--text-secondary)]">
                    Before you dive in, please read our community guidelines:
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      emoji: "💙",
                      title: "Listen without judgment",
                      desc: "Be kind and supportive to everyone here.",
                    },
                    {
                      emoji: "🔒",
                      title: "Respect everyone's privacy",
                      desc: "What happens on MindSpace, stays on MindSpace.",
                    },
                    {
                      emoji: "🚨",
                      title: "No medical advice",
                      desc: "We're here to support, not to diagnose or prescribe.",
                    },
                  ].map((guideline, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-xl"
                    >
                      <span className="text-2xl">{guideline.emoji}</span>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">
                          {guideline.title}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {guideline.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-3 p-4 bg-[var(--primary-light)]/10 rounded-xl cursor-pointer border border-[var(--primary-light)]/20">
                  <input
                    type="checkbox"
                    checked={agreedToGuidelines}
                    onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-[var(--surface-hover)] text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--text-primary)]">
                    I understand and agree to be kind, respectful, and supportive to
                    everyone in this community.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="btn btn-ghost"
              >
                <HiChevronLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button onClick={handleNext} className="btn btn-primary">
                Continue
                <HiChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isLoading || !agreedToGuidelines}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Setting up...
                  </span>
                ) : (
                  <>
                    Enter My Safe Space
                    <span className="ml-1">→</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
