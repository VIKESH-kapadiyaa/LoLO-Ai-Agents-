"use client";
import MobileHeader from './MobileHeader';
import MobileHero from './MobileHero';
import MobileEmployees from './MobileEmployees';
import MobileWorkflowTimeline from './MobileWorkflowTimeline';
import MobileIntegrations from './MobileIntegrations';
import MobilePricing from './MobilePricing';
import MobileFooter from './MobileFooter';
import MobileBottomBar from './MobileBottomBar';

export default function MobileLanding({ onOpenAuth }) {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-sans selection:bg-[#FF005C] selection:text-white">
      {/* Sticky Mobile Header */}
      <MobileHeader onOpenAuth={onOpenAuth} />

      {/* Mobile Content Stream */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <MobileHero onOpenAuth={onOpenAuth} />

        {/* AI Employees Workspaces Section */}
        <MobileEmployees onOpenAuth={onOpenAuth} />

        {/* 4-Step Architecture Section */}
        <MobileWorkflowTimeline />

        {/* 130+ Market Integrations Section */}
        <MobileIntegrations onOpenAuth={onOpenAuth} />

        {/* Pricing Section */}
        <MobilePricing onOpenAuth={onOpenAuth} />

        {/* Footer */}
        <MobileFooter onOpenAuth={onOpenAuth} />
      </main>

      {/* Floating Bottom Quick Action Dock */}
      <MobileBottomBar onOpenAuth={onOpenAuth} />
    </div>
  );
}
