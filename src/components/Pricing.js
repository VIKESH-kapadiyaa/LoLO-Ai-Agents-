"use client";
import { motion } from 'framer-motion';

export default function Pricing() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="page-4" className="py-40 w-full bg-obsidian relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-gray-700"></div>
              <h2 className="font-mono text-gray-400 text-[10px] uppercase tracking-widest-lux">Plans & Pricing</h2>
            </div>
            <h3 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-tight">
              Scalable architecture.<br/><span className="text-gray-500 italic">Transparent mechanics.</span>
            </h3>
          </div>
          <p className="text-sm text-gray-400 max-w-sm font-light leading-relaxed">
            Designed for builders and enterprises. Begin formulating at no cost, upgrade when operations become critical.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Starter Tier */}
          <motion.div variants={cardVariants} className="pricing-card relative glass-panel p-10 rounded-[20px] overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-2">Initiate</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-serif">$0</span>
                <span className="text-gray-500 font-mono text-[10px]">/mo</span>
              </div>
              <p className="text-gray-500 mb-8 pb-8 border-b border-white/5 text-sm font-light leading-relaxed">Evaluation environment for personal task automation.</p>
              
              <ul className="space-y-4 mb-12 font-sans text-sm text-gray-300 font-light">
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> 2 Active Core Agents</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> 1,000 Executions / mo</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Standard Integrations</li>
              </ul>
              
              <button className="w-full py-4 border border-white/10 rounded-xl text-white font-medium text-xs tracking-wide hover:bg-white hover:text-black transition-colors duration-300">
                Deploy Free
              </button>
            </div>
          </motion.div>

          {/* Pro Tier (Highlighted) */}
          <motion.div variants={cardVariants} className="pricing-card relative glass-panel p-10 rounded-[20px] overflow-hidden group border border-dark-pink/30 shadow-[0_0_50px_rgba(216,17,89,0.05)] md:-translate-y-4">
            {/* High end dark texture background */}
            <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2564&auto=format&fit=crop" alt="Premium Texture" className="pricing-bg grayscale" />
            
            <div className="absolute top-0 right-10 bg-dark-pink text-white text-[9px] font-mono px-3 py-1.5 uppercase tracking-widest-lux z-20 rounded-b-md">Professional</div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-2">Scale</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-serif text-white">$49</span>
                <span className="text-gray-500 font-mono text-[10px]">/mo</span>
              </div>
              <p className="text-gray-400 mb-8 pb-8 border-b border-white/10 text-sm font-light leading-relaxed">For professionals relying on agents for critical operations.</p>
              
              <ul className="space-y-4 mb-12 font-sans text-sm text-white font-light">
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Unlimited Agents</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> 50,000 Executions / mo</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Premium Integrations (Stripe, Jira)</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Priority Support & Deep Logs</li>
              </ul>
              
              <button className="w-full py-4 bg-white text-black rounded-xl font-medium text-xs tracking-wide hover:bg-dark-pink hover:text-white transition-colors duration-300">
                Upgrade Instance
              </button>
            </div>
          </motion.div>

          {/* Enterprise Tier */}
          <motion.div variants={cardVariants} className="pricing-card relative glass-panel p-10 rounded-[20px] overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-serif">Custom</span>
              </div>
              <p className="text-gray-500 mb-8 pb-8 border-b border-white/5 text-sm font-light leading-relaxed">Dedicated infrastructure, custom LLMs, and stringent SLAs.</p>
              
              <ul className="space-y-4 mb-12 font-sans text-sm text-gray-300 font-light">
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Custom LLM deployment</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> Dedicated Account Manager</li>
                <li className="flex items-start gap-3"><i className="ph-light ph-check text-dark-pink mt-1"></i> SSO, SOC2 & Advanced Security</li>
              </ul>
              
              <button className="w-full py-4 border border-white/10 rounded-xl text-white font-medium text-xs tracking-wide hover:bg-white hover:text-black transition-colors duration-300">
                Contact Sales
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
