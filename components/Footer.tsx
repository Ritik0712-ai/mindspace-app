"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
  resources: [
    { name: "Crisis Helplines", href: "/resources#crisis" },
    { name: "Self-Help Library", href: "/resources" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:hello@mindspace.in" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--surface-hover)]" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="MindSpace Home">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-xl" role="img" aria-label="Brain">🧠</span>
              </div>
              <span className="text-2xl font-bold text-[var(--primary)] font-[family-name:var(--font-outfit)]">
                MindSpace
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] mb-6 max-w-sm leading-relaxed">
              Your safe space for mental wellness. Anonymous. Accessible. Always here for you.
            </p>

            {/* Crisis Banner */}
            <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl p-4">
              <p className="text-sm font-medium text-[#DC2626] mb-2">Need help now?</p>
              <p className="text-sm text-[var(--text-secondary)]">
                AASRA: <a href="tel:9152987821" className="text-[var(--primary)] font-medium" aria-label="Call AASRA helpline">9152987821</a>
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[var(--surface-hover)]">
          <div className="bg-[var(--background)] rounded-2xl p-6 mb-8">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Important Disclaimer:</strong>{" "}
              MindSpace is a peer support platform, not a substitute for professional mental health care. 
              We do not provide therapy, diagnosis, or medical advice. If you are experiencing a mental health crisis, 
              please contact a mental health professional or call a crisis helpline.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} MindSpace. All rights reserved.
            </p>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
              Made with <span className="text-[#DC2626]">❤️</span> for India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
