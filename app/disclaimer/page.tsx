"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] mb-4">
            <HiChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
            Mental Health Disclaimer
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Please read carefully</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#DC2626] mb-4">
            ⚠️ Important Notice
          </h2>
          <p className="text-[var(--text-primary)] font-medium">
            MindSpace is <strong>NOT</strong> a substitute for professional mental health care.
          </p>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            What We Are
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• A peer support platform - connecting you with others who understand</li>
            <li>• An AI journaling companion - to help you reflect</li>
            <li>• A self-help resource library - with tools and exercises</li>
            <li>• A safe space to express yourself anonymously</li>
          </ul>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            What We Are NOT
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• A licensed therapy or counseling service</li>
            <li>• A replacement for professional mental health treatment</li>
            <li>• Able to diagnose mental health conditions</li>
            <li>• Qualified to prescribe medication or treatment plans</li>
            <li>• A crisis intervention service (though we provide helpline numbers)</li>
          </ul>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--surface-hover)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            When to Seek Professional Help
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Please consider reaching out to a mental health professional if:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• Your symptoms are severe or persistent</li>
            <li>• You're having thoughts of self-harm or suicide</li>
            <li>• Your daily functioning is significantly impaired</li>
            <li>• You're experiencing a mental health crisis</li>
            <li>• You need a proper diagnosis or treatment plan</li>
          </ul>
        </div>

        <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#DC2626] mb-4">
            Crisis Resources
          </h2>
          <p className="text-[var(--text-primary)] mb-4">
            If you're in crisis, please contact these helplines immediately:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">AASRA Helpline:</span>
              <a href="tel:9152987821" className="text-[var(--primary)] font-bold">9152987821</a>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Vandrevala Foundation:</span>
              <a href="tel:18602662345" className="text-[var(--primary)] font-bold">1860-2662-345</a>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">iCall (TISS):</span>
              <a href="tel:9152987821" className="text-[var(--primary)] font-bold">9152987821</a>
            </div>
          </div>
        </div>

        <p className="text-center text-[var(--text-muted)] text-sm">
          By using MindSpace, you acknowledge that you have read and understood this disclaimer.
        </p>
      </div>
    </div>
  );
}
