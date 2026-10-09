"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';

// Animated counter component
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseFloat(target);
    const stepTime = (duration * 1000) / end;
    const isDecimal = target.toString().includes('.');
    
    const timer = setInterval(() => {
      start += isDecimal ? 0.01 : 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(2)) : Math.floor(start));
      }
    }, Math.max(stepTime, 16));

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{isInView ? count : 0}{suffix}
    </span>
  );
}

const steps = [
  {
    num: '01',
    title: 'Define Intent',
    desc: 'Utilize the command interface to specify triggers and desired actions across your technology stack.',
  },
  {
    num: '02',
    title: 'Secure Connection',
    desc: 'Authenticate natively. The agent maps API endpoints and comprehends data structures autonomously.',
  },
  {
    num: '03',
    title: 'Continuous Operation',
    desc: 'Deploy instantly. Your agent executes in our secure environment, providing full transparency via detailed logs.',
  },
];

const stats = [
  { value: 99.99, suffix: '%', label: 'Uptime' },
  { value: 50, prefix: '<', suffix: 'ms', label: 'Latency' },
  { value: 24, suffix: '/7', label: 'Operation' },
];

export default function Platform() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeStep, setActiveStep] = useState(-1);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const videoCardRef = useRef(null);

  // Mouse position for gradient orb & video tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Video card tilt
  const cardMouseX = useMotionValue(0.5);
  const cardMouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(cardMouseY, [0, 1], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(cardMouseX, [0, 1], [-8, 8]), { stiffness: 100, damping: 20 });

  // Scroll progress for vertical line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Track mouse for gradient orb
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const el = sectionRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, [mouseX, mouseY]);

  // Track mouse for video card tilt
  const handleCardMouseMove = (e) => {
    if (!videoCardRef.current) return;
    const rect = videoCardRef.current.getBoundingClientRect();
    cardMouseX.set((e.clientX - rect.left) / rect.width);
    cardMouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleCardMouseLeave = () => {
    cardMouseX.set(0.5);
    cardMouseY.set(0.5);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="page-2"
      className="py-40 w-full bg-obsidian relative border-t border-white/5 overflow-hidden"
    >
      {/* ⑥ Subtle dot-grid background */}
      <div className="platform-dot-grid"></div>

      {/* ③ Floating gradient orb — follows mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,0,92,0.07) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          {/* Left: Editorial Content */}
          <motion.div 
            className="lg:col-span-6 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-gray-700"></div>
              <h2 className="font-mono text-gray-400 text-[10px] uppercase tracking-widest-lux">The Platform</h2>
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="font-serif text-4xl md:text-5xl font-normal tracking-tight mb-10 leading-[1.2]">
              A digital workforce, <br/><span className="text-gray-500 italic">operating incessantly.</span>
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-base text-gray-400 font-light leading-relaxed mb-16 max-w-lg">
              We&apos;ve abstracted away the complexity of artificial intelligence. Our engine interprets your intent and constructs secure, autonomous integrations with zero technical overhead.
            </motion.p>

            {/* ② Animated counter stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 mb-16"
            >
              {stats.map((stat, i) => (
                <div key={i} className="platform-stat-card group">
                  <div className="text-2xl font-serif text-white font-medium tracking-tight">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix || ''}
                      duration={2}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest-lux group-hover:text-dark-pink transition-colors duration-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Steps with ① active highlight + ⑤ scroll progress line */}
            <div className="relative">
              {/* ⑤ Vertical scroll-driven progress line */}
              <div className="absolute left-[6px] top-0 bottom-0 w-[1px] bg-white/5">
                <motion.div
                  className="w-full bg-gradient-to-b from-dark-pink to-[#7C3AED] rounded-full"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="space-y-14 pl-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`platform-step group cursor-default relative ${activeStep === i ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(-1)}
                  >
                    {/* Glowing dot on the line */}
                    <div className={`absolute -left-8 top-1.5 w-[13px] h-[13px] rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      activeStep === i 
                        ? 'border-dark-pink bg-dark-pink/20 shadow-[0_0_12px_rgba(255,0,92,0.5)]' 
                        : 'border-white/10 bg-obsidian'
                    }`}>
                      <div className={`w-[5px] h-[5px] rounded-full transition-all duration-500 ${
                        activeStep === i ? 'bg-dark-pink' : 'bg-white/10'
                      }`}></div>
                    </div>

                    {/* Step content */}
                    <div className={`platform-step-inner rounded-xl p-5 -ml-1 transition-all duration-500 ${
                      activeStep === i 
                        ? 'bg-white/[0.03] border-l-2 border-dark-pink shadow-[0_0_30px_rgba(255,0,92,0.04)]' 
                        : 'border-l-2 border-transparent'
                    }`}>
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className={`font-mono text-sm transition-colors duration-500 ${
                          activeStep === i ? 'text-dark-pink' : 'text-gray-700'
                        }`}>{step.num}</span>
                        <h4 className={`text-xl font-medium tracking-wide transition-colors duration-500 ${
                          activeStep === i ? 'text-white' : 'text-gray-300'
                        }`}>{step.title}</h4>
                      </div>
                      <p className={`font-light text-sm leading-relaxed max-w-sm ml-10 transition-colors duration-500 ${
                        activeStep === i ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Premium Video with ④ Parallax 3D tilt */}
          <motion.div 
            className="lg:col-span-6 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              ref={videoCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className="premium-image-wrap rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent relative group"
            >
              {/* ③ Ambient glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-dark-pink/5 via-transparent to-[#7C3AED]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

              <div className="relative w-full h-[700px] rounded-[15px] overflow-hidden bg-black flex items-center justify-center group/video">
                
                {/* High-end Video */}
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted={isMuted} 
                  playsInline 
                  className="w-full h-full object-cover opacity-90 filter contrast-[1.05] grayscale-[0.2]"
                >
                  <source src="/7146d7fa5cf762f8b1b78a2041e7a459.mp4" type="video/mp4" />
                </video>
                
                {/* Mute/Unmute Button Overlay */}
                <button 
                  onClick={toggleMute}
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full glass-panel hover:bg-white/10 hover:scale-110 transition-all duration-300 border border-white/20 shadow-lg group/btn opacity-70 hover:opacity-100"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <i className="ph-fill ph-speaker-slash text-white text-lg group-hover/btn:text-dark-pink transition-colors"></i>
                  ) : (
                    <i className="ph-fill ph-speaker-high text-white text-lg group-hover/btn:text-dark-pink transition-colors"></i>
                  )}
                </button>

                {/* Minimalist Status Overlay */}
                <div className="absolute bottom-8 left-8 glass-panel py-3 px-5 rounded-full flex items-center gap-4">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-pink opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-dark-pink"></span>
                  </div>
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest-lux mt-0.5">Core Active</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
