"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_PROMPTS = [
  "⚡ Inbound Lead SDR Agent",
  "🤖 24/7 Customer Support Bot",
  "✍️ SEO Keyword & Blog Engine",
  "📊 Stripe Invoice Auditor"
];

export default function MobileHero({ onOpenAuth }) {
  const [prompt, setPrompt] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);

  const handleDeploy = () => {
    const textToUse = prompt.trim() || 'Inbound Lead Qualification & SDR Agent';
    setIsCompiling(true);
    setCompileStep(1);

    setTimeout(() => {
      setCompileStep(2);
    }, 700);

    setTimeout(() => {
      setCompileStep(3);
      setTimeout(() => {
        setIsCompiling(false);
        setCompileStep(0);
        if (onOpenAuth) {
          onOpenAuth('signup');
        }
      }, 700);
    }, 1400);
  };

  return (
    <section className="relative px-4 pt-6 pb-10 overflow-hidden bg-black flex flex-col justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#FF005C]/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-48 right-0 w-[200px] h-[200px] bg-purple-900/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Top Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF005C]/30 bg-[#FF005C]/10 backdrop-blur-md mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF005C] animate-ping" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF005C] font-semibold">
            Autonomous Workforce v2.4
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl font-normal leading-[1.18] tracking-tight text-white mb-3"
        >
          Design autonomous workflows.<br />
          <span className="text-[#FF005C] font-light italic">Engineered by intent.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-gray-400 font-sans font-light leading-relaxed mb-6"
        >
          Translate natural language directly into secure, robust digital workers that execute across your SaaS tools 24/7 without manual supervision.
        </motion.p>

        {/* Interactive Mobile Prompt Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#101010]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl relative"
        >
          <div className="flex items-center gap-2 mb-2 px-1">
            <i className="ph-bold ph-sparkle text-[#FF005C] text-xs"></i>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
              Command Interface
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the workflow you want to automate..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF005C] focus:bg-white/[0.05] transition-all resize-none"
            />
          </div>

          {/* Quick Prompt Chips */}
          <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(chip.replace(/^[^\s]+\s/, ''))}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-300 hover:text-white hover:border-[#FF005C]/40 transition-colors shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Compiling state notification */}
          <AnimatePresence>
            {isCompiling && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 p-2 rounded-lg bg-[#FF005C]/10 border border-[#FF005C]/30 text-[11px] font-mono text-gray-200 flex items-center gap-2"
              >
                <i className="ph-bold ph-spinner animate-spin text-[#FF005C]"></i>
                <span>
                  {compileStep === 1 && 'Parsing natural language intent...'}
                  {compileStep === 2 && 'Mapping SaaS micro-tasks & API schema...'}
                  {compileStep === 3 && 'Initializing autonomous worker sandbox...'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deploy Agent Button */}
          <button
            type="button"
            onClick={handleDeploy}
            disabled={isCompiling}
            className="w-full mt-3 py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-[#FF005C] hover:text-white transition-all flex items-center justify-center gap-2 group active:scale-[0.98] shadow-md cursor-pointer"
          >
            {isCompiling ? (
              <span>Deploying Worker...</span>
            ) : (
              <>
                <span>Deploy Autonomous Agent</span>
                <i className="ph-bold ph-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </>
            )}
          </button>
        </motion.div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
            <span className="text-sm font-semibold text-white block">3,420</span>
            <span className="text-[9px] font-mono uppercase text-gray-500">Live Agents</span>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
            <span className="text-sm font-semibold text-[#FF005C] block">&lt;45ms</span>
            <span className="text-[9px] font-mono uppercase text-gray-500">Edge Latency</span>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
            <span className="text-sm font-semibold text-emerald-400 block">99.99%</span>
            <span className="text-[9px] font-mono uppercase text-gray-500">Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
