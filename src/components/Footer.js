"use client";
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Footer() {
  const footerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Each orb follows the cursor at a different speed — creates the paint-mixing trail
  const orb1X = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const orb1Y = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const orb2X = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const orb2Y = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const orb3X = useSpring(mouseX, { stiffness: 30, damping: 35 });
  const orb3Y = useSpring(mouseY, { stiffness: 30, damping: 35 });

  const orb4X = useSpring(mouseX, { stiffness: 15, damping: 40 });
  const orb4Y = useSpring(mouseY, { stiffness: 15, damping: 40 });

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <footer
      ref={footerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="bg-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden"
    >
      {/* Paint-mixing aurora orbs */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: isHovering ? 1 : 0 }}
      >
        {/* Orb 1 — Fast, hot pink */}
        <motion.div
          style={{
            x: orb1X,
            y: orb1Y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            position: 'absolute',
            x: orb1X,
            y: orb1Y,
            translateX: '-50%',
            translateY: '-50%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,92,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Orb 2 — Medium speed, violet/purple */}
        <motion.div
          style={{
            position: 'absolute',
            x: orb2X,
            y: orb2Y,
            translateX: '-50%',
            translateY: '-50%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,255,0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Orb 3 — Slow, deep blue */}
        <motion.div
          style={{
            position: 'absolute',
            x: orb3X,
            y: orb3Y,
            translateX: '-50%',
            translateY: '-50%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,120,255,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Orb 4 — Slowest, teal/cyan trail */}
        <motion.div
          style={{
            position: 'absolute',
            x: orb4X,
            y: orb4Y,
            translateX: '-50%',
            translateY: '-50%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,210,200,0.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-8 md:px-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-dark-pink rounded-full"></div>
              <span className="text-lg font-medium tracking-wide text-white">LoLo AI</span>
            </div>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 max-w-xs">
              Designing the future of autonomous digital workflows through natural language interpretation. 
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="ph-light ph-twitter-logo text-xl"></i></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="ph-light ph-github-logo text-xl"></i></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="ph-light ph-linkedin-logo text-xl"></i></a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="font-mono text-white text-[9px] uppercase tracking-widest-lux mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 font-light text-sm">
              <li><a href="#" className="hover:text-dark-pink transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-dark-pink transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-dark-pink transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-dark-pink transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-mono text-white text-[9px] uppercase tracking-widest-lux mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 font-light text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security &amp; SOC2</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-mono text-white text-[9px] uppercase tracking-widest-lux mb-6">Headquarters</h4>
            <ul className="space-y-4 text-gray-500 font-light text-sm">
              <li>123 Innovation Drive</li>
              <li>San Francisco, CA 94025</li>
              <li>United States</li>
              <li className="pt-2 text-white">hello@loloai.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-gray-600 text-xs font-light">
            &copy; 2026 LoLo AI Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-dark-pink"></span>
            </div>
            <span className="font-mono text-gray-400 text-[9px] tracking-widest-lux uppercase">Systems Operational</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
