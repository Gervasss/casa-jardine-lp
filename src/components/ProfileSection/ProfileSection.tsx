"use client"

import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from "@/src/ui/profileCard";
import styles from './ProfileSection.module.css';
import { IoCalendarOutline, IoStarOutline, IoRibbonOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

const ProfileSection = () => {
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

  return (
    <section className={styles['founders-container']} id="profile">
      <motion.div 
        className={styles['founders-header']}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className={styles['upper-title']}>Conheça as Mentes</span>
        <h2 className={styles['main-title']}>
          Quem faz a <span className={styles['italic']}>Casa Jardine</span> acontecer
        </h2>
        <p className={styles['description']}>
          Combinamos anos de experiência em hospitalidade e design para criar o cenário perfeito para o seu dia.
        </p>
      </motion.div>

   

      {/* GRID DOS PROFILE CARDS */}
      <div className={styles['cards-grid']}>
        {founders.map((socia, index) => (
          <motion.div
            key={index}
            className={styles['profile-card-wrapper']}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
          >
            <ProfileCard 
              {...socia}
              enableTilt={true}
              enableMobileTilt={true}
              showBehindGradient={false}
            />
          </motion.div>
        ))}
      </div>
      <br></br>

        {/* SEÇÃO DE MÉTRICAS / STATS */}
      <div className={styles['stats-container']}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className={styles['stat-card']}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles['stat-icon']}>{stat.icon}</div>
            <div className={styles['stat-info']}>
              <span className={styles['stat-value']}>{stat.value}</span>
              <span className={styles['stat-label']}>{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProfileSection;