"use client";
import Link from 'next/link';

export default function MobileBottomBar({ onOpenAuth }) {
  return (
    <div className="fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto">
      <div className="bg-[#101010]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center gap-2">
        {/* Workspace dashboard shortcut */}
        <Link
          href="/dashboard"
          className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
        >
          <i className="ph-bold ph-squares-four text-xs text-[#FF005C]"></i>
          <span>Workspace</span>
        </Link>

        {/* Deploy Agent Primary CTA */}
        <button
          type="button"
          onClick={() => onOpenAuth && onOpenAuth('signup')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#FF005C] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
        >
          <span>Deploy AI Employee</span>
          <i className="ph-bold ph-sparkle text-xs"></i>
        </button>
      </div>
    </div>
  );
}
