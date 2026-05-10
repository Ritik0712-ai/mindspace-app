"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] mb-4">
            <HiChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-outfit)]">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 prose prose-lg">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using MindSpace, you agree to these terms. If you don't agree, please don't use our platform.
        </p>

        <h2>2. Service Description</h2>
        <p>
          MindSpace is a peer support platform that provides:
        </p>
        <ul>
          <li>Anonymous journaling with AI-powered responses</li>
          <li>Anonymous peer support communities (circles)</li>
          <li>1-on-1 anonymous chat with peers</li>
          <li>Self-help resources and tools</li>
          <li>Mood tracking and analytics</li>
        </ul>

        <h2>3. Anonymity</h2>
        <p>
          We strongly encourage anonymity. You should not share your real name, phone number, 
          address, or any identifying information. If you do, you do so at your own risk.
        </p>

        <h2>4. Community Guidelines</h2>
        <p>When using our community features, you agree to:</p>
        <ul>
          <li>Treat others with respect and kindness</li>
          <li>Not share personal identifying information</li>
          <li>Not promote self-harm, suicide, or violence</li>
          <li>Not give medical or therapy advice</li>
          <li>Not spam or solicit other users</li>
          <li>Report harmful content rather than engage</li>
        </ul>

        <h2>5. Crisis Situations</h2>
        <p>
          If you're in crisis, MindSpace is not a substitute for professional help. 
          Please contact emergency services or crisis helplines listed in the app.
        </p>

        <h2>6. Account Termination</h2>
        <p>
          We reserve the right to terminate accounts that violate these terms or 
          engage in harmful behavior. Users can delete their accounts anytime.
        </p>

        <h2>7. Disclaimer</h2>
        <p>
          MindSpace is provided "as is." We don't guarantee the accuracy of AI responses 
          or that the platform will be error-free. We're not liable for any damages from using the platform.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We may update these terms. Continued use of the platform after changes 
          means you accept the new terms.
        </p>

        <h2>9. Contact</h2>
        <p>Questions? Email us at legal@mindspace.in</p>
      </div>
    </div>
  );
}
