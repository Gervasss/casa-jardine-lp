"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import GradientMenu from "@/src/ui/GradientMenu";
import styles from './HeroSection.module.css';

gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const mySplitText = new SplitText(titleRef.current, {
        type: "chars, words",
        charsClass: "char"
      });

      gsap.from(mySplitText.chars, {
        duration: 1.4,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "50% 50% -50",
        ease: "expo.out",
        stagger: 0.04,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleConhecerClick = () => {
    const tl = gsap.timeline();

    // 1. Entrada do Loader: Mais suave com expo.inOut
    tl.to(loaderRef.current, {
      y: "0%",
      duration: 0.9,
      ease: "expo.inOut"
    })
    // 2. Scroll estratégico
    .add(() => {
      const element = document.getElementById('present');
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'auto'
        });
      }
    }, "-=0.2") // Inicia o scroll um pouco antes do loader travar no meio
    // 3. Saída do Loader: Expo.out dá aquele efeito de deslize premium
    .to(loaderRef.current, {
      y: "-100%",
      duration: 1.2,
      delay: 0.2,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(loaderRef.current, { y: "100%" });
      }
    });
  };

  return (
    <section ref={containerRef} className={styles['hero-container']} id="hero">
      <div
        ref={loaderRef}
        className={styles['transition-loader']}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(100%)',
          willChange: 'transform' // Otimização de GPU
        }}
      >
        <div className={styles['loader-content']}>
          <Image
            src="/CasaJardine-Marca-Verde.png"
            alt="Logo Casa Jardine"
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
        <Image
          src="/IMG_3912.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles['hero-bg-image']}
        />
      </div>

      <div className={styles['hero-content']}>
        <h1 ref={titleRef} className={styles['hero-title']}>
          Alguns encontros não são apenas eventos.  <span className={styles['hero-title-italic']}>São experiências que ficam. </span>
        </h1>

        <p className={styles['hero-description']}>
          Na Casa Jardine, cada detalhe é pensado para que você não apenas celebre,  mas sinta, viva e leve esse momento com você. 
        </p>

        <button className={styles['hero-cta']} onClick={handleConhecerClick}>
          Quero viver essa experiência 
        </button>
      </div>

      <div className={styles['hero-scroll-indicator']}>
        <div className={styles['mouse-container']}>
          <div className={styles['mouse-wheel']}></div>
        </div>
        <span className={styles['scroll-text']}>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
