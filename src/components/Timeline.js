"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineSteps = [
  {
    number: '01',
    title: 'Describe Your Intent',
    description: 'Use natural language to tell the engine exactly what you need. No code, no templates — just describe the workflow you envision and the agent understands context, triggers, and desired outcomes.',
    icon: 'ph-chat-centered-text',
    accent: 'from-[#FF005C] to-[#FF6B9D]',
    accentColor: '#FF005C',
  },
  {
    number: '02',
    title: 'Intelligent Assembly',
    description: 'Our proprietary AI compiler breaks your intent into discrete micro-tasks. It maps API endpoints, resolves authentication flows, and constructs a dependency graph — all in seconds.',
    icon: 'ph-cpu',
    accent: 'from-[#7C3AED] to-[#A78BFA]',
    accentColor: '#7C3AED',
  },
  {
    number: '03',
    title: 'Autonomous Execution',
    description: 'Once deployed, your agent runs 24/7 on our edge infrastructure. It handles retries, error recovery, and rate limiting autonomously — while providing full observability through real-time logs.',
    icon: 'ph-lightning',
    accent: 'from-[#0EA5E9] to-[#67E8F9]',
    accentColor: '#0EA5E9',
  },
  {
    number: '04',
    title: 'Continuous Learning',
    description: 'Every execution refines the agent. It learns from edge cases, optimizes execution paths, and adapts to API changes. Your workflows get smarter with every cycle — zero maintenance required.',
    icon: 'ph-brain',
    accent: 'from-[#10B981] to-[#6EE7B7]',
    accentColor: '#10B981',
  },
];

function TimelineCard({ step, i, scrollYProgress }) {
  const cardStart = i / timelineSteps.length;
  const cardEnd = (i + 1) / timelineSteps.length;

  // 3D perspective transforms driven by scroll
  const rotateY = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.08),
      cardStart + 0.05,
      cardEnd - 0.05,
      Math.min(1, cardEnd + 0.08),
    ],
    [35, 0, 0, -35]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.08),
      cardStart + 0.05,
      cardEnd - 0.05,
      Math.min(1, cardEnd + 0.08),
    ],
    [8, 0, 0, -8]
  );

  const translateZ = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.08),
      cardStart + 0.05,
      cardEnd - 0.05,
      Math.min(1, cardEnd + 0.08),
    ],
    [-120, 0, 0, -120]
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.06),
      cardStart + 0.04,
      cardEnd - 0.04,
      Math.min(1, cardEnd + 0.08),
    ],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.06),
      cardStart + 0.04,
      cardEnd - 0.04,
      Math.min(1, cardEnd + 0.08),
    ],
    [0.85, 1, 1, 0.85]
  );

  const cardFilter = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.06),
      cardStart + 0.04,
      cardEnd - 0.04,
      Math.min(1, cardEnd + 0.08),
    ],
    ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
  );

  // Glow intensity on active card
  const glowOpacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.05),
      cardStart + 0.05,
      cardEnd - 0.05,
      Math.min(1, cardEnd + 0.05),
    ],
    [0, 0.12, 0.12, 0]
  );

  return (
    <motion.div
      className="timeline-card relative flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw]"
      style={{
        opacity,
        scale,
        filter: cardFilter,
        rotateY,
        rotateX,
        z: translateZ,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="glass-panel rounded-2xl p-8 md:p-10 h-full relative overflow-hidden group hover:border-white/15 transition-all duration-500">
        {/* Gradient orb background */}
        <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${step.accent} rounded-full opacity-[0.04] group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700`}></div>
        
        {/* Scroll-driven glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 60px ${step.accentColor}40, inset 0 0 60px ${step.accentColor}10`,
          }}
        />
        
        {/* Step number */}
        <div className="flex items-center justify-between mb-8">
          <span className={`font-mono text-5xl md:text-6xl font-bold bg-gradient-to-b ${step.accent} bg-clip-text text-transparent opacity-20`}>
            {step.number}
          </span>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center opacity-80`}>
            <i className={`ph-light ${step.icon} text-xl text-white`}></i>
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-wide">{step.title}</h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed">{step.description}</p>
        
        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.accent}`}></div>
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest-lux">Step {step.number} of 04</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The horizontal translate: moves from 0% to -75% (showing all 4 cards)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Progress line width
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Title animations — words reveal as you start scrolling into this section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.06], [40, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.02, 0.08], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.02, 0.08], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '400vh' }}
      id="timeline"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center" style={{ perspective: '1200px' }}>
        
        {/* Section header — tighter spacing */}
        <div className="px-8 md:px-16 mb-8 max-w-7xl mx-auto w-full">
          <motion.div
            className="flex items-center gap-4 mb-4"
            style={{ opacity: titleOpacity }}
          >
            <div className="h-[1px] w-12 bg-dark-pink"></div>
            <p className="font-mono text-dark-pink text-[10px] uppercase tracking-widest-lux">How It Works</p>
          </motion.div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-white leading-[1.15]">
            <motion.span
              className="inline-block"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              From intent to automation.
            </motion.span>
            <br/>
            <motion.span
              className="inline-block text-gray-500 italic font-light"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              In four steps.
            </motion.span>
          </h2>
        </div>

        {/* Progress track */}
        <div className="px-8 md:px-16 mb-8 max-w-7xl mx-auto w-full">
          <div className="relative h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF005C] to-[#0EA5E9] rounded-full"
              style={{ width: lineWidth }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {timelineSteps.map((step, i) => {
              const stepStart = i / timelineSteps.length;
              return (
                <motion.span
                  key={i}
                  className="font-mono text-[10px] uppercase tracking-widest-lux transition-colors duration-300"
                  style={{
                    color: useTransform(
                      scrollYProgress,
                      [stepStart, stepStart + 0.05],
                      ['#444', '#FF005C']
                    ),
                  }}
                >
                  {step.number}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Horizontally scrolling cards with 3D perspective */}
        <div className="px-8 md:px-16" style={{ perspective: '1200px' }}>
          <motion.div
            className="flex gap-8"
            style={{ x, transformStyle: 'preserve-3d' }}
          >
            {timelineSteps.map((step, i) => (
              <TimelineCard
                key={i}
                step={step}
                i={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
