"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiChevronLeft, HiPaperAirplane } from "react-icons/hi";

const CONCERNS = [
  { id: "anxiety", emoji: "😰", label: "Anxiety" },
  { id: "depression", emoji: "😔", label: "Depression" },
  { id: "relationships", emoji: "💔", label: "Relationships" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Family" },
  { id: "work", emoji: "💼", label: "Work Stress" },
  { id: "loneliness", emoji: "😔", label: "Loneliness" },
];

const MESSAGES = [
  { id: 1, text: "Hey, I saw your post about feeling overwhelmed with college applications. I totally understand.", isMe: false, sender: "Green Fox", senderColor: "#34D399" },
  { id: 2, text: "Thanks for reaching out. It feels like everyone's ahead of me.", isMe: true },
  { id: 3, text: "I felt the same last year. What helped me was taking it one step at a time. You don't have to have everything figured out right now.", isMe: false, sender: "Green Fox", senderColor: "#34D399" },
  { id: 4, text: "That's actually really helpful. My parents keep saying 'log kya kahenge' and it's so exhausting.", isMe: true },
  { id: 5, text: "Ugh, I get that so much. Just know that your path is your own. Therapy helped me set boundaries with that. 💙", isMe: false, sender: "Green Fox", senderColor: "#34D399" },
];

export default function ChatPage() {
  const [step, setStep] = useState<"concern" | "matching" | "chat">("concern");
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [chatPartner] = useState({
    name: "Green Fox",
    color: "#34D399",
    emoji: "🦊",
  });

  const handleStartChat = () => {
    if (!selectedConcern) return;
    setStep("matching");
    
    // Simulate matching delay
    setTimeout(() => {
      setStep("chat");
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      { id: Date.now(), text: message, isMe: true },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">
              {step === "chat" ? (
                <span className="flex items-center gap-2">
                  <span>{chatPartner.emoji}</span>
                  Chatting with {chatPartner.name}
                </span>
              ) : (
                "Connect with someone"
              )}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Concern Selection */}
        {step === "concern" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <p className="text-4xl mb-4">💙</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Connect with someone who understands
              </h2>
              <p className="text-[var(--text-secondary)]">
                What would you like to talk about?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {CONCERNS.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedConcern === concern.id
                      ? "border-[var(--primary)] bg-[var(--primary)]/10"
                      : "border-[var(--surface-hover)] hover:border-[var(--primary)]/50"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{concern.emoji}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {concern.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleStartChat}
              disabled={!selectedConcern}
              className="w-full btn btn-primary py-4 disabled:opacity-50"
            >
              Find someone to talk to
            </button>

            <p className="text-center text-xs text-[var(--text-muted)] mt-4">
              🔒 This chat is 100% anonymous
            </p>
          </motion.div>
        )}

        {/* Matching */}
        {step === "matching" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="animate-pulse">
              <p className="text-5xl mb-6">🔍</p>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Finding someone who understands...
            </h2>
            <p className="text-[var(--text-secondary)]">
              Connecting you with a peer...
            </p>
          </motion.div>
        )}

        {/* Chat */}
        {step === "chat" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-[calc(100vh-200px)]"
          >
            {/* Privacy Badge */}
            <div className="bg-[var(--primary)]/10 rounded-xl p-3 text-center mb-4">
              <p className="text-sm text-[var(--text-primary)]">
                🔒 You're anonymous. {chatPartner.name} doesn't know who you are.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.isMe
                        ? "bg-[var(--primary)] text-white rounded-br-md"
                        : "bg-[var(--surface)] text-[var(--text-primary)] rounded-bl-md border border-[var(--surface-hover)]"
                    }`}
                  >
                    {!msg.isMe && msg.sender && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {msg.sender}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-[var(--surface)] rounded-xl border border-[var(--surface-hover)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                onClick={handleSendMessage}
                className="btn btn-primary px-4"
              >
                <HiPaperAirplane className="w-5 h-5" />
              </button>
            </div>

            {/* End Chat */}
            <Link
              href="/dashboard"
              className="mt-4 text-center text-sm text-[var(--danger)] hover:underline"
            >
              End Chat
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
