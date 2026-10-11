"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: 'ph-robot',
    title: 'Autonomous Agents',
    description: 'Self-operating digital workers that handle complex workflows without human intervention.',
  },
  {
    icon: 'ph-shield-check',
    title: 'Enterprise Security',
    description: 'SOC2 compliant infrastructure with end-to-end encryption and zero-trust architecture.',
  },
  {
    icon: 'ph-gauge',
    title: 'Real-Time Execution',
    description: 'Sub-50ms response times on our global edge network with 99.99% guaranteed uptime.',
  },
];

const socialLinks = [
  { icon: 'ph-twitter-logo', href: '#', label: 'Twitter' },
  { icon: 'ph-discord-logo', href: '#', label: 'Discord' },
  { icon: 'ph-github-logo', href: '#', label: 'GitHub' },
];

export default function Hero({ onOpenAuth }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState({ 2: false, 3: false });
  const [showError, setShowError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [viewers, setViewers] = useState(214);
  const videoRef = useRef(null);

  // Very slowly drift viewer count ±1 every ~6s — feels organic, not fake
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(198, Math.min(231, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
      return;
    }

    setIsGenerating(true);
    setLogs({ 2: false, 3: false });

    setTimeout(() => {
      setLogs((prev) => ({ ...prev, 2: true }));
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => ({ ...prev, 3: true }));
      setTimeout(() => {
        setIsGenerating(false);
        setPrompt('');
        if (onOpenAuth) {
          onOpenAuth('signup');
        }
      }, 2500);
    }, 2400);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <section id="page-1" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black">
      {/* Video Background */}
      <div className="hero-video-wrapper">
        <video ref={videoRef} autoPlay loop muted={isMuted} playsInline>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-gradient-mask"></div>
      </div>

      {/* Mute button — top-right corner, always visible */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className="absolute top-10 right-8 z-30 w-8 h-8 rounded-full glass-panel border border-white/10 flex items-center justify-center hover:border-dark-pink/40 transition-all duration-300 group"
      >
        <i className={`ph-fill ${isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'} text-[12px] text-gray-500 group-hover:text-dark-pink transition-colors`}></i>
      </motion.button>

      {/* Right-side floating live stats — vertically centered */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-10 top-[58%] -translate-y-1/2 z-30 flex flex-col items-center gap-5"
      >
        {/* Viewers */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-pink opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-dark-pink"></span>
            </span>
            <span className="font-mono text-[11px] text-gray-300 tabular-nums">{viewers}</span>
          </div>
          <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">viewing</span>
        </div>

        <div className="w-px h-5 bg-white/[0.07]"></div>

        {/* Active agents */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[11px] text-dark-pink">3.4k</span>
          <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">agents</span>
        </div>

        <div className="w-px h-5 bg-white/[0.07]"></div>

        {/* Social icons */}
        <div className="flex flex-col items-center gap-3.5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
            >
              <i className={`ph-bold ${s.icon} text-[13px]`}></i>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 w-full pt-10 pb-4 px-8 md:px-16 flex justify-between items-center"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <span className="text-lg font-medium tracking-wide text-white">LoLo AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-12">
          <a href="#page-2" className="text-[10px] uppercase tracking-widest-lux font-mono text-gray-400 hover:text-white transition-colors">Platform</a>
          <a href="#page-3" className="text-[10px] uppercase tracking-widest-lux font-mono text-gray-400 hover:text-white transition-colors">Integrations</a>
          <a href="#page-4" className="text-[10px] uppercase tracking-widest-lux font-mono text-gray-400 hover:text-white transition-colors">Pricing</a>
        </div>
        <div>
          <button
            onClick={() => onOpenAuth && onOpenAuth('signin')}
            className="text-[11px] uppercase tracking-widest-lux font-medium text-white px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </motion.nav>

      {/* Main Hero Copy */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex-1 flex flex-col justify-center mb-10">
        <div className="max-w-3xl">
          {/* Enhanced label line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-dark-pink"></div>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-dark-pink"></span>
            </span>
            <p className="font-mono text-dark-pink text-[10px] uppercase tracking-widest-lux">Our AI is Ready. What will you build?</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-4xl lg:text-[44px] tracking-tight mb-6 leading-tight text-white"
          >
            Design autonomous workflows. <br/>
            <i className="text-gray-400 font-light">Engineered by intent.</i>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-gray-400 max-w-lg font-light leading-relaxed font-sans"
          >
            Translate natural language directly into secure, robust, and autonomous digital workers that operate seamlessly across your ecosystem 24/7.
          </motion.p>

          {/* Prompt Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-10 relative z-20"
          >
            <div className={`glass-panel rounded-2xl p-1.5 flex items-center relative transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(216,17,89,0.2)] ${showError ? 'border-dark-pink' : ''}`}>
              <div className="pl-6 pr-4 flex items-center justify-center">
                <i className="ph-light ph-sparkle text-xl text-dark-pink animate-pulse"></i>
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                className="prompt-input w-full bg-transparent border-none text-white text-base font-light py-4 focus:ring-0 focus:outline-none placeholder:text-gray-500"
                placeholder="Describe the workflow you wish to automate..."
                autoComplete="off"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center gap-2 text-[13px] ${isGenerating ? 'bg-dark-pink text-white opacity-80 cursor-not-allowed' : 'bg-white text-black hover:bg-dark-pink hover:text-white hover:shadow-[0_0_20px_rgba(216,17,89,0.4)]'}`}
              >
                <span>{isGenerating ? 'Compiling' : 'Deploy Agent'}</span>
                <i className={`ph-bold text-sm ${isGenerating ? 'ph-spinner animate-spin' : 'ph-arrow-right'}`}></i>
              </button>
            </div>

            {/* Loading State */}
            <div className={`absolute bottom-full left-0 w-full mb-6 transition-all duration-500 ${isGenerating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
              <div className="w-full glass-panel border-l-[1px] border-dark-pink rounded-lg p-5 font-mono text-[11px] text-gray-400 tracking-wide">
                <div className="flex items-center gap-3 mb-1">
                  <i className="ph-duotone ph-circle-notch animate-spin text-dark-pink"></i>
                  <p>&gt; Compiling natural language directives...</p>
                </div>
                {logs[2] && <p className="pl-6">&gt; Establishing secure API connections (OAuth 2.0)...</p>}
                {logs[3] && <p className="pl-6 text-white">&gt; Scaffold generated. Deploying to edge network.</p>}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-16 max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="feature-card-float group"
              >
                <div className="glass-panel rounded-xl p-6 h-full hover:border-white/15 transition-all duration-500 hover:shadow-[0_0_40px_rgba(216,17,89,0.06)] relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-dark-pink rounded-full opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-700"></div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-dark-pink/30 transition-colors duration-500">
                      <i className={`ph-light ${feature.icon} text-lg text-gray-400 group-hover:text-dark-pink transition-colors duration-500`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1.5 tracking-wide">{feature.title}</h4>
                      <p className="text-[12px] text-gray-500 font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
