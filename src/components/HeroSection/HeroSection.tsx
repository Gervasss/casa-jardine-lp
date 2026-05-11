"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GradientMenu from "@/src/ui/GradientMenu";
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onExplore?: () => void;
}

const HeroSection = ({ onExplore }: HeroSectionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isTransitioning) return;

    const loadTimer = window.setTimeout(() => {
      onExplore?.();
    }, 420);

    const scrollTimer = window.setTimeout(() => {
      document.getElementById('present')?.scrollIntoView({ behavior: 'auto' });
    }, 760);

    const resetTimer = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 1450);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(resetTimer);
    };
  }, [isTransitioning, onExplore]);

  return (
    <section className={styles['hero-container']} id="hero">
      <div
        className={`${styles['transition-loader']} ${isTransitioning ? styles['transition-loader-active'] : ''}`}
        aria-hidden="true"
      >
        <div className={styles['loader-content']}>
          <Image
            src="/optimized/CasaJardine-Marca-Verde-360.webp"
            alt=""
            width={180}
            height={111}
            className={styles['loader-logo']}
          />
          <div className={styles['loader-line']}></div>
        </div>
      </div>

      <nav className={styles['hero-menu-wrapper']}>
        <GradientMenu />
      </nav>

      <div className={styles['hero-bg-wrapper']}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/optimized/hero-768.webp" />
          <source media="(max-width: 1280px)" srcSet="/optimized/hero-1280.webp" />
          <img
            src="/optimized/hero-1920.webp"
            alt=""
            className={styles['hero-bg-image']}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className={styles['hero-content']}>
        <h1 className={styles['hero-title']}>
          Alguns encontros não são apenas eventos. <span className={styles['hero-title-italic']}>São experiências que ficam. </span>
        </h1>

        <p className={styles['hero-description']}>
          Na Casa Jardine, cada detalhe é pensado para que você não apenas celebre, mas sinta, viva e leve esse momento com você.
        </p>

        <button
          className={styles['hero-cta']}
          onClick={() => setIsTransitioning(true)}
        >
          Quero viver essa experiência
        </button>
      </div>

      <div className={styles['hero-scroll-indicator']} aria-hidden="true">
        <div className={styles['mouse-container']}>
          <div className={styles['mouse-wheel']}></div>
        </div>
        <span className={styles['scroll-text']}>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
