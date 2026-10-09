"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (hash && hash.startsWith('#')) {
          e.preventDefault();
          if (hash === '#') {
            lenis.scrollTo(0);
            return;
          }
          
          const target = document.querySelector(hash);
          if (target) {
            lenis.scrollTo(target);
            window.history.pushState(null, '', hash);
          }
        }
      });
    });

    return () => {
      lenis.destroy();
      anchorLinks.forEach(link => {
        // cleanup not strictly necessary on page unmount but good practice
        link.replaceWith(link.cloneNode(true));
      });
    };
  }, []);

  return <>{children}</>;
}
