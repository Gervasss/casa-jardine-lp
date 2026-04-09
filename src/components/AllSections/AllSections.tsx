"use client"

import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Imports das Seções
import HeroSection from '../HeroSection/HeroSection';
import PresentationSection from '../PresentationSection/PresentationSection';
import ProfileSection from '../ProfileSection/ProfileSection';
import EventsSection from '../EventsSection/EventsSection';
import InstagramSection from '../InstagramSection/InstagramSection';
import VideoShowcaseSection from '../VideoShowcaseSection/VideoShowcaseSection';
import ContactSection from '../ContactSection/ContactSection';
import LocationSection from '../LocalSection/LocalSection';
import FooterSection from '../FooterSection/FooterSection';
import { WhatsAppFloat } from '../WhatsappFloat/WhatsappFloat';

gsap.registerPlugin(ScrollTrigger);

const AllSections = () => {

  useLayoutEffect(() => {
    // Inicializa o Lenis para o Scroll Suave
    const lenis = new Lenis({
      duration: 3.0, // Duração do scroll (mais alto = mais calmo)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavização
      smoothWheel: true,
      wheelMultiplier: 1, // Sensibilidade
      touchMultiplier: 2,
    });

    // Sincroniza o ScrollTrigger do GSAP com o Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desativa a suavização do ticker do GSAP para evitar conflitos
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="page-wrapper">
      <HeroSection />
      <PresentationSection />
      <ProfileSection />
      <EventsSection />
      <InstagramSection />
      <VideoShowcaseSection />
      <ContactSection />
      <LocationSection />
      <FooterSection />

      <WhatsAppFloat />
    </main>
  );
};

export default AllSections;