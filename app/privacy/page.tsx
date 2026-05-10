"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] mb-4">
            <HiChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 prose prose-lg">
        <h2>1. Information We Collect</h2>
        <p>
          At MindSpace, we believe in minimal data collection. Here's what we collect:
        </p>
        <ul>
          <li><strong>Email address</strong> - For account creation and login</li>
          <li><strong>Journal entries</strong> - Your private thoughts and reflections</li>
          <li><strong>Mood data</strong> - For tracking your emotional patterns</li>
          <li><strong>Anonymous profile</strong> - Your chosen pseudonym (never your real name)</li>
        </ul>

        <h2>2. How We Protect Your Data</h2>
        <ul>
          <li>All journal entries are encrypted at rest</li>
          <li>We never sell your data to third parties</li>
          <li>Your real identity is never required or stored</li>
          <li>Crisis contact information is encrypted</li>
        </ul>

        <h2>3. What We DON'T Collect</h2>
        <ul>
          <li>Real names or surnames</li>
          <li>Phone numbers (unless you voluntarily add crisis contact)</li>
          <li>Location data</li>
          <li>IP addresses are not logged</li>
        </ul>

        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Download all your data at any time</li>
          <li>Permanently delete your account and all data</li>
          <li>Opt out of notifications anytime</li>
          <li>Remain completely anonymous</li>
        </ul>

        <h2>5. Crisis Protocol</h2>
        <p>
          If our AI detects you're in crisis, we may display crisis helpline numbers.
          We will never share your journal content with anyone without your explicit consent.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          For privacy concerns, email us at privacy@mindspace.in
        </p>

        <div className="mt-8 p-4 bg-[var(--background)] rounded-xl">
          <p className="text-sm text-[var(--text-muted)]">
            <strong>Note:</strong> This is a simplified version for understanding. 
            The full legal document will be provided before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
