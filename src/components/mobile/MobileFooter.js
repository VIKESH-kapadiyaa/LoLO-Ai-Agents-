"use client";

export default function MobileFooter({ onOpenAuth }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-4 pt-8 pb-24 bg-[#050505] border-t border-white/5 text-center">
      <div className="max-w-md mx-auto">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#FF005C]" />
          <span className="font-bold text-base text-white tracking-tight">
            LoLo<span className="text-[#FF005C] font-mono text-xs font-normal">.AI</span>
          </span>
        </div>

        <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-4 max-w-xs mx-auto">
          Autonomous workforce intelligence engine. Deploy, orchestrate, and supervise digital workers with enterprise security.
        </p>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 mb-5 text-gray-400">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter" className="hover:text-white transition-colors">
            <i className="ph-bold ph-twitter-logo text-base"></i>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Discord" className="hover:text-white transition-colors">
            <i className="ph-bold ph-discord-logo text-base"></i>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub" className="hover:text-white transition-colors">
            <i className="ph-bold ph-github-logo text-base"></i>
          </a>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono mb-4">
          <button onClick={() => onOpenAuth && onOpenAuth('signin')} className="hover:text-white transition-colors cursor-pointer">
            Sign In
          </button>
          <span>•</span>
          <button onClick={() => onOpenAuth && onOpenAuth('signup')} className="hover:text-white transition-colors cursor-pointer">
            Create Account
          </button>
          <span>•</span>
          <button onClick={scrollToTop} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <span>Top</span>
            <i className="ph-bold ph-arrow-up text-[9px]"></i>
          </button>
        </div>

        <div className="text-[10px] text-gray-600 font-mono">
          © 2026 LoLo AI Labs, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
