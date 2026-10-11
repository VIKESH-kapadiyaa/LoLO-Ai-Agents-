"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MobilePricing({ onOpenAuth }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Initiate',
      price: '$0',
      period: 'forever',
      desc: 'Formulate and deploy simple personal agent workflows.',
      features: ['2 Active AI Employees', '500 executions/month', 'Standard edge routing', 'Community support'],
      popular: false,
      cta: 'Start Free'
    },
    {
      name: 'Synergy',
      price: isAnnual ? '$144' : '$180',
      period: '/month',
      desc: 'Full autonomous ecosystem for scaling operations.',
      features: ['Unlimited AI Employees', '50k executions/month', 'Dedicated edge sandboxes', 'OAuth multi-tenancy', 'Priority 24/7 SLA'],
      popular: true,
      cta: 'Deploy Synergy'
    },
    {
      name: 'Dominion',
      price: isAnnual ? '$360' : '$450',
      period: '/month',
      desc: 'Bespoke infrastructure with custom model isolation.',
      features: ['Custom on-prem LLMs', 'Unlimited executions', 'SOC2 type II compliance', 'Dedicated account architect'],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="mobile-pricing" className="px-4 py-8 bg-black border-t border-white/5">
      <div className="max-w-md mx-auto">
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF005C]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Pricing Plans
            </span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-white">
            Transparent Scaling
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1">
            Start free, scale into enterprise autonomous clusters.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-white/10 rounded-full p-1 mt-3">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                !isAnnual ? 'bg-white text-black' : 'text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#FF005C] text-white' : 'text-gray-400'
              }`}
            >
              <span>Annual</span>
              <span className="text-[9px] bg-black/40 px-1.5 py-0.2 rounded font-mono font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Stack */}
        <div className="space-y-3.5 mt-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-4 transition-all relative overflow-hidden ${
                tier.popular
                  ? 'bg-[#141414] border-2 border-[#FF005C] shadow-[0_0_30px_rgba(255,0,92,0.15)]'
                  : 'bg-[#101010] border border-white/10'
              }`}
            >
              {tier.popular && (
                <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-wider bg-[#FF005C] text-white font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}

              <div className="mb-2">
                <h3 className="text-sm font-semibold text-white">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-2xl font-normal text-white">
                    {tier.price}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {tier.period}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-light">
                  {tier.desc}
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-1.5 py-3 border-t border-white/5">
                {tier.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                    <i className="ph-bold ph-check text-xs text-[#FF005C] shrink-0"></i>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth('signup')}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all mt-1 cursor-pointer flex items-center justify-center gap-1.5 ${
                  tier.popular
                    ? 'bg-[#FF005C] text-white hover:bg-[#ff1a6c] shadow-[0_0_15px_rgba(255,0,92,0.3)]'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                <span>{tier.cta}</span>
                <i className="ph-bold ph-arrow-right text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
