"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="MindSpace Home">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg"
              >
                <span className="text-xl" role="img" aria-label="Brain">🧠</span>
              </motion.div>
              <span className="text-2xl font-bold text-[var(--primary)] font-[family-name:var(--font-outfit)]">
                MindSpace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <ThemeToggle />
              <Link
                href="/signup"
                className="btn btn-primary text-sm px-6 py-2.5"
              >
                Start Free
              </Link>
            </div>

            {/* Right side - Mobile */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              {/* Mobile Menu Button */}
              <button
                className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <HiX className="w-6 h-6 text-[var(--text-primary)]" aria-hidden="true" />
                ) : (
                  <HiMenu className="w-6 h-6 text-[var(--text-primary)]" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 pb-4"
              >
                <div className="flex flex-col gap-4 pt-4 border-t border-[var(--surface-hover)]">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary text-sm w-full mt-2"
                  >
                    Start Free
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
