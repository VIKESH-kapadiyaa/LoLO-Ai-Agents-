"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
  "Inbound Lead Qualification & SDR",
  "Customer Support & Ticket Resolution",
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
  "Sales Follow-Up & CRM Updater",
  "Legal Compliance & Contract Reviewer"
];

export default function AuthModal({ isOpen, onClose, initialTab = 'signin' }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [modalStep, setModalStep] = useState('auth'); // 'auth' | 'create-employee'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State - Auth
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpFname, setSignUpFname] = useState('');
  const [signUpLname, setSignUpLname] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form State - AI Employee Onboarding Step
  const [empName, setEmpName] = useState('');
  const [empRole, setEmpRole] = useState(OFFICE_ROLES[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_POOL[0]);
  const [avatarOffset, setAvatarOffset] = useState(0);
  const [isEmpLoading, setIsEmpLoading] = useState(false);
  const [isEmpSuccess, setIsEmpSuccess] = useState(false);

  // Sync initial tab and step when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setModalStep('auth');
      setIsSuccess(false);
      setIsLoading(false);
      setIsEmpSuccess(false);
      setIsEmpLoading(false);
      setEmpName('');
      setEmpRole(OFFICE_ROLES[0]);
      setSelectedAvatar(AVATAR_POOL[0]);
    }
  }, [isOpen, initialTab]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Avatars currently visible for selection
  const visibleAvatars = [
    AVATAR_POOL[(avatarOffset + 0) % AVATAR_POOL.length],
    AVATAR_POOL[(avatarOffset + 1) % AVATAR_POOL.length],
    AVATAR_POOL[(avatarOffset + 2) % AVATAR_POOL.length],
    AVATAR_POOL[(avatarOffset + 3) % AVATAR_POOL.length],
    AVATAR_POOL[(avatarOffset + 4) % AVATAR_POOL.length],
    AVATAR_POOL[(avatarOffset + 5) % AVATAR_POOL.length],
  ];

  const handleShuffleAvatars = () => {
    const nextOffset = (avatarOffset + 3) % AVATAR_POOL.length;
    setAvatarOffset(nextOffset);
    setSelectedAvatar(AVATAR_POOL[nextOffset]);
  };

  // Sign In or Create Account submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (activeTab === 'signup') {
      // Simulate account creation then seamlessly proceed to AI employee setup
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          if (signUpFname && signUpFname.trim() && !empName) {
            setEmpName(`${signUpFname.trim()}'s Agent`);
          }
          setModalStep('create-employee');
        }, 700);
      }, 1000);
    } else {
      // Sign in flow: directly enter workspace
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          router.push('/dashboard');
        }, 1000);
      }, 1100);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'signup') {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setModalStep('create-employee');
        }, 700);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          router.push('/dashboard');
        }, 1000);
      }
    }, 1000);
  };

  // Create AI Employee submit
  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    const finalName = empName.trim() || 'Custom AI Employee';

    setIsEmpLoading(true);

    const newEmp = {
      id: `emp-${Date.now()}`,
      name: finalName,
      role: empRole,
      avatar: selectedAvatar,
      status: 'Active',
      agents: [
        {
          id: `ag-${Date.now()}-1`,
          name: `${finalName} Task Dispatcher`,
          trigger: 'Automated Event Trigger',
          status: 'Running',
          executions: '1'
        }
      ]
    };

    setTimeout(() => {
      setIsEmpLoading(false);
      setIsEmpSuccess(true);

      try {
        localStorage.setItem('lolo_new_employee', JSON.stringify(newEmp));
        const customEmpsStr = localStorage.getItem('lolo_custom_employees');
        const existing = customEmpsStr ? JSON.parse(customEmpsStr) : [];
        if (!existing.some(e => e.id === newEmp.id)) {
          localStorage.setItem('lolo_custom_employees', JSON.stringify([newEmp, ...existing]));
        }
        localStorage.setItem('lolo_active_nav', 'ai-employees');
      } catch (err) {
        console.error('Failed to store new AI employee:', err);
      }

      // Transition to AI Employees section in dashboard
      setTimeout(() => {
        setIsEmpSuccess(false);
        onClose();
        router.push('/dashboard?nav=ai-employees');
      }, 850);
    }, 1100);
  };

  const handleSkipEmployee = () => {
    try {
      localStorage.setItem('lolo_active_nav', 'ai-employees');
    } catch (err) {}
    onClose();
    router.push('/dashboard?nav=ai-employees');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-0"
          />

          {/* Main Modal Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[1080px] glass-panel rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)] my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 z-30 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-dark-pink/40 transition-all duration-300 group cursor-pointer"
            >
              <i className="ph-bold ph-x text-base group-hover:rotate-90 transition-transform duration-300"></i>
            </button>

            {/* Ambient Background Glow Blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[450px] h-[450px] bg-dark-pink/15 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* Layout container with Framer Motion layout swap animation */}
            <motion.div
              layout
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:flex-row relative z-10 min-h-[640px] w-full ${
                modalStep === 'create-employee'
                  ? 'lg:flex-row'
                  : activeTab === 'signup'
                  ? 'lg:flex-row-reverse'
                  : 'lg:flex-row'
              }`}
            >
              
              {/* Visual Branding Panel */}
              <motion.div
                layout
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden lg:flex w-1/2 p-12 flex-col justify-between relative bg-black/40 ${
                  modalStep === 'create-employee'
                    ? 'border-r border-white/10'
                    : activeTab === 'signup'
                    ? 'border-l border-white/10'
                    : 'border-r border-white/10'
                }`}
              >
                
                {/* Logo area */}
                <div className="flex items-center gap-3 z-10">
                  <span className="font-bold text-xl tracking-tight text-white">
                    LoLo<span className="text-dark-pink font-mono text-base font-normal">.AI</span>
                  </span>
                </div>

                {/* Typography & Messaging */}
                <AnimatePresence mode="wait">
                  {modalStep === 'create-employee' ? (
                    <motion.div
                      key="employee-branding"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="z-10 my-auto py-6"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-dark-pink/30 rounded-full bg-dark-pink/10 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-dark-pink animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest-lux uppercase text-dark-pink font-semibold">
                          Step 02 / Autonomous Workforce
                        </span>
                      </div>
                      
                      <h2 className="font-serif text-3xl lg:text-[40px] font-normal leading-[1.12] tracking-tight mb-4 text-white">
                        Deploy your first<br />
                        <span className="text-dark-pink font-light italic">AI employee.</span>
                      </h2>
                      
                      <p className="text-gray-400 font-sans text-sm font-light leading-relaxed max-w-md mb-6">
                        Account verified! Give your autonomous teammate a name, specialty, and neural avatar to begin delegating high-impact workflows 24/7.
                      </p>

                      {/* Live Interactive Preview Card */}
                      <div className="bg-[#141414]/90 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden group">
                        <div className="flex items-center gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={selectedAvatar}
                              alt="Preview Avatar"
                              className="w-14 h-14 rounded-full object-cover border-2 border-dark-pink shadow-[0_0_18px_rgba(216,17,89,0.4)] transition-all duration-300"
                            />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#141414] rounded-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-semibold text-white truncate">
                                {empName.trim() ? `${empName.trim()} Workspace` : 'New Employee'}
                              </h4>
                              <span className="text-[9px] font-mono uppercase bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-0.5 flex items-center gap-1.5">
                              <i className="ph-bold ph-briefcase text-dark-pink text-xs"></i>
                              <span>{empRole}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            1 Autonomous Agent ready
                          </span>
                          <span className="text-gray-500">LoLo Workspace</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="z-10 my-auto py-8"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-dark-pink/30 rounded-full bg-dark-pink/10 backdrop-blur-sm">
                        <span className="text-[10px] font-mono tracking-widest-lux uppercase text-dark-pink font-semibold">
                          {activeTab === 'signin' ? 'Access Granted' : 'Join Ecosystem'}
                        </span>
                      </div>
                      
                      <h2 className="font-serif text-4xl lg:text-[44px] font-normal leading-[1.12] tracking-tight mb-6 text-white">
                        {activeTab === 'signin' ? (
                          <>
                            Elevate your<br />
                            <span className="text-gray-400 font-light italic">digital workspace.</span>
                          </>
                        ) : (
                          <>
                            Empower your<br />
                            <span className="text-dark-pink font-light italic">autonomous agents.</span>
                          </>
                        )}
                      </h2>
                      
                      <p className="text-gray-400 font-sans text-sm font-light leading-relaxed max-w-md mb-6">
                        {activeTab === 'signin'
                          ? 'Enter the ecosystem designed for elite performance, uncompromising security, and seamless autonomous collaboration.'
                          : 'Deploy intelligent workflows, orchestrate cross-app operations 24/7, and scale with SOC2 compliant enterprise security.'}
                      </p>

                      <button
                        type="button"
                        onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                        className="inline-flex items-center gap-2 text-xs font-mono tracking-widest-lux uppercase text-white hover:text-dark-pink transition-colors group cursor-pointer"
                      >
                        <span>{activeTab === 'signin' ? 'Need an account? Create one' : 'Already registered? Sign in'}</span>
                        <i className="ph-bold ph-arrow-right text-dark-pink group-hover:translate-x-1 transition-transform"></i>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Social Proof & Footer */}
                <div className="z-10 flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-[#121212] object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="User avatar"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-[#121212] object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                      alt="User avatar"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-[#121212] object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                      alt="User avatar"
                    />
                  </div>
                  <div className="text-sm font-sans">
                    <span className="text-white font-semibold block">10k+</span>
                    <span className="text-gray-400 font-light text-xs">professionals relying on LoLo AI</span>
                  </div>
                </div>

                {/* Abstract architectural elements inside panel */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,rgba(216,17,89,0.2)_0%,transparent_50%)]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] border-[1px] border-white/10 rounded-full z-0 pointer-events-none" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] border-[1px] border-white/5 rounded-full z-0 pointer-events-none" />
              </motion.div>

              {/* Form Panel */}
              <motion.div
                layout
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative bg-black/60 backdrop-blur-2xl"
              >
                
                <div className="w-full max-w-sm mx-auto">
                  
                  {/* Mobile Logo */}
                  <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                    <span className="font-bold text-xl tracking-tight text-white">
                      LoLo<span className="text-dark-pink font-mono text-sm font-normal">.AI</span>
                    </span>
                  </div>

                  {/* STEP 2: CREATE AI EMPLOYEE VIEW */}
                  {modalStep === 'create-employee' ? (
                    <div>
                      {/* Step Header */}
                      <div className="relative flex items-center justify-between border-b border-white/10 mb-6 pb-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest-lux text-dark-pink font-semibold block">
                            Step 2 of 2
                          </span>
                          <h3 className="text-lg font-medium text-white">Create AI Employee</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                          <i className="ph-bold ph-check text-xs"></i>
                          <span>Account Verified</span>
                        </div>
                      </div>

                      {/* Mobile Preview Thumbnail */}
                      <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl mb-4 lg:hidden">
                        <img
                          src={selectedAvatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border border-dark-pink shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-white truncate">
                            {empName.trim() ? `${empName.trim()} Workspace` : 'New Employee'}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate">{empRole}</div>
                        </div>
                      </div>

                      {/* Employee Success State */}
                      {isEmpSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-16 text-center flex flex-col items-center justify-center space-y-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-dark-pink/20 border border-dark-pink flex items-center justify-center text-dark-pink text-3xl shadow-[0_0_30px_rgba(216,17,89,0.4)]">
                            <i className="ph-bold ph-check"></i>
                          </div>
                          <h3 className="font-serif text-2xl text-white font-normal">
                            AI Employee Deployed
                          </h3>
                          <p className="text-gray-400 font-sans text-xs font-light">
                            Entering AI Employees Workspace for {empName}...
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          onSubmit={handleEmployeeSubmit}
                          className="space-y-4"
                        >
                          {/* AI Employee Name */}
                          <div className="relative group">
                            <input
                              type="text"
                              id="emp-name"
                              value={empName}
                              onChange={(e) => setEmpName(e.target.value)}
                              required
                              placeholder=" "
                              className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300"
                            />
                            <label
                              htmlFor="emp-name"
                              className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                            >
                              AI Employee Name
                            </label>
                            <i className="ph ph-robot absolute right-4 top-4 text-gray-500 text-lg pointer-events-none peer-focus:text-dark-pink transition-colors"></i>
                          </div>

                          {/* Role Selection */}
                          <div className="relative group">
                            <select
                              id="emp-role"
                              value={empRole}
                              onChange={(e) => setEmpRole(e.target.value)}
                              className="peer w-full bg-[#141414] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300 appearance-none cursor-pointer"
                            >
                              {OFFICE_ROLES.map((role) => (
                                <option key={role} value={role} className="bg-[#141414] text-white py-2">
                                  {role}
                                </option>
                              ))}
                            </select>
                            <label
                              htmlFor="emp-role"
                              className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-dark-pink transition-all duration-200 pointer-events-none"
                            >
                              Specialization / Role
                            </label>
                            <i className="ph ph-caret-down absolute right-4 top-4 text-gray-500 text-base pointer-events-none"></i>
                          </div>

                          {/* Avatar Picker */}
                          <div className="pt-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest-lux text-gray-400">
                                Select Neural Avatar
                              </span>
                              <button
                                type="button"
                                onClick={handleShuffleAvatars}
                                className="text-[11px] font-mono text-dark-pink hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <i className="ph ph-arrows-clockwise text-xs"></i>
                                <span>Shuffle</span>
                              </button>
                            </div>
                            <div className="grid grid-cols-6 gap-2 py-1">
                              {visibleAvatars.map((url, idx) => {
                                const isSelected = selectedAvatar === url;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedAvatar(url)}
                                    className={`relative rounded-full transition-all duration-200 cursor-pointer aspect-square ${
                                      isSelected
                                        ? 'ring-2 ring-dark-pink ring-offset-2 ring-offset-black scale-105'
                                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                                    }`}
                                  >
                                    <img
                                      src={url}
                                      alt={`Avatar ${idx + 1}`}
                                      className="w-full h-full rounded-full object-cover border border-white/10"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Autonomous Workflow Provisioning */}
                          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-dark-pink/10 border border-dark-pink/30 flex items-center justify-center text-dark-pink text-base shrink-0">
                              <i className="ph-bold ph-sparkle"></i>
                            </div>
                            <div className="text-left min-w-0 flex-1">
                              <span className="text-xs text-white font-medium block truncate">
                                Auto-Deploy Initial Agent
                              </span>
                              <span className="text-[11px] text-gray-400 leading-tight block truncate">
                                Configures 24/7 autonomous workflow trigger
                              </span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isEmpLoading}
                            className="w-full bg-white text-black font-semibold text-sm tracking-wide py-4 rounded-xl hover:bg-dark-pink hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(216,17,89,0.4)] mt-2"
                          >
                            {isEmpLoading ? (
                              <>
                                <span>Deploying AI Employee</span>
                                <i className="ph-bold ph-spinner animate-spin text-sm"></i>
                              </>
                            ) : (
                              <>
                                <span>Create Employee & Enter Workspace</span>
                                <i className="ph-bold ph-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
                              </>
                            )}
                          </button>

                          {/* Skip Option */}
                          <div className="text-center pt-2">
                            <button
                              type="button"
                              onClick={handleSkipEmployee}
                              className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono tracking-wide cursor-pointer"
                            >
                              Skip for now & enter dashboard →
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </div>
                  ) : (
                    /* STEP 1: AUTH (SIGN IN / CREATE ACCOUNT) */
                    <div>
                      {/* Custom Animated Tabs */}
                      <div className="relative flex items-center justify-between border-b border-white/10 mb-8 pb-3">
                        <button
                          type="button"
                          onClick={() => setActiveTab('signin')}
                          className={`text-lg font-medium tracking-wide transition-colors duration-300 pb-1 relative cursor-pointer ${
                            activeTab === 'signin' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          Sign In
                          {activeTab === 'signin' && (
                            <motion.div
                              layoutId="activeTabIndicator"
                              className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-dark-pink rounded-full shadow-[0_0_12px_rgba(216,17,89,0.8)]"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab('signup')}
                          className={`text-lg font-medium tracking-wide transition-colors duration-300 pb-1 relative cursor-pointer ${
                            activeTab === 'signup' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          Create Account
                          {activeTab === 'signup' && (
                            <motion.div
                              layoutId="activeTabIndicator"
                              className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-dark-pink rounded-full shadow-[0_0_12px_rgba(216,17,89,0.8)]"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>
                      </div>

                      {/* Success State */}
                      {isSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-16 text-center flex flex-col items-center justify-center space-y-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-dark-pink/20 border border-dark-pink flex items-center justify-center text-dark-pink text-3xl shadow-[0_0_30px_rgba(216,17,89,0.4)]">
                            <i className="ph-bold ph-check"></i>
                          </div>
                          <h3 className="font-serif text-2xl text-white font-normal">
                            {activeTab === 'signin' ? 'Welcome Back' : 'Account Created!'}
                          </h3>
                          <p className="text-gray-400 font-sans text-xs font-light">
                            {activeTab === 'signin'
                              ? 'Access granted. Entering your LoLo AI workspace...'
                              : 'Next: Set up your first autonomous AI employee...'}
                          </p>
                        </motion.div>
                      ) : (
                        <>
                          {/* SIGN IN FORM */}
                          {activeTab === 'signin' && (
                            <motion.form
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 15 }}
                              transition={{ duration: 0.3 }}
                              onSubmit={handleSubmit}
                              className="space-y-4"
                            >
                              {/* Email Input */}
                              <div className="relative group">
                                <input
                                  type="email"
                                  id="signin-email"
                                  value={signInEmail}
                                  onChange={(e) => setSignInEmail(e.target.value)}
                                  required
                                  placeholder=" "
                                  autoComplete="email"
                                  className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300"
                                />
                                <label
                                  htmlFor="signin-email"
                                  className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                >
                                  Email Address
                                </label>
                                <i className="ph ph-envelope-simple absolute right-4 top-4 text-gray-500 text-lg pointer-events-none peer-focus:text-dark-pink transition-colors"></i>
                              </div>

                              {/* Password Input */}
                              <div className="relative group">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  id="signin-password"
                                  value={signInPassword}
                                  onChange={(e) => setSignInPassword(e.target.value)}
                                  required
                                  placeholder=" "
                                  autoComplete="current-password"
                                  className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300 pr-12"
                                />
                                <label
                                  htmlFor="signin-password"
                                  className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                >
                                  Password
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                                >
                                  <i className={`ph ph-${showPassword ? 'eye-slash' : 'eye'} text-lg`}></i>
                                </button>
                              </div>

                              {/* Options */}
                              <div className="flex items-center justify-between pt-1 pb-4">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-dark-pink peer-checked:border-dark-pink flex items-center justify-center transition-all duration-200">
                                    {rememberMe && <i className="ph-bold ph-check text-[10px] text-white"></i>}
                                  </div>
                                  <span className="text-xs text-gray-400 font-light group-hover:text-gray-200 transition-colors select-none">
                                    Remember device
                                  </span>
                                </label>
                                
                                <a
                                  href="#recovery"
                                  onClick={(e) => e.preventDefault()}
                                  className="text-xs text-gray-400 hover:text-dark-pink transition-colors font-light hover:underline underline-offset-4"
                                >
                                  Recovery?
                                </a>
                              </div>

                              {/* Submit */}
                              <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-semibold text-sm tracking-wide py-4 rounded-xl hover:bg-dark-pink hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(216,17,89,0.4)]"
                              >
                                {isLoading ? (
                                  <>
                                    <span>Authenticating</span>
                                    <i className="ph-bold ph-spinner animate-spin text-sm"></i>
                                  </>
                                ) : (
                                  <>
                                    <span>Access Dashboard</span>
                                    <i className="ph-bold ph-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
                                  </>
                                )}
                              </button>
                            </motion.form>
                          )}

                          {/* SIGN UP FORM */}
                          {activeTab === 'signup' && (
                            <motion.form
                              initial={{ opacity: 0, x: 15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -15 }}
                              transition={{ duration: 0.3 }}
                              onSubmit={handleSubmit}
                              className="space-y-4"
                            >
                              {/* Name Row */}
                              <div className="flex gap-3">
                                <div className="relative group w-1/2">
                                  <input
                                    type="text"
                                    id="signup-fname"
                                    value={signUpFname}
                                    onChange={(e) => setSignUpFname(e.target.value)}
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300"
                                  />
                                  <label
                                    htmlFor="signup-fname"
                                    className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                  >
                                    First Name
                                  </label>
                                </div>

                                <div className="relative group w-1/2">
                                  <input
                                    type="text"
                                    id="signup-lname"
                                    value={signUpLname}
                                    onChange={(e) => setSignUpLname(e.target.value)}
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300"
                                  />
                                  <label
                                    htmlFor="signup-lname"
                                    className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                  >
                                    Last Name
                                  </label>
                                </div>
                              </div>

                              {/* Work Email */}
                              <div className="relative group">
                                <input
                                  type="email"
                                  id="signup-email"
                                  value={signUpEmail}
                                  onChange={(e) => setSignUpEmail(e.target.value)}
                                  required
                                  placeholder=" "
                                  className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300"
                                />
                                <label
                                  htmlFor="signup-email"
                                  className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                >
                                  Work Email
                                </label>
                              </div>

                              {/* Create Password */}
                              <div className="relative group">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  id="signup-password"
                                  value={signUpPassword}
                                  onChange={(e) => setSignUpPassword(e.target.value)}
                                  required
                                  placeholder=" "
                                  className="peer w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-dark-pink focus:bg-white/[0.05] focus:ring-1 focus:ring-dark-pink/30 transition-all duration-300 pr-12"
                                />
                                <label
                                  htmlFor="signup-password"
                                  className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest-lux text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest-lux peer-focus:text-dark-pink"
                                >
                                  Create Password
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                                >
                                  <i className={`ph ph-${showPassword ? 'eye-slash' : 'eye'} text-lg`}></i>
                                </button>
                              </div>

                              {/* Terms */}
                              <div className="pt-1 pb-4">
                                <label className="flex items-start gap-2.5 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    required
                                    className="sr-only peer"
                                  />
                                  <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-dark-pink peer-checked:border-dark-pink flex items-center justify-center transition-all duration-200 mt-0.5 flex-shrink-0">
                                    {agreeTerms && <i className="ph-bold ph-check text-[10px] text-white"></i>}
                                  </div>
                                  <span className="text-[0.8rem] text-gray-400 leading-tight group-hover:text-gray-300 transition-colors font-light">
                                    I agree to the{' '}
                                    <a href="#terms" onClick={(e) => e.preventDefault()} className="text-white hover:underline">
                                      Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-white hover:underline">
                                      Privacy Policy
                                    </a>
                                    .
                                  </span>
                                </label>
                              </div>

                              {/* Submit */}
                              <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-semibold text-sm tracking-wide py-4 rounded-xl hover:bg-dark-pink hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(216,17,89,0.4)]"
                              >
                                {isLoading ? (
                                  <>
                                    <span>Creating Account</span>
                                    <i className="ph-bold ph-spinner animate-spin text-sm"></i>
                                  </>
                                ) : (
                                  <>
                                    <span>Create Account</span>
                                    <i className="ph-bold ph-sparkle text-base group-hover:rotate-12 transition-transform"></i>
                                  </>
                                )}
                              </button>
                            </motion.form>
                          )}

                          {/* Divider */}
                          <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-white/10" />
                            <span className="px-3 text-xs text-gray-500 uppercase tracking-widest font-mono text-[9px]">
                              Or continue with
                            </span>
                            <div className="flex-grow h-px bg-white/10" />
                          </div>

                          {/* Social Authentication */}
                          <div className="grid grid-cols-3 gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('google')}
                              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer"
                            >
                              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                <path
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  fill="#EA4335"
                                />
                              </svg>
                              <span className="truncate">Google</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSocialLogin('github')}
                              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer"
                            >
                              <i className="ph-fill ph-github-logo text-base flex-shrink-0"></i>
                              <span className="truncate">GitHub</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSocialLogin('apple')}
                              className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer"
                            >
                              <i className="ph-fill ph-apple-logo text-base flex-shrink-0"></i>
                              <span className="truncate">Apple</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
