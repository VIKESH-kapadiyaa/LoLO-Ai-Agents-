"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const TOP_TOOLS = [
  { id: 'slack', name: 'Slack', category: 'Chat', icon: 'ph-chat-circle-dots', desc: 'Real-time alert dispatch' },
  { id: 'notion', name: 'Notion', category: 'Docs', icon: 'ph-note-pencil', desc: 'Sync knowledge bases' },
  { id: 'github', name: 'GitHub', category: 'Dev', icon: 'ph-git-branch', desc: 'Automated PR triage' },
  { id: 'stripe', name: 'Stripe', category: 'Finance', icon: 'ph-credit-card', desc: 'Invoice & webhook routing' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', icon: 'ph-users', desc: 'Lead qualification sync' },
  { id: 'linear', name: 'Linear', category: 'Dev', icon: 'ph-check-square-offset', desc: 'Issue creation & tracking' },
  { id: 'openai', name: 'OpenAI', category: 'AI', icon: 'ph-sparkle', desc: 'LLM reasoning pipelines' },
  { id: 'intercom', name: 'Intercom', category: 'Support', icon: 'ph-headset', desc: 'Automated ticket replies' }
];

const CATEGORIES = ['All', 'Dev', 'Chat', 'CRM', 'Finance', 'AI'];

export default function MobileIntegrations({ onOpenAuth }) {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [connectedTools, setConnectedTools] = useState({ slack: true, stripe: true });

  const filtered = TOP_TOOLS.filter((t) => {
    const matchesCat = activeCat === 'All' || t.category === activeCat;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleTool = (id) => {
    setConnectedTools((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="mobile-integrations" className="px-4 py-8 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Ecosystem
            </span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-white">
            130+ Market Integrations
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1">
            Native integrations across developer, communication, and CRM platforms.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations (e.g. Stripe, GitHub)..."
            className="w-full bg-[#141414] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF005C]"
          />
          <i className="ph ph-magnifying-glass absolute right-3.5 top-3 text-gray-500 text-xs"></i>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                activeCat === cat
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {filtered.map((tool) => {
            const isConn = connectedTools[tool.id];
            return (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className="bg-[#141414] border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <i className={`ph-bold ${tool.icon} text-sm text-[#FF005C]`}></i>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        isConn
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                          : 'bg-white/5 text-gray-500'
                      }`}
                    >
                      {isConn ? 'Connected' : 'Ready'}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-[#FF005C] transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                    {tool.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <button
          type="button"
          onClick={() => onOpenAuth && onOpenAuth('signup')}
          className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Explore All 130+ Tools in Workspace</span>
          <i className="ph-bold ph-arrow-right text-xs"></i>
        </button>
      </div>
    </section>
  );
}
