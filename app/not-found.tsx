import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🧠</div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-outfit)]">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Oops! This page went offline.
        </p>
        <p className="text-[var(--text-muted)] mb-8">
          But you don't have to. 💙
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary)]/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
