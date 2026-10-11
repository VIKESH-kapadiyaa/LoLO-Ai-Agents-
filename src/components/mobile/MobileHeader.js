"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileHeader({ onOpenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Workspaces', href: '#mobile-workspaces' },
    { label: 'Architecture', href: '#mobile-architecture' },
    { label: 'Integrations', href: '#mobile-integrations' },
    { label: 'Pricing', href: '#mobile-pricing' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky Mobile Header */}
      <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-[#FF005C] shadow-[0_0_8px_#FF005C] animate-pulse"></div>
          <span className="font-bold text-lg tracking-tight text-white">
            LoLo<span className="text-[#FF005C] font-mono text-sm font-normal">.AI</span>
          </span>
        </Link>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Live Agent Count Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>3.4k Live</span>
          </div>

          {/* Quick Sign In */}
          <button
            onClick={() => onOpenAuth && onOpenAuth('signin')}
            className="text-xs font-medium text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/10 transition-all cursor-pointer"
          >
            Sign In
          </button>

          {/* Hamburger Drawer Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <i className={`ph-bold ${menuOpen ? 'ph-x' : 'ph-list'} text-base`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[53px] inset-x-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 p-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between text-left text-sm font-medium text-gray-300 hover:text-white py-2 border-b border-white/5 cursor-pointer"
                >
                  <span>{link.label}</span>
                  <i className="ph-bold ph-caret-right text-xs text-gray-500"></i>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('signup');
                }}
                className="w-full py-3 rounded-xl bg-[#FF005C] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,92,0.3)] cursor-pointer"
              >
                <span>Deploy First AI Employee</span>
                <i className="ph-bold ph-sparkle text-sm"></i>
              </button>

              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium text-center transition-colors"
              >
                Open Workspace Dashboard →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
