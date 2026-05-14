"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProfileSection.module.css';
import { IoCalendarOutline, IoLogoInstagram, IoRibbonOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProfileSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const upperTitleRef = useRef<HTMLSpanElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // Refs para Arrays
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const founderProfilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    {
      icon: <IoCalendarOutline />,
      value: "+90 eventos realizados",
      label: "Histórias que passaram por aqui e continuam sendo lembradas",
    },
    {
      icon: <IoCheckmarkDoneOutline />,
      value: "Atuação completa",
      label: "Do planejamento ao dia do evento, tudo acompanhado de perto",
    },
    {
      icon: <IoRibbonOutline />,
      value: "Experiência consolidada",
      label: "Anos construindo confiança em cada detalhe",
    },
  ];

  const foundersImageUrl = "https://i.postimg.cc/qvc1CZdN/Captura-de-Tela-(12).png";

  useLayoutEffect(() => {
    // Filtra elementos nulos para garantir que o GSAP receba elementos válidos
    const validCards = cardsRef.current.filter(el => el !== null);
    const validFounderProfiles = founderProfilesRef.current.filter(el => el !== null);
    const validStats = statsRef.current.filter(el => el !== null);

    const ctx = gsap.context(() => {
      const splitUpper = new SplitText(upperTitleRef.current, { type: "words" });
      const splitMain = new SplitText(mainTitleRef.current, { type: "words, chars" });
      const splitDesc = new SplitText(descriptionRef.current, { type: "lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // 1. Animação dos Textos
      tl.from(splitUpper.words, {
        opacity: 0,
        y: 6,
        stagger: 0.03,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(splitMain.chars, {
        opacity: 0,
        x: -15,
        filter: "blur(5px)",
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .from(splitDesc.lines, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // 2. Animação do card principal
      if (validCards.length) {
        tl.from(validCards, {
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "expo.out"
        }, "-=0.6");
      }

      if (validFounderProfiles.length) {
        tl.from(validFounderProfiles, {
          y: 28,
          opacity: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.15");
      }

      // 3. Badges (Stats) 
      tl.from(validStats, {
        opacity: 0,
        y: 40,
        scale: 0.7,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)",
        clearProps: "all" 
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles['founders-container']} id="profile">
      <div className={styles['founders-header']}>
        <span ref={upperTitleRef} className={styles['upper-title']}>
         Por trás de cada evento, existem escolhas feitas com intenção
        </span>
        <h2 ref={mainTitleRef} className={styles['main-title']}>
          A Casa Jardine é conduzida por quem entende que cada <span className={styles['italic']}>detalhe</span> importa.
        </h2>
        <p ref={descriptionRef} className={styles['description']}>
          Da estética à experiência, tudo é pensado com cuidado, sensibilidade e presença. 
        </p>
      </div>

      <div className={styles['founders-feature']}>
        <div
          ref={(el) => { founderProfilesRef.current[0] = el; }}
          className={`${styles['founder-profile']} ${styles['founder-profile-left']}`}
        >
          <span className={styles['founder-kicker']}>Fundadora</span>
          <h3>Karine Flores</h3>
          <p>Designer de interiores</p>
          <a
            href="https://www.instagram.com/karineoflores"
            target="_blank"
            rel="noreferrer"
            className={styles['founder-instagram']}
          >
            <IoLogoInstagram />
            @karineoflores
          </a>
        </div>

        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className={styles['founder-card']}
        >
          <div className={styles['founder-image-frame']}>
            <Image
              src={foundersImageUrl}
              alt="Karine Flores e Daisy Cardoso"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className={styles['founder-image']}
            />
          </div>
        </div>

        <div
          ref={(el) => { founderProfilesRef.current[1] = el; }}
          className={`${styles['founder-profile']} ${styles['founder-profile-right']}`}
        >
          <span className={styles['founder-kicker']}>Sócia</span>
          <h3>Daisy Cardoso</h3>
          <p>Estrategista de experiências corporativas</p>
          <a
            href="https://www.instagram.com/daisycardoso.pessoasenegocios"
            target="_blank"
            rel="noreferrer"
            className={styles['founder-instagram']}
          >
            <IoLogoInstagram />
            @daisycardoso.pessoasenegocios
          </a>
        </div>
      </div>

      <div className={styles['stats-container']}>
        {stats.map((stat, index) => (
          <div 
            key={index}
            ref={(el) => { statsRef.current[index] = el; }}
            className={styles['stat-card']}
            style={{ opacity: 1 }} // Garante que o container pai não esconda o item
          >
            <div className={styles['stat-icon']}>{stat.icon}</div>
            <div className={styles['stat-info']}>
              <span className={styles['stat-value']}>{stat.value}</span>
              <span className={styles['stat-label']}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileSection;
