"use client";
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

import { INTEGRATIONS_DATA } from './integrationsData';

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Communication & Chat',
  'CRM & Sales',
  'Developer & Cloud',
  'Productivity & Docs',
  'Marketing & Social',
  'Finance & Payments',
  'HR & Support',
  'E-commerce',
  'Design & Media'
];

const AVATAR_POOL = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
];

const OFFICE_ROLES = [
  "Customer Support & Ticket Resolution",
  "Inbound Lead Qualification & SDR",
  "Content Strategy & Blog Writing",
  "Executive Assistant & Calendar Scheduling",
  "Social Media Manager & Engagement",
  "Financial Auditing & Expense Tracking",
  "QA Testing & Code Reviewer",
  "Market Research & Competitor Intelligence",
  "Data Entry & Invoice Processing",
  "Recruitment & Candidate Screening",
  "Email Newsletter Curator & Copywriter",
  "SEO Performance Optimization Specialist",
  "Product Feedback Synthesizer",
  "Sales Follow-Up & CRM Updater",
  "Legal Compliance & Contract Reviewer"
];

export default function DashboardPage() {
  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle post-signup onboarding & AI Employee landing
  useEffect(() => {
    try {
      const storedEmp = localStorage.getItem('lolo_new_employee');
      const storedNav = localStorage.getItem('lolo_active_nav');
      const searchParams = new URLSearchParams(window.location.search);
      const navParam = searchParams.get('nav');

      if (storedEmp) {
        const parsedEmp = JSON.parse(storedEmp);
        setAiEmployees(prev => {
          if (prev.some(e => e.id === parsedEmp.id)) return prev;
          return [parsedEmp, ...prev];
        });
        localStorage.removeItem('lolo_new_employee');
        setActiveNav('ai-employees');
      } else if (navParam === 'ai-employees' || storedNav === 'ai-employees') {
        setActiveNav('ai-employees');
      }

      if (storedNav) {
        localStorage.removeItem('lolo_active_nav');
      }

      if (navParam) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (err) {
      console.error('Error handling onboarding employee state:', err);
    }
  }, []);

  // AI Employees State
  const [aiEmployees, setAiEmployees] = useState([
    {
      id: 'emp-1',
      name: 'Maya',
      role: 'Inbound Lead Qualification & SDR',
      avatar: AVATAR_POOL[0],
      status: 'Active',
      agents: [
        { id: 'ag-1', name: 'Stripe Lead Dispatcher', trigger: 'New Invoice', status: 'Running', executions: '1,420' },
        { id: 'ag-2', name: 'HubSpot Contact Sync', trigger: 'Webform Submission', status: 'Active', executions: '890' }
      ]
    },
    {
      id: 'emp-2',
      name: 'Ethan',
      role: 'Content Strategy & Blog Writing',
      avatar: AVATAR_POOL[1],
      status: 'Active',
      agents: [
        { id: 'ag-3', name: 'SEO Keyword Generator', trigger: 'Weekly Cron', status: 'Running', executions: '630' },
        { id: 'ag-4', name: 'Notion Draft Creator', trigger: 'GitHub Issue', status: 'Active', executions: '412' }
      ]
    },
    {
      id: 'emp-3',
      name: 'Sarah',
      role: 'Customer Support & Ticket Resolution',
      avatar: AVATAR_POOL[2],
      status: 'Active',
      agents: [
        { id: 'ag-5', name: 'Intercom Ticket Classifier', trigger: 'Incoming Message', status: 'Running', executions: '2,890' }
      ]
    }
  ]);

  // Integrations State (130+ Native Ecosystem Market Tools)
  const [integrationsList, setIntegrationsList] = useState(INTEGRATIONS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = integrationsList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleIntegration = (id) => {
    setIntegrationsList(prev => prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };
  // Employee Filter state for AI Agents view
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('all');
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [targetEmployeeId, setTargetEmployeeId] = useState(null);

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState(OFFICE_ROLES[0]);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  // New Agent Form State
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentTrigger, setNewAgentTrigger] = useState('Webhook Trigger');

  // Pick random avatar
  const shuffleAvatar = () => {
    const nextIdx = Math.floor(Math.random() * AVATAR_POOL.length);
    setCurrentAvatarIndex(nextIdx);
  };

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    if (!newEmpName.trim()) return;

    const newEmp = {
      id: `emp-${Date.now()}`,
      name: newEmpName.trim(),
      role: newEmpRole,
      avatar: AVATAR_POOL[currentAvatarIndex],
      status: 'Active',
      agents: []
    };

    setAiEmployees([newEmp, ...aiEmployees]);
    setNewEmpName('');
    setIsEmployeeModalOpen(false);
    setActiveNav('ai-employees');
  };

  const handleCreateAgent = (e) => {
    e.preventDefault();
    if (!newAgentName.trim() || !targetEmployeeId) return;

    const newAgent = {
      id: `ag-${Date.now()}`,
      name: newAgentName.trim(),
      trigger: newAgentTrigger,
      status: 'Running',
      executions: '0'
    };

    setAiEmployees(prev =>
      prev.map(emp => {
        if (emp.id === targetEmployeeId) {
          return { ...emp, agents: [...emp.agents, newAgent] };
        }
        return emp;
      })
    );

    setNewAgentName('');
    setIsAgentModalOpen(false);
    setTargetEmployeeId(null);
  };

  const openAgentModal = (empId) => {
    setTargetEmployeeId(empId);
    setIsAgentModalOpen(true);
  };

  const initChart = () => {
    if (typeof window === 'undefined' || !window.Chart || !chartCanvasRef.current) return;
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    
    const labels = ['Jun 3', 'Jun 6', 'Jun 10', 'Jun 13', 'Jun 17', 'Jun 20', 'Jun 24', 'Jun 27', 'Jun 30'];
    
    const dataPoints = [
      45, 52, 38, 65, 48, 70, 55, 80, 62, 75, 58, 85, 60, 92, 70, 65, 78, 84,
      50, 68, 72, 88, 64, 79, 56, 83, 71, 95, 68, 86, 74, 90, 62, 78, 85, 92, 76, 88, 82, 94
    ];

    const bgDataPoints = [];
    for (let i = 0; i < 40; i++) {
      bgDataPoints.push(50 + Math.sin(i / 3) * 20 + (Math.random() * 8));
    }

    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 40 }, (_, i) => i % 5 === 0 ? labels[Math.floor(i / 5)] || '' : ''),
        datasets: [
          {
            label: 'Activity',
            data: dataPoints,
            borderColor: '#8b8b8b',
            borderWidth: 1.5,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false
          },
          {
            label: 'Trend',
            data: bgDataPoints,
            borderColor: '#333333',
            borderWidth: 1,
            tension: 0.4,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            ticks: {
              color: '#666',
              maxRotation: 0,
              font: { size: 10 },
              callback: function (value) {
                const label = this.getLabelForValue(value);
                return label ? label : '';
              }
            }
          },
          y: {
            display: false,
            min: 0,
            max: 100
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      }
    });
  };

  useEffect(() => {
    if (activeNav === 'dashboard') {
      initChart();
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [activeNav]);

  return (
    <>
      {/* External CSS & Libraries */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        onLoad={initChart}
      />

      {/* Full-Screen Web App Root with Natural Native Window Scrolling */}
      <div className="min-h-screen w-full bg-[#0f0f0f] text-[#ececec] flex font-sans relative">
        
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
          />
        )}

        {/* SIDEBAR (Pinned Sticky Sidebar) */}
        <aside
          className={`w-64 bg-[#141414] border-r border-[#2a2a2a] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-40 transition-all duration-300 ${
            mobileSidebarOpen ? 'fixed inset-y-0 left-0 flex' : sidebarOpen ? 'hidden md:flex' : 'hidden'
          }`}
        >
          <div className="p-4">
            {/* Logo Header */}
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-2 text-white font-semibold text-base">
                <span className="text-[#FF005C] font-bold tracking-tight">Lolo</span>
                <span className="text-white/80 font-light">Workspace</span>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors" title="Back to Landing Page">
                  <i className="fa-solid fa-house"></i>
                </Link>
                {mobileSidebarOpen && (
                  <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                    <i className="fa-solid fa-xmark text-base"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Nav Section */}
            <nav className="space-y-1 mb-6">
              {/* Task 1: Replaced Quick Action with AI Employees */}
              <button
                onClick={() => { setActiveNav('ai-employees'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left cursor-pointer ${
                  activeNav === 'ai-employees' ? 'text-white bg-[#2a2a2a] font-medium' : 'text-[#8b8b8b] hover:text-white'
                }`}
              >
                <i className="fa-solid fa-user-gear w-4 text-center"></i> AI Employees
                <span className="ml-auto text-[10px] bg-[#FF005C]/20 text-[#FF005C] px-1.5 py-0.5 rounded font-mono font-semibold">
                  {aiEmployees.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveNav('dashboard'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left cursor-pointer ${
                  activeNav === 'dashboard' ? 'text-white bg-[#2a2a2a] font-medium' : 'text-[#8b8b8b] hover:text-white'
                }`}
              >
                <i className="fa-solid fa-border-all w-4 text-center"></i> Dashboard
              </button>

              <button
                onClick={() => { setActiveNav('ai-agents'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left cursor-pointer ${
                  activeNav === 'ai-agents' ? 'text-white bg-[#2a2a2a] font-medium' : 'text-[#8b8b8b] hover:text-white'
                }`}
              >
                <i className="fa-solid fa-robot w-4 text-center"></i> AI Agents
                <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                  {aiEmployees.reduce((acc, emp) => acc + emp.agents.length, 0)}
                </span>
              </button>

              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 text-sm text-[#8b8b8b] hover:text-white rounded-md transition-colors">
                <i className="fa-solid fa-sitemap w-4 text-center"></i> Workflows
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 text-sm text-[#8b8b8b] hover:text-white rounded-md transition-colors">
                <i className="fa-solid fa-chart-line w-4 text-center"></i> Analytics
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveNav('integrations'); setMobileSidebarOpen(false); }} className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${activeNav === 'integrations' ? 'text-white bg-[#2a2a2a] font-medium' : 'text-[#8b8b8b] hover:text-white'}`}>
                <i className="fa-solid fa-link w-4 text-center"></i> Integrations
              </a>
            </nav>

            {/* Task 2: Manage Section removed as requested */}
          </div>

          {/* Bottom Settings & Profile */}
          <div className="p-4 border-t border-[#2a2a2a]">
            <nav className="space-y-1 mb-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 text-sm text-[#8b8b8b] hover:text-white rounded-md transition-colors">
                <i className="fa-solid fa-gear w-4 text-center"></i> Settings
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 text-sm text-[#8b8b8b] hover:text-white rounded-md transition-colors">
                <i className="fa-solid fa-circle-question w-4 text-center"></i> Get Help
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 text-sm text-[#8b8b8b] hover:text-white rounded-md transition-colors">
                <i className="fa-solid fa-magnifying-glass w-4 text-center"></i> Search
              </a>
            </nav>
            
            {/* Profile */}
            <div className="flex items-center gap-3 px-3 py-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center text-xs">AJ</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-white truncate">Alex Johnson</span>
                <span className="text-xs text-[#8b8b8b] truncate">alex@workflows.com</span>
              </div>
              <i className="fa-solid fa-chevron-right ml-auto text-xs text-[#8b8b8b]"></i>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT (Native window scrollable content with sticky header) */}
        <main className="flex-1 min-w-0 min-h-screen bg-[#0f0f0f] relative">
          
          {/* Top Header (Sticky Top) */}
          <header className="sticky top-0 min-h-16 py-2 border-b border-[#2a2a2a] flex items-center justify-between px-6 shrink-0 bg-[#0f0f0f]/95 backdrop-blur-md z-30">
            <div className="flex items-center gap-3 text-[#8b8b8b] text-sm">
              <i
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setMobileSidebarOpen(!mobileSidebarOpen);
                  } else {
                    setSidebarOpen(prev => !prev);
                  }
                }}
                className="fa-solid fa-bars cursor-pointer hover:text-white text-base transition-colors"
              />
              <div>
                <span className="text-white font-semibold text-base block leading-tight">
                  {activeNav === 'ai-employees'
                    ? 'AI Employees Workspace'
                    : activeNav === 'ai-agents'
                    ? 'AI Agents Execution Hub'
                    : activeNav === 'workspace-detail'
                    ? `${aiEmployees.find(e => e.id === selectedWorkspaceId)?.name || 'Employee'} Workspace`
                    : activeNav === 'integrations'
                    ? 'Integrations Hub'
                    : 'Dashboard'}
                </span>
                {activeNav === 'ai-employees' && (
                  <p className="text-xs text-[#8b8b8b] font-light mt-0.5">
                    Overview of active employee workspace profiles. Click any workspace card to open its dedicated workspace page.
                  </p>
                )}
                {activeNav === 'ai-agents' && (
                  <p className="text-xs text-[#8b8b8b] font-light mt-0.5">
                    Manage your autonomous AI employees and their nested task execution agents.
                  </p>
                )}
                {activeNav === 'workspace-detail' && (
                  <p className="text-xs text-[#8b8b8b] font-light mt-0.5">
                    Dedicated workspace control panel, execution telemetry, and assigned agents.
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <i className="fa-regular fa-bell text-[#8b8b8b] hover:text-white cursor-pointer"></i>
              <i className="fa-solid fa-rotate-right text-[#8b8b8b] hover:text-white cursor-pointer"></i>
              
              {/* Trigger: Create AI Employee */}
              <button
                onClick={() => { shuffleAvatar(); setIsEmployeeModalOpen(true); }}
                className="bg-white text-black text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#FF005C] hover:text-white transition-all cursor-pointer shadow-md"
              >
                <i className="fa-solid fa-user-plus text-xs"></i> Create AI Employee
              </button>
            </div>
          </header>

          {/* View Area Content (with pb-32 bottom space for comfortable scrolling) */}
          <div className="p-4 md:p-6 pb-32 space-y-5">
            
            {/* VIEW 1: AI EMPLOYEES WORKSPACE OVERVIEW */}
            {activeNav === 'ai-employees' && (
              <div className="space-y-4">
                {/* AI Employees Workspaces Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        setSelectedWorkspaceId(emp.id);
                        setActiveNav('workspace-detail');
                      }}
                      className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5 flex flex-col justify-between hover:border-[#FF005C]/50 transition-all shadow-md group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="relative">
                            <img
                              src={emp.avatar}
                              alt={emp.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md group-hover:border-[#FF005C] transition-colors"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#141414] rounded-full" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-white group-hover:text-[#FF005C] transition-colors flex items-center gap-2">
                              <span>{emp.name} Workspace</span>
                              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-[#8b8b8b] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </h3>
                            <span className="text-[10px] font-mono uppercase bg-[#2a2a2a] text-[#8b8b8b] px-2 py-0.5 rounded">
                              AI Employee
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#8b8b8b] mb-4 flex items-center gap-2">
                          <i className="fa-solid fa-briefcase text-[10px] text-[#FF005C]"></i>
                          <span>{emp.role}</span>
                        </p>

                        <div className="bg-[#0f0f0f] p-3 rounded-lg border border-[#2a2a2a] flex items-center justify-between text-xs mb-4">
                          <span className="text-[#8b8b8b] flex items-center gap-1.5">
                            <i className="fa-solid fa-robot text-emerald-400 text-xs"></i>
                            Deployed Agents
                          </span>
                          <span className="font-mono text-white font-semibold bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                            {emp.agents.length} Active
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#2a2a2a] flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWorkspaceId(emp.id);
                            setActiveNav('workspace-detail');
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-[#2a2a2a] hover:bg-white hover:text-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#3a3a3a]"
                        >
                          <i className="fa-solid fa-briefcase text-[10px] text-[#FF005C]"></i>
                          <span>{emp.name} Workspace</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmployeeFilter(emp.id);
                            setActiveNav('ai-agents');
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-white text-black hover:bg-[#FF005C] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>See More</span>
                          <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 1.5: NEURAL WORKSPACE - 3 Panel (Chat + Browser + Code) */}
            {activeNav === 'workspace-detail' && (() => {
              const currentEmp = aiEmployees.find(e => e.id === selectedWorkspaceId) || aiEmployees[0];

              const handleChatSend = (e) => {
                e.preventDefault();
                if (!chatInput.trim() || chatLoading) return;
                const userText = chatInput;
                setChatInput('');
                setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
                setChatLoading(true);
                setTimeout(() => {
                  setChatMessages(prev => [...prev, {
                    sender: 'agent',
                    text: `Neural link acknowledged. Processing: "${userText}". Executing ${currentEmp.role} workflow — all autonomous systems nominal.`
                  }]);
                  setChatLoading(false);
                }, 1200);
              };

              return (
                <div className="-m-4 md:-m-6 -mb-32 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

                  {/* Workspace Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a] border-b border-[#2a2a2a] shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveNav('ai-employees')}
                        className="text-xs text-[#8b8b8b] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <i className="fa-solid fa-arrow-left text-[10px]"></i> Back
                      </button>
                      <div className="w-px h-4 bg-[#2a2a2a]"></div>
                      <div className="flex items-center gap-2">
                        <img src={currentEmp.avatar} alt={currentEmp.name} className="w-5 h-5 rounded-full object-cover border border-[#FF005C]/50" />
                        <span className="text-xs font-semibold text-white">{currentEmp.name} Workspace</span>
                        <span className="text-[9px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8b8b8b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Neural Link Secure
                      </div>
                      <button
                        onClick={() => openAgentModal(currentEmp.id)}
                        className="text-[10px] bg-[#FF005C]/10 hover:bg-[#FF005C]/20 text-[#FF005C] border border-[#FF005C]/30 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <i className="fa-solid fa-plus text-[8px]"></i> Deploy Agent
                      </button>
                    </div>
                  </div>

                  {/* 3-Panel Layout */}
                  <div className="flex flex-1 overflow-hidden">

                    {/* LEFT: Neural Chat Panel */}
                    <div className="w-[30%] min-w-[240px] flex flex-col bg-[#080808] border-r border-[#2a2a2a] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-48 bg-[#FF005C]/5 rounded-full blur-[80px] pointer-events-none"></div>

                      {/* Panel Header */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-[#2a2a2a] z-10 shrink-0">
                        <div className="p-1.5 rounded-md bg-[#FF005C]/10 border border-[#FF005C]/20">
                          <i className="fa-solid fa-terminal text-[#FF005C] text-xs"></i>
                        </div>
                        <span className="text-xs font-semibold text-white">Neural Chat</span>
                        <span className="ml-auto flex items-center gap-1 text-[9px] font-mono uppercase text-[#8b8b8b] bg-[#141414] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> Active
                        </span>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs font-mono z-10">
                        <div className="text-[#FF005C]/50 text-[9px] uppercase tracking-widest text-center py-2 border-b border-[#2a2a2a] mb-3">
                          — Secure Neural Link · AES-256 Encrypted —
                        </div>
                        {/* Boot message */}
                        <div className="flex justify-start">
                          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[90%]">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <i className="fa-solid fa-robot text-[8px] text-[#FF005C]"></i>
                              <span className="text-[9px] font-bold text-[#FF005C] uppercase tracking-wider">{currentEmp.name}</span>
                            </div>
                            <p className="text-[#ececec] leading-relaxed text-[11px]">
                              Hello, I am {currentEmp.name}. Awaiting your parameters for the <span className="text-[#FF005C]">{currentEmp.role}</span> sequence.
                            </p>
                          </div>
                        </div>

                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[90%] rounded-xl px-3 py-2.5 text-[11px] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-[#FF005C] text-white rounded-tr-sm'
                                : 'bg-[#141414] border border-[#2a2a2a] text-[#ececec] rounded-tl-sm'
                            }`}>
                              {msg.sender === 'agent' && (
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <i className="fa-solid fa-robot text-[8px] text-[#FF005C]"></i>
                                  <span className="text-[9px] font-bold text-[#FF005C] uppercase tracking-wider">{currentEmp.name}</span>
                                </div>
                              )}
                              {msg.text}
                            </div>
                          </div>
                        ))}

                        {chatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-[#8b8b8b] text-[11px]">
                              <i className="fa-solid fa-circle-notch fa-spin text-[#FF005C] text-xs"></i>
                              Processing parameters...
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Chat Input */}
                      <div className="p-3 bg-[#0a0a0a] border-t border-[#2a2a2a] z-10 shrink-0">
                        <form onSubmit={handleChatSend} className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={chatLoading}
                            placeholder={chatLoading ? 'Awaiting response...' : 'Give an instruction...'}
                            className="flex-1 bg-[#141414] border border-[#2a2a2a] focus:border-[#FF005C]/50 rounded-lg px-3 py-2 text-xs text-white placeholder-[#8b8b8b] outline-none transition-colors disabled:opacity-50 font-mono"
                          />
                          <button
                            type="submit"
                            disabled={chatLoading}
                            className="bg-[#FF005C] hover:bg-[#e0004f] disabled:opacity-50 text-white p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                          >
                            {chatLoading
                              ? <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                              : <i className="fa-solid fa-paper-plane text-xs"></i>}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* MIDDLE: Live Execution Browser */}
                    <div className="w-[35%] min-w-[280px] flex flex-col bg-[#050505] border-r border-[#2a2a2a] overflow-hidden">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#2a2a2a] shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                            <i className="fa-solid fa-globe text-blue-400 text-xs"></i>
                          </div>
                          <span className="text-xs font-semibold text-white">Live Execution</span>
                          <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-[#8b8b8b] bg-[#141414] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> Active
                          </span>
                        </div>
                        <button className="text-[#8b8b8b] hover:text-white text-xs transition-colors"><i className="fa-solid fa-rotate-right"></i></button>
                      </div>

                      {/* Browser Chrome */}
                      <div className="bg-[#0a0a0a] border-b border-[#2a2a2a] px-3 py-2 flex items-center gap-3 shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                        </div>
                        <div className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-md flex items-center px-2.5 py-1 gap-1.5">
                          <i className="fa-solid fa-lock text-emerald-500 text-[9px]"></i>
                          <span className="text-[10px] text-[#8b8b8b] font-mono truncate">https://github.com/login</span>
                        </div>
                      </div>

                      {/* GitHub Login Simulation */}
                      <div className="flex-1 bg-[#0d1117] overflow-hidden flex items-center justify-center relative">
                        <div className="w-full max-w-xs px-4 flex flex-col items-center">
                          <i className="fa-brands fa-github text-4xl text-white mb-5 opacity-90"></i>
                          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 w-full shadow-2xl">
                            <h2 className="text-sm font-semibold text-white text-center mb-4">Sign in to GitHub</h2>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[10px] font-semibold text-[#8b8b8b] mb-1">Username or email</label>
                                <div className="w-full h-8 border border-[#30363d] rounded-md bg-[#010409] px-2.5 flex items-center gap-0.5">
                                  <span className="text-[11px] font-mono text-[#ececec]">autonomous_sys_9</span>
                                  <span className="w-1 h-3.5 bg-[#FF005C] animate-pulse"></span>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] font-semibold text-[#8b8b8b] mb-1">Password</label>
                                <div className="w-full h-8 border border-[#30363d] rounded-md bg-[#010409] px-2.5 flex items-center">
                                  <span className="text-base text-[#8b8b8b] tracking-[0.3em]">••••••••</span>
                                </div>
                              </div>
                              <div className="w-full h-8 bg-[#238636] border border-[#2ea043]/50 rounded-md flex items-center justify-center relative overflow-hidden">
                                <span className="text-white text-xs font-semibold z-10">Sign in</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Animated Agent Cursor */}
                        <div className="absolute pointer-events-none" style={{ animation: 'moveCursorWs 8s ease-in-out infinite', top: '65%', left: '58%' }}>
                          <i className="fa-solid fa-arrow-pointer text-[#FF005C] text-xl" style={{ filter: 'drop-shadow(0 2px 10px rgba(255,0,92,0.7))' }}></i>
                          <div className="mt-1 px-1.5 py-0.5 bg-[#FF005C]/20 border border-[#FF005C]/40 rounded text-[8px] font-mono text-[#FF005C] tracking-wider">
                            AGENT_NAV
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Code / Logic Panel */}
                    <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
                      {/* Panel Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-[#2a2a2a] shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <i className="fa-solid fa-code text-emerald-400 text-xs"></i>
                          </div>
                          <span className="text-xs font-semibold text-white">Logic Generation</span>
                          <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span> Building
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs cursor-pointer" title="Run">
                            <i className="fa-solid fa-play text-[10px]"></i>
                          </button>
                          <button className="p-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs cursor-pointer" title="Stop">
                            <i className="fa-solid fa-stop text-[10px]"></i>
                          </button>
                        </div>
                      </div>

                      {/* File Tabs */}
                      <div className="flex bg-[#0a0a0a] border-b border-[#2a2a2a] text-[10px] font-mono shrink-0">
                        <div className="px-4 py-2 border-r border-[#2a2a2a] bg-[#141414] text-white border-t-2 border-t-[#FF005C] flex items-center gap-1.5">
                          <span className="text-blue-400">TS</span> deploy_v2.ts
                        </div>
                        <div className="px-4 py-2 border-r border-[#2a2a2a] text-[#8b8b8b] hover:bg-[#141414] cursor-pointer flex items-center gap-1.5 transition-colors">
                          <span className="text-amber-400">JS</span> server.js
                        </div>
                        <div className="px-4 py-2 text-[#8b8b8b] hover:bg-[#141414] cursor-pointer flex items-center gap-1.5 transition-colors">
                          <span className="text-[#8b8b8b]">JSON</span> config.json
                        </div>
                      </div>

                      {/* Code Editor */}
                      <div className="flex-1 overflow-auto bg-[#0d0d0d] p-3 font-mono text-[11px] leading-relaxed">
                        {[
                          '// System: autonomous_deploy_v2.ts',
                          "import { exec } from 'child_process';",
                          "import { Octokit } from '@octokit/rest';",
                          '',
                          'export class AgentDeployer {',
                          '  private octokit: Octokit;',
                          '',
                          '  constructor(token: string) {',
                          '    this.octokit = new Octokit({ auth: token });',
                          '  }',
                          '',
                          '  async initializePipeline() {',
                          `    // Agent: ${currentEmp.name} — ${currentEmp.role}`,
                          '    console.log("⚡ Starting deployment...");',
                          "    await this.execAsync('git add .');",
                          `    await this.execAsync('git commit -m "feat: auto"');`,
                          "    await this.execAsync('git push -u origin main');",
                          "    return { status: 'success', code: 200 };",
                          '  }',
                          '',
                          '  private execAsync(cmd: string) {',
                          "    return new Promise(resolve => resolve('ok'));",
                          '  }',
                          '}',
                          '',
                          'const deployer = new AgentDeployer(process.env.TOKEN);',
                          'deployer.initializePipeline();'
                        ].map((line, i) => (
                          <div key={i} className="flex hover:bg-white/[0.02] group">
                            <span className="w-8 text-right pr-3 text-[#3a3a3a] select-none group-hover:text-[#8b8b8b] shrink-0 text-[10px]">{i + 1}</span>
                            <span className={`whitespace-pre ${
                              line.startsWith('//')
                                ? 'text-[#8b8b8b] italic'
                                : /\b(export|class|private|constructor|async|import|return|new)\b/.test(line)
                                ? 'text-[#ff7b72]'
                                : /"/.test(line) || /'/.test(line)
                                ? 'text-[#a5d6ff]'
                                : /console|deployer/.test(line)
                                ? 'text-[#d2a8ff]'
                                : 'text-[#c9d1d9]'
                            }`}>{line}</span>
                          </div>
                        ))}
                      </div>

                      {/* Terminal Output */}
                      <div className="h-36 bg-[#050505] border-t border-[#2a2a2a] flex flex-col shrink-0">
                        <div className="flex px-3 py-1.5 bg-[#0a0a0a] border-b border-[#2a2a2a] text-[9px] text-[#8b8b8b] gap-4 uppercase tracking-wider font-semibold shrink-0">
                          <span className="text-white border-b border-[#FF005C] pb-1 cursor-pointer">Terminal</span>
                          <span className="cursor-pointer hover:text-white transition-colors">Problems <span className="ml-1 bg-white/10 px-1 rounded">0</span></span>
                          <span className="cursor-pointer hover:text-white transition-colors">Debug</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 font-mono text-[10px] text-[#ececec] space-y-1.5">
                          <div className="flex items-center gap-2 text-[#8b8b8b]">
                            <span className="text-emerald-500">➜</span>
                            <span className="text-[#FF005C]">~/agents/{currentEmp.name.toLowerCase()}</span>
                            <span>npx ts-node deploy_v2.ts</span>
                          </div>
                          <div className="text-[#ececec] pl-4">⚡ Starting deployment pipeline...</div>
                          <div className="text-emerald-400 pl-4">✓ Git environment configured.</div>
                          <div className="text-[#ececec] pl-4">🚀 Pushing to origin main...</div>
                          <div className="flex items-center gap-2 pl-4">
                            <i className="fa-solid fa-microchip text-amber-500 animate-pulse text-xs"></i>
                            <span className="text-amber-400">Allocating cloud compute resources...</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <style dangerouslySetInnerHTML={{__html: `
                    @keyframes moveCursorWs {
                      0% { top: 85%; left: 80%; }
                      20% { top: 42%; left: 44%; }
                      40% { top: 42%; left: 44%; }
                      55% { top: 62%; left: 44%; }
                      70% { top: 62%; left: 44%; }
                      80% { top: 75%; left: 50%; }
                      100% { top: 85%; left: 80%; }
                    }
                  `}} />
                </div>
              );
            })()}

            {/* VIEW 2: AI AGENTS EXECUTION HUB (Detailed Nested Task Agents) */}
            {activeNav === 'ai-agents' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#2a2a2a]">
                  <div>
                    <h2 className="text-base font-semibold text-white">AI Agents Execution Hub</h2>
                    <p className="text-xs text-[#8b8b8b]">Manage autonomous task execution agents nested under each AI Employee Workspace.</p>
                  </div>
                  <button
                    onClick={() => { shuffleAvatar(); setIsEmployeeModalOpen(true); }}
                    className="bg-white text-black text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#FF005C] hover:text-white transition-all cursor-pointer shadow-md"
                  >
                    <i className="fa-solid fa-user-plus text-xs"></i> Create AI Employee
                  </button>
                </div>

                {/* Filter Chips by Employee Workspace */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                  <button
                    onClick={() => setSelectedEmployeeFilter('all')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedEmployeeFilter === 'all'
                        ? 'bg-white text-black font-semibold border-white shadow-sm'
                        : 'bg-[#141414] text-[#8b8b8b] border-[#2a2a2a] hover:text-white'
                    }`}
                  >
                    All Employee Workspaces ({aiEmployees.length})
                  </button>
                  {aiEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => setSelectedEmployeeFilter(emp.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer border flex items-center gap-2 ${
                        selectedEmployeeFilter === emp.id
                          ? 'bg-white text-black font-semibold border-white shadow-sm'
                          : 'bg-[#141414] text-[#8b8b8b] border-[#2a2a2a] hover:text-white'
                      }`}
                    >
                      <img src={emp.avatar} alt={emp.name} className="w-4 h-4 rounded-full object-cover" />
                      <span>{emp.name} Workspace ({emp.agents.length})</span>
                    </button>
                  ))}
                </div>

                {/* Detailed Employee Cards & Nested AI Agents */}
                <div className="grid grid-cols-1 gap-4">
                  {aiEmployees
                    .filter(emp => selectedEmployeeFilter === 'all' || emp.id === selectedEmployeeFilter)
                    .map((emp) => (
                      <div
                        key={emp.id}
                        className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 sm:p-5 hover:border-white/15 transition-all shadow-md"
                      >
                        {/* Employee Card Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-[#2a2a2a]">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={emp.avatar}
                                alt={emp.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                              />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-[#141414] rounded-full" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-white">{emp.name} Workspace</h3>
                                <span className="text-[9px] font-mono uppercase bg-[#2a2a2a] text-[#8b8b8b] px-1.5 py-0.5 rounded">
                                  AI Employee
                                </span>
                              </div>
                              <p className="text-xs text-[#8b8b8b] mt-0.5 flex items-center gap-1.5">
                                <i className="fa-solid fa-briefcase text-[9px] text-[#FF005C]"></i>
                                <span>{emp.role}</span>
                              </p>
                            </div>
                          </div>

                          {/* Add Nested Agent Button */}
                          <button
                            onClick={() => openAgentModal(emp.id)}
                            className="px-3 py-1.5 rounded-md bg-[#2a2a2a] hover:bg-white hover:text-black text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-robot text-xs text-emerald-400"></i>
                            <span>Deploy Agent under {emp.name}</span>
                          </button>
                        </div>

                        {/* Nested AI Agents under Employee */}
                        <div className="mt-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[11px] font-mono uppercase text-[#8b8b8b] tracking-wider flex items-center gap-1.5">
                              <i className="fa-solid fa-network-wired text-[10px]"></i>
                              AI Agents under {emp.name} ({emp.agents.length})
                            </h4>
                          </div>

                          {emp.agents.length === 0 ? (
                            <div className="p-3 rounded-lg border border-dashed border-[#2a2a2a] text-center">
                              <p className="text-xs text-[#8b8b8b] font-light">
                                No active agents created for {emp.name} yet. Click <span className="text-white font-medium cursor-pointer" onClick={() => openAgentModal(emp.id)}>+ Deploy Agent</span> to assign automated workflows.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                              {emp.agents.map((ag) => (
                                <div
                                  key={ag.id}
                                  className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3 flex flex-col justify-between hover:border-[#FF005C]/40 transition-colors"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <h5 className="text-xs font-medium text-white flex items-center gap-1.5">
                                        <i className="fa-solid fa-robot text-[10px] text-[#FF005C]"></i>
                                        {ag.name}
                                      </h5>
                                      <span className="text-[8px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 px-1 py-0.5 rounded">
                                        {ag.status}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-[#8b8b8b]">Trigger: {ag.trigger}</p>
                                  </div>

                                  <div className="mt-2.5 pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[9px] text-[#8b8b8b]">
                                    <span>{ag.executions} Executions</span>
                                    <span className="text-white hover:text-[#FF005C] cursor-pointer flex items-center gap-1">
                                      Configure <i className="fa-solid fa-chevron-right text-[7px]"></i>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* VIEW 2: STANDARD DASHBOARD */}
            {activeNav === 'dashboard' && (
              <>
                {/* Metrics Grid (Top Row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                  {/* Card 1: Active Workflows */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Active Workflows</h3>
                      <span className="text-xs text-[#8b8b8b]">•••</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">24</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">6 workflows added this week</span>
                      <i className="fa-solid fa-arrow-trend-up text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">16 running, 8 scheduled</div>
                  </div>

                  {/* Card 2: Tasks Requiring Attention */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Tasks Requiring Attention</h3>
                      <span className="text-[10px] text-[#ff4d4d] bg-red-950/30 px-1.5 py-0.5 rounded border border-red-900/50">Critical</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">7</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">3 high priority tasks</span>
                      <i className="fa-regular fa-circle-xmark text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">Requires immediate action</div>
                  </div>

                  {/* Card 3: Time Saved This Week */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Time Saved This Week</h3>
                      <span className="text-[10px] text-[#8b8b8b]">+22%</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">42.5 hrs</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">Efficiency improving</span>
                      <i className="fa-regular fa-circle-check text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">+7.5 hrs from last week</div>
                  </div>

                  {/* Card 4: SOP Compliance Rate */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">SOP Compliance Rate</h3>
                      <span className="text-[10px] text-[#8b8b8b]">+3.5%</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">94.2%</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">High compliance rate</span>
                      <i className="fa-regular fa-circle-check text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">Exceeds target of 90%</div>
                  </div>
                </div>

                {/* Metrics Grid (Bottom Row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                  {/* Card 5: Revenue Pipeline */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Revenue Pipeline</h3>
                      <span className="text-[10px] text-[#8b8b8b]">+16.2%</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">$125,450</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">Sales agent performance up</span>
                      <i className="fa-solid fa-arrow-trend-up text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">$45K in negotiation phase</div>
                  </div>

                  {/* Card 6: Agent Activity */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Agent Activity</h3>
                      <span className="text-[10px] text-[#8b8b8b]">+38%</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">786</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">High activity level</span>
                      <i className="fa-solid fa-arrow-trend-up text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">Content agent most active</div>
                  </div>

                  {/* Card 7: Marketing Content Performance */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Marketing Content Performance</h3>
                      <span className="text-[10px] text-[#8b8b8b]">-1.2%</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">8.7%</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">Engagement rate down</span>
                      <i className="fa-solid fa-arrow-trend-down text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">Content strategy needs review</div>
                  </div>

                  {/* Card 8: Financial Health Score */}
                  <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#2a2a2a]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#8b8b8b] text-xs font-medium">Financial Health Score</h3>
                      <span className="text-[10px] text-[#8b8b8b]">+5 pts</span>
                    </div>
                    <div className="text-2xl font-semibold text-white mb-4">87/100</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-[#8b8b8b]">Strong financial position</span>
                      <i className="fa-regular fa-circle-check text-[#8b8b8b] ml-1"></i>
                    </div>
                    <div className="text-[10px] text-[#8b8b8b] mt-1">Improved cash flow metrics</div>
                  </div>
                </div>

                {/* Main Section: Chart & Needs Attention */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                  {/* Chart Section */}
                  <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] lg:col-span-2 flex flex-col p-5">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-lg font-medium text-white">Agent Activity Trends</h2>
                        <p className="text-xs text-[#8b8b8b] mt-1">Activity across all agents for the selected period</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-[#8b8b8b] hover:text-white px-2 py-1">Last 3 months</button>
                        <button className="text-xs text-white bg-[#2a2a2a] px-2 py-1 rounded">Last 30 days</button>
                        <button className="text-xs text-[#8b8b8b] hover:text-white px-2 py-1">Last 7 days</button>
                      </div>
                    </div>
                    
                    {/* Chart Canvas Container */}
                    <div className="flex-1 w-full h-56 relative min-h-[220px]">
                      <canvas ref={chartCanvasRef} id="activityChart"></canvas>
                    </div>
                  </div>

                  {/* Needs Attention Section */}
                  <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-5">
                    <h2 className="text-lg font-medium text-white mb-1">Needs Attention</h2>
                    <p className="text-xs text-[#8b8b8b] mb-6">Items requiring your immediate attention</p>
                    
                    <div className="space-y-4">
                      {/* Item 1 */}
                      <div className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] mt-2 shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-white">Content approval pending</h4>
                            <span className="text-[10px] text-[#8b8b8b]">Critical</span>
                          </div>
                          <p className="text-xs text-[#8b8b8b] mt-1">3 blog posts awaiting final approval before publishing</p>
                        </div>
                      </div>
                      
                      {/* Item 2 */}
                      <div className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-white">Sales agent configuration</h4>
                            <span className="text-[10px] text-[#8b8b8b]">High</span>
                          </div>
                          <p className="text-xs text-[#8b8b8b] mt-1">Sales agent needs API credentials updated</p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-white">Support ticket escalation</h4>
                            <span className="text-[10px] text-[#8b8b8b]">Medium</span>
                          </div>
                          <p className="text-xs text-[#8b8b8b] mt-1">2 tickets require human intervention</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Filter/Tabs Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
                  <div className="flex items-center gap-4 text-sm">
                    <button className="text-white font-medium border-b-2 border-white pb-1">Active Workflows</button>
                    <button className="text-[#8b8b8b] hover:text-white pb-1 border-b-2 border-transparent">Completed</button>
                    <button className="text-[#8b8b8b] hover:text-white pb-1 border-b-2 border-transparent">Scheduled</button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Chips */}
                    <div className="flex items-center gap-1 bg-[#2a2a2a] px-2 py-1 rounded text-xs text-[#8b8b8b] border border-[#333]">
                      Oct-Nov <i className="fa-solid fa-xmark ml-1 cursor-pointer hover:text-white"></i>
                    </div>
                    <div className="flex items-center gap-1 bg-[#2a2a2a] px-2 py-1 rounded text-xs text-[#8b8b8b] border border-[#333]">
                      Past Performance <i className="fa-solid fa-xmark ml-1 cursor-pointer hover:text-white"></i>
                    </div>
                    <div className="flex items-center gap-1 bg-[#2a2a2a] px-2 py-1 rounded text-xs text-[#8b8b8b] border border-[#333]">
                      Key Personnel <i className="fa-solid fa-xmark ml-1 cursor-pointer hover:text-white"></i>
                    </div>
                    <div className="flex items-center gap-1 bg-transparent px-2 py-1 rounded text-xs text-[#8b8b8b] border border-[#2a2a2a] border-dashed cursor-pointer hover:text-white">
                      Focus Documents
                    </div>
                    
                    <div className="w-px h-4 bg-[#2a2a2a] mx-2 hidden sm:block"></div>
                    
                    <button className="flex items-center gap-2 text-xs text-[#8b8b8b] hover:text-white">
                      <i className="fa-solid fa-table-columns"></i> Customize Columns <i className="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-white bg-transparent hover:bg-[#2a2a2a] px-2 py-1 rounded border border-[#2a2a2a] ml-2 cursor-pointer">
                      <i className="fa-solid fa-plus"></i> Add Section
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* VIEW 3: INTEGRATIONS HUB (130+ Native Enterprise Ecosystem Tools & Webhooks) */}
            {activeNav === 'integrations' && (
              <div className="space-y-4">
                {/* Top Header & Search Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#2a2a2a]">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-base sm:text-lg font-semibold text-white">Native Ecosystem Integrations</h2>
                      <span className="text-xs font-mono bg-[#FF005C]/20 text-[#FF005C] px-2.5 py-0.5 rounded-full font-bold">
                        {integrationsList.length} Market Tools
                      </span>
                    </div>
                    <p className="text-xs text-[#8b8b8b] mt-0.5">
                      Connect your workspace with 130+ widely used enterprise SaaS tools, databases, and AI webhooks.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 md:w-64">
                      <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8b8b8b]"></i>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search 130+ tools..."
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#FF005C] transition-colors"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8b8b8b] hover:text-white"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      )}
                    </div>

                    {/* Connected Status Counter */}
                    <div className="text-xs font-mono bg-[#141414] text-[#8b8b8b] px-3 py-1.5 rounded-lg border border-[#2a2a2a] flex items-center gap-2 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-white font-semibold">{integrationsList.filter(i => i.enabled).length}</span> / {integrationsList.length} Connected
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                        selectedCategory === cat
                          ? 'bg-white text-black font-semibold border-white shadow-sm'
                          : 'bg-[#141414] text-[#8b8b8b] border-[#2a2a2a] hover:text-white hover:border-[#444]'
                      }`}
                    >
                      {cat} {cat === 'All' ? `(${integrationsList.length})` : ''}
                    </button>
                  ))}
                </div>

                {/* Filter Counter Bar */}
                <div className="flex items-center justify-between text-xs text-[#8b8b8b] px-1">
                  <span>Showing <strong className="text-white">{filteredIntegrations.length}</strong> of {integrationsList.length} integrations</span>
                  {searchTerm && <span>Search filter: &quot;{searchTerm}&quot;</span>}
                </div>

                {/* Integrations Grid / Empty State */}
                {filteredIntegrations.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-[#2a2a2a] text-center bg-[#141414]/50">
                    <i className="fa-solid fa-magnifying-glass text-2xl text-[#666] mb-2"></i>
                    <p className="text-sm text-[#8b8b8b]">No integrations found matching &quot;{searchTerm}&quot; in category &quot;{selectedCategory}&quot;.</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                      className="mt-3 px-3.5 py-1.5 rounded-md bg-[#2a2a2a] text-white text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      Reset Search & Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {filteredIntegrations.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-3.5 flex flex-col justify-between hover:border-white/20 transition-all shadow-md group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2.5 mb-2.5">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} border ${item.borderColor} flex items-center justify-center text-base shrink-0`}>
                                <i className={item.icon}></i>
                              </div>
                              <div className="overflow-hidden">
                                <h4 className="text-sm font-semibold text-white tracking-tight truncate">{item.name}</h4>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-[#8b8b8b] hover:text-white flex items-center gap-1 transition-colors"
                                >
                                  <i className="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                                  <span className="truncate max-w-[110px]">{item.url}</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#8b8b8b] font-light leading-snug mb-3 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2.5 border-t border-[#2a2a2a]">
                          <span className="text-[9px] font-mono text-[#666] uppercase tracking-wider truncate max-w-[120px]">{item.category}</span>
                          <div
                            onClick={() => toggleIntegration(item.id)}
                            className={`w-9 h-5 rounded-full p-0.5 ${item.enabled ? 'bg-[#7c3aed]' : 'bg-[#262626]'} relative cursor-pointer transition-colors shrink-0`}
                            title={item.enabled ? "Connected (Click to disconnect)" : "Disconnected (Click to connect)"}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform ${item.enabled ? 'translate-x-4' : 'translate-x-0'} transition-transform`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* MODAL 1: CREATE AI EMPLOYEE */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            <button
              onClick={() => setIsEmployeeModalOpen(false)}
              className="absolute top-5 right-5 text-[#8b8b8b] hover:text-white"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FF005C]/20 border border-[#FF005C]/40 flex items-center justify-center text-[#FF005C]">
                <i className="fa-solid fa-user-gear text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Create AI Employee</h3>
                <p className="text-xs text-[#8b8b8b]">Configure an autonomous employee for your team</p>
              </div>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-5">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8b8b8b] mb-2">
                  AI Employee Avatar (Random Generated)
                </label>
                <div className="flex items-center gap-4 bg-[#0f0f0f] p-3 rounded-xl border border-[#2a2a2a]">
                  <img
                    src={AVATAR_POOL[currentAvatarIndex]}
                    alt="Selected Avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FF005C]"
                  />
                  <div>
                    <button
                      type="button"
                      onClick={shuffleAvatar}
                      className="px-3 py-1.5 rounded-lg bg-[#2a2a2a] hover:bg-white hover:text-black text-white text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-[#FF005C] fa-shuffle text-[10px]"></i>
                      Shuffle Random Avatar
                    </button>
                    <p className="text-[10px] text-[#8b8b8b] mt-1">Pool of 12 cute/sleek profiles</p>
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label htmlFor="emp-name" className="block text-xs font-mono uppercase tracking-wider text-[#8b8b8b] mb-2">
                  AI Employee Name
                </label>
                <input
                  type="text"
                  id="emp-name"
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Maya, Ethan, Sarah..."
                  required
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF005C] transition-colors"
                />
              </div>

              {/* Work Definition Dropdown (15 Office Roles) */}
              <div>
                <label htmlFor="emp-role" className="block text-xs font-mono uppercase tracking-wider text-[#8b8b8b] mb-2">
                  Define Work / Office Role (15 Pre-configured Human Roles)
                </label>
                <select
                  id="emp-role"
                  value={newEmpRole}
                  onChange={(e) => setNewEmpRole(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF005C] transition-colors cursor-pointer"
                >
                  {OFFICE_ROLES.map((role, idx) => (
                    <option key={idx} value={role} className="bg-[#141414] text-white">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#2a2a2a] text-xs font-medium text-[#8b8b8b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-[#FF005C] hover:text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
                >
                  Confirm & Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DEPLOY AI AGENT UNDER EMPLOYEE */}
      {isAgentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            <button
              onClick={() => setIsAgentModalOpen(false)}
              className="absolute top-5 right-5 text-[#8b8b8b] hover:text-white"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <i className="fa-solid fa-robot text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Deploy AI Agent</h3>
                <p className="text-xs text-[#8b8b8b]">
                  Attach automated agent under {aiEmployees.find(e => e.id === targetEmployeeId)?.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-5">
              <div>
                <label htmlFor="agent-name" className="block text-xs font-mono uppercase tracking-wider text-[#8b8b8b] mb-2">
                  AI Agent Name
                </label>
                <input
                  type="text"
                  id="agent-name"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="e.g. Stripe Deal Dispatcher, HubSpot Lead Sync..."
                  required
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="agent-trigger" className="block text-xs font-mono uppercase tracking-wider text-[#8b8b8b] mb-2">
                  Agent Trigger Mechanism
                </label>
                <select
                  id="agent-trigger"
                  value={newAgentTrigger}
                  onChange={(e) => setNewAgentTrigger(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="Incoming Webhook Event">Incoming Webhook Event</option>
                  <option value="New Invoice Created">New Invoice Created</option>
                  <option value="Webform Submission">Webform Submission</option>
                  <option value="GitHub Issue Logged">GitHub Issue Logged</option>
                  <option value="Scheduled Cron Job (Every Hour)">Scheduled Cron Job (Every Hour)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAgentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#2a2a2a] text-xs font-medium text-[#8b8b8b] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold transition-all shadow-md cursor-pointer"
                >
                  Deploy Nested Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
