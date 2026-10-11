"use client";
import { useState } from 'react';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Platform from '@/components/Platform';
import Integrations from '@/components/Integrations';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import MobileLanding from '@/components/mobile/MobileLanding';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');

  const handleOpenAuth = (tab = 'signin') => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  return (
    <>
      <div className="noise-overlay"></div>

      {/* Desktop Landing View (Preserved & Untouched) */}
      <div className="hidden md:block">
        <Hero onOpenAuth={handleOpenAuth} />
        <Timeline />
        <Platform />
        <Integrations />
        <Pricing onOpenAuth={handleOpenAuth} />
        <Footer onOpenAuth={handleOpenAuth} />
      </div>

      {/* Dedicated Mobile Landing Interface (src/components/mobile/) */}
      <div className="block md:hidden">
        <MobileLanding onOpenAuth={handleOpenAuth} />
      </div>
      
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        initialTab={authTab}
      />
    </>
  );
}
