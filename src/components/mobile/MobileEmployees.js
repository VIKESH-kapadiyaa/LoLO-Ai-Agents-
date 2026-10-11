"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_EMPLOYEES = [
  {
    id: 'emp-1',
    name: 'Maya',
    role: 'Inbound Lead Qualification & SDR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    executions: '1,420',
    agents: [
      { name: 'Stripe Lead Dispatcher', trigger: 'New Invoice', status: 'Running' },
      { name: 'HubSpot Contact Sync', trigger: 'Webform Submission', status: 'Active' }
    ]
  },
  {
    id: 'emp-2',
    name: 'Ethan',
    role: 'Content Strategy & Blog Writing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    executions: '890',
    agents: [
      { name: 'SEO Keyword Generator', trigger: 'Weekly Cron', status: 'Running' },
      { name: 'Notion Draft Creator', trigger: 'GitHub Issue', status: 'Active' }
    ]
  },
  {
    id: 'emp-3',
    name: 'Sarah',
    role: 'Customer Support & Ticket Resolution',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    executions: '2,890',
    agents: [
      { name: 'Intercom Ticket Classifier', trigger: 'Incoming Message', status: 'Running' },
      { name: 'Zendesk Priority Router', trigger: 'SLA Warning', status: 'Active' }
    ]
  }
];

export default function MobileEmployees({ onOpenAuth }) {
  const [employees, setEmployees] = useState(BASE_EMPLOYEES);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    try {
      const customEmpsStr = localStorage.getItem('lolo_custom_employees');
      const singleEmpStr = localStorage.getItem('lolo_new_employee');
      let customList = [];
      if (customEmpsStr) {
        const parsed = JSON.parse(customEmpsStr);
        if (Array.isArray(parsed)) customList = parsed;
      }
      if (singleEmpStr) {
        const single = JSON.parse(singleEmpStr);
        if (!customList.some(e => e.id === single.id)) {
          customList = [single, ...customList];
        }
      }

      if (customList.length > 0) {
        setEmployees(prev => {
          const combined = [...customList];
          prev.forEach(p => {
            if (!combined.some(c => c.id === p.id)) {
              combined.push(p);
            }
          });
          return combined;
        });
      }
    } catch (e) {
      console.error('Error loading custom employees on mobile:', e);
    }
  }, []);

  const activeEmp = employees[selectedIdx] || employees[0] || BASE_EMPLOYEES[0];

  return (
    <section id="mobile-workspaces" className="px-4 py-8 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-md mx-auto">
        {/* Section Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF005C]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Autonomous Workspaces
            </span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-white">
            Pre-Trained AI Employees
          </h2>
          <p className="text-xs text-gray-400 font-light mt-1">
            Dedicated neural personas built to orchestrate specialized enterprise workflows.
          </p>
        </div>

        {/* Employee Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {employees.map((emp, idx) => (
            <button
              key={emp.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <img
                src={emp.avatar}
                alt={emp.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{emp.name}</span>
            </button>
          ))}
        </div>

        {/* Active Employee Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEmp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-3 bg-[#141414] border border-white/10 rounded-2xl p-4 shadow-xl relative overflow-hidden"
          >
            {/* Ambient subtle glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF005C]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Profile Row */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeEmp.avatar}
                    alt={activeEmp.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FF005C]"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#141414] rounded-full" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {activeEmp.name} Workspace
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                    {activeEmp.role}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Nested Agents Sub-List */}
            <div className="space-y-2 mb-4 relative z-10">
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">
                Deployed Micro-Agents:
              </span>
              {(activeEmp.agents || []).map((ag, i) => (
                <div
                  key={i}
                  className="bg-black/60 border border-white/5 rounded-xl p-2.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <i className="ph-bold ph-robot text-[#FF005C] text-xs"></i>
                    <div>
                      <span className="text-xs text-white font-medium block">
                        {ag.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Trigger: {ag.trigger || 'Webhook Trigger'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                    Running
                  </span>
                </div>
              ))}
              {(!activeEmp.agents || activeEmp.agents.length === 0) && (
                <div className="bg-black/40 border border-white/5 rounded-xl p-2.5 text-center text-xs text-gray-500">
                  Ready to deploy micro-agents in workspace
                </div>
              )}
            </div>

            {/* Action Buttons: Name Workspace & See More */}
            <div className="flex items-center gap-2 relative z-10 pt-1">
              <Link
                href={`/dashboard?nav=workspace-detail&emp=${activeEmp.id}`}
                className="flex-1 py-2.5 rounded-xl bg-[#2a2a2a] text-white hover:bg-white hover:text-black text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#3a3a3a]"
              >
                <i className="ph-bold ph-briefcase text-xs text-[#FF005C]"></i>
                <span>{activeEmp.name} Workspace</span>
              </Link>

              <Link
                href="/dashboard?nav=ai-agents"
                className="flex-1 py-2.5 rounded-xl bg-white text-black hover:bg-[#FF005C] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>See More</span>
                <i className="ph-bold ph-arrow-right text-xs"></i>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
