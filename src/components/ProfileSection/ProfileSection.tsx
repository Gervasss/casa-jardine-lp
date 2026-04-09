"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from "@/src/ui/profileCard";
import styles from './ProfileSection.module.css';
import { IoCalendarOutline, IoStarOutline, IoRibbonOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProfileSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const upperTitleRef = useRef<HTMLSpanElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // Refs para Arrays
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { icon: <IoCalendarOutline />, value: "4+ Anos", label: "de história" },
    { icon: <IoStarOutline />, value: "90+", label: "Sonhos realizados" },
    { icon: <IoRibbonOutline />, value: "100%", label: "Dedicação" },
    { icon: <IoCheckmarkDoneOutline />, value: "Referência", label: "em Conquista" },
  ];

  const founders = [
    {
      name: "Karine Flores",
      handle: "karineoflores",
      title: "Designer de Interiores e Eventos",
      status: "Transformando espaços em cenários inesquecíveis",
      avatarUrl: "/karine.png",
    },
    {
      name: "Daisy Cardoso",
      handle: "daisycardoso.pessoasenegocios",
      title: "Estrategista de Experiências Corporativas",
      status: "Transformando eventos em resultados memoráveis",
      avatarUrl: "/daisy.png",
    }
  ];

  useLayoutEffect(() => {
    // Filtra elementos nulos para garantir que o GSAP receba elementos válidos
    const validCards = cardsRef.current.filter(el => el !== null);
    const validStats = statsRef.current.filter(el => el !== null);

    const ctx = gsap.context(() => {
      const splitUpper = new SplitText(upperTitleRef.current, { type: "chars" });
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
      tl.from(splitUpper.chars, {
        opacity: 0,
        y: 10,
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

      // 2. Animação dos Cards (Efeito colisão suave)
      if (validCards.length >= 2) {
        tl.from(validCards[0], {
          x: -150,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out"
        }, "-=0.6")
        .from(validCards[1], {
          x: 150,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out"
        }, "-=1.0");
      }

      // 3. Badges (Stats) - Corrigido o seletor
      tl.from(validStats, {
        opacity: 0,
        y: 40,
        scale: 0.7,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)",
        clearProps: "all" // Limpa os estilos após a animação para não bugar o hover
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles['founders-container']} id="profile">
      <div className={styles['founders-header']}>
        <span ref={upperTitleRef} className={styles['upper-title']}>
          Conheça as Mentes
        </span>
        <h2 ref={mainTitleRef} className={styles['main-title']}>
          Quem faz a <span className={styles['italic']}>Casa Jardine</span> acontecer
        </h2>
        <p ref={descriptionRef} className={styles['description']}>
          Combinamos anos de experiência em hospitalidade e design para criar o cenário perfeito para o seu dia.
        </p>
      </div>

      <div className={styles['cards-grid']}>
        {founders.map((socia, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={styles['profile-card-wrapper']}
          >
            <ProfileCard 
              {...socia}
              enableTilt={true}
              enableMobileTilt={true}
              showBehindGradient={false}
            />
          </div>
        ))}
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