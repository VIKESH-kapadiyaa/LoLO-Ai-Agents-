"use client";
import { motion } from 'framer-motion';

const integrations = [
  { icon: 'ph-envelope-simple', color: 'text-red-500', label: 'Gmail' },
  { icon: 'ph-calendar', color: 'text-blue-500', label: 'Calendar' },
  { icon: 'ph-table', color: 'text-green-500', label: 'Sheets' },
  { icon: 'ph-whatsapp-logo', color: 'text-green-400', label: 'WhatsApp' },
  { icon: 'ph-instagram-logo', color: 'text-pink-500', label: 'Instagram' },
  { icon: 'ph-slack-logo', color: 'text-purple-500', label: 'Slack' },
  { icon: 'ph-telegram-logo', color: 'text-blue-400', label: 'Telegram' },
  { icon: 'ph-plugs', color: 'text-gray-300', label: 'Webhook' },
  { icon: 'ph-code', color: 'text-gray-300', label: 'REST API' },
  { icon: 'ph-shopping-bag', color: 'text-green-600', label: 'Shopify' },
];

const reverseIntegrations = [
  { icon: 'ph-orange-slice', color: 'text-orange-500', label: 'HubSpot' },
  { icon: 'ph-cube', color: 'text-gray-200', label: 'Notion' },
  { icon: 'ph-discord-logo', color: 'text-indigo-500', label: 'Discord' },
  { icon: 'ph-github-logo', color: 'text-gray-200', label: 'GitHub' },
  { icon: 'ph-database', color: 'text-blue-300', label: 'Airtable' },
  { icon: 'ph-buildings', color: 'text-blue-600', label: 'Zoho' },
  { icon: 'ph-credit-card', color: 'text-blue-500', label: 'Razorpay' },
  { icon: 'ph-stripe-logo', color: 'text-indigo-400', label: 'Stripe' },
  { icon: 'ph-headset', color: 'text-emerald-700', label: 'Freshdesk' },
  { icon: 'ph-kanban', color: 'text-blue-700', label: 'Jira' },
];

export default function Integrations() {
  return (
    <section id="page-3" className="py-32 w-full bg-black relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-8 md:px-16 mb-24 flex flex-col items-center text-center"
      >
        <i className="ph-thin ph-plugs-connected text-4xl text-gray-600 mb-6"></i>
        <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight mb-6">Seamless Connectivity</h3>
        <p className="text-gray-500 max-w-xl mx-auto text-sm font-light">
          Over 20 native integrations. Communicate securely with your entire ecosystem in real-time.
        </p>
      </motion.div>

      {/* Infinite Marquee Setup */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full overflow-hidden flex flex-col gap-4"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 */}
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee-x w-max hover:[animation-play-state:paused]">
            {/* Block 1 & 2 */}
            {[1, 2].map((blockIdx) => (
              <div key={blockIdx} className="flex gap-4 px-2">
                {integrations.map((item, idx) => (
                  <div key={idx} className="integration-item w-48 h-16 rounded-xl flex items-center justify-center gap-3">
                    <i className={`ph-light ${item.icon} text-2xl ${item.color}`}></i>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee-x-reverse w-max hover:[animation-play-state:paused]">
            {/* Block 1 & 2 */}
            {[1, 2].map((blockIdx) => (
              <div key={blockIdx} className="flex gap-4 px-2">
                {reverseIntegrations.map((item, idx) => (
                  <div key={idx} className="integration-item w-48 h-16 rounded-xl flex items-center justify-center gap-3">
                    <i className={`ph-light ${item.icon} text-2xl ${item.color}`}></i>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
