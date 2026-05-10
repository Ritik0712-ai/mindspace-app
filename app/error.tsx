"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">😔</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
          Something went wrong
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Something broke on our end. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary)]/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[var(--surface-hover)] text-[var(--text-primary)] rounded-xl font-semibold hover:bg-[var(--surface-hover)] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
