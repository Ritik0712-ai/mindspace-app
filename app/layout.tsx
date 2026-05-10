import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "./providers";
import "./globals.css";

// Load Google Fonts
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindSpace | Your Safe Space for Mental Wellness",
  description:
    "A private, anonymous platform to journal your thoughts, connect with people who understand, and find your calm. Built for Indians who need support but can't afford expensive therapy.",
  keywords: [
    "mental health",
    "anonymous journaling",
    "peer support",
    "anxiety help",
    "depression support",
    "India mental health",
    "therapy alternative",
  ],
  authors: [{ name: "MindSpace" }],
  openGraph: {
    title: "MindSpace | Your Safe Space",
    description:
      "Journal your thoughts. Connect anonymously. Find your calm. Free and always here for you.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindSpace | Your Safe Space",
    description: "Journal. Connect. Heal. 100% anonymous mental health support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Session Provider for NextAuth */}
        <SessionProvider>
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--surface)",
                color: "var(--text-primary)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                padding: "16px",
                fontFamily: "var(--font-inter)",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "white",
                },
              },
            }}
          />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
