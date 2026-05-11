"use client"

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../HeroSection/HeroSection';

const PresentationSection = dynamic(() => import('../PresentationSection/PresentationSection'), { ssr: false });
const ProfileSection = dynamic(() => import('../ProfileSection/ProfileSection'), { ssr: false });
const EventsSection = dynamic(() => import('../EventsSection/EventsSection'), { ssr: false });
const InstagramSection = dynamic(() => import('../InstagramSection/InstagramSection'), { ssr: false });
const VideoShowcaseSection = dynamic(() => import('../VideoShowcaseSection/VideoShowcaseSection'), { ssr: false });
const ContactSection = dynamic(() => import('../ContactSection/ContactSection'), { ssr: false });
const LocationSection = dynamic(() => import('../LocalSection/LocalSection'), { ssr: false });
const FooterSection = dynamic(() => import('../FooterSection/FooterSection'), { ssr: false });
const WhatsAppFloat = dynamic(
  () => import('../WhatsappFloat/WhatsappFloat').then((mod) => mod.WhatsAppFloat),
  { ssr: false }
);

const AllSections = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  const loadDeferredSections = useCallback(() => {
    setShowDeferredSections(true);
  }, []);

  useEffect(() => {
    const events: Array<keyof WindowEventMap> = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

    events.forEach((eventName) => {
      window.addEventListener(eventName, loadDeferredSections, { once: true, passive: true });
    });
    window.addEventListener('load-deferred-sections', loadDeferredSections);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, loadDeferredSections));
      window.removeEventListener('load-deferred-sections', loadDeferredSections);
    };
  }, [loadDeferredSections]);

  useLayoutEffect(() => {
    if (!showDeferredSections) return;

    let cleanupLenis: (() => void) | undefined;
    const setupLenis = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanupLenis = () => {
        lenis.destroy();
        gsap.ticker.remove(raf);
      };
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => void setupLenis(), { timeout: 2200 })
      : window.setTimeout(() => void setupLenis(), 1200);

    return () => {
      cleanupLenis?.();
      if (typeof idleId === "number") {
        window.clearTimeout(idleId);
      } else {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [showDeferredSections]);

  return (
    <div className="page-wrapper">
      <HeroSection onExplore={loadDeferredSections} />
      {showDeferredSections && (
        <>
          <PresentationSection />
          <ProfileSection />
          <EventsSection />
          <InstagramSection />
          <VideoShowcaseSection />
          <ContactSection />
          <LocationSection />
          <FooterSection />
          <WhatsAppFloat />
        </>
      )}
    </div>
  );
};

export default AllSections;
