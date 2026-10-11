"use client";
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Describe Your Intent',
    desc: 'Specify goals and triggers in natural language. The engine understands dependencies, API parameters, and edge scenarios.',
    icon: 'ph-chat-centered-text',
    accent: 'text-[#FF005C]'
  },
  {
    num: '02',
    title: 'Intelligent Assembly',
    desc: 'Proprietary compiler breaks intent into discrete tasks, maps endpoints, and handles OAuth and credentials securely.',
    icon: 'ph-cpu',
    accent: 'text-purple-400'
  },
  {
    num: '03',
    title: 'Autonomous Execution',
    desc: 'Workers execute 24/7 on global edge sandboxes. Auto-retries, self-healing error recovery, and instant audit logging.',
    icon: 'ph-lightning',
    accent: 'text-sky-400'
  },
  {
    num: '04',
    title: 'Continuous Optimization',
    desc: 'Learns from every iteration. Adjusts response paths, avoids rate limits, and increases task execution speed autonomously.',
    icon: 'ph-brain',
    accent: 'text-emerald-400'
  }
];

export default function MobileWorkflowTimeline() {
  return (
    <section id="mobile-architecture" className="px-4 py-8 bg-black border-t border-white/5">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Autonomous Mechanics
            </span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-white">
            How Architecture Operates
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1">
            From intent to production execution in under 60 seconds.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="space-y-3 relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#101010] border border-white/10 rounded-2xl p-4 relative overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <i className={`ph-bold ${step.icon} ${step.accent} text-sm`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
