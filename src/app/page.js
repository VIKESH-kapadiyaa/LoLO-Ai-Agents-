import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Platform from '@/components/Platform';
import Integrations from '@/components/Integrations';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Hero />
      <Timeline />
      <Platform />
      <Integrations />
      <Pricing />
      <Footer />
    </>
  );
}
