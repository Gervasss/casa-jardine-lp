"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ImageZoom } from "@/src/ui/ImageZoom";
import VideoPlayer from "@/src/ui/video-player";
import styles from './PresentationSection.module.css';
import { IoChevronForward } from "react-icons/io5";

const PresentationSection = () => {
    // Variantes para efeito cascata nos textos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Variantes para o badge de experiência
    const badgeVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.8 },
        },
    };

    // Função para abrir o WhatsApp (ajuste o número conforme necessário)
    const handleQuoteClick = () => {
        const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu evento na Casa Jardine.");
        window.open(`https://wa.me/5577999920367?text=${message}`, '_blank');
    };

    return (
        <section className={styles['presentation-container']} id="present">
            {/* PARTE SUPERIOR: MOSAICO E TEXTOS */}
            <motion.div
                className={styles['presentation-wrapper']}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                {/* Lado Esquerdo: Mosaico Bento Grid */}
                <div className={styles['image-mosaic']}>
                    <div className={`${styles['mosaic-item']} ${styles['large']}`}>
                        <ImageZoom src="/IMG_1.jpg" alt="Salão" width={600} height={800} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_7.jpg" alt="Decoração" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_3.jpg" alt="Jardim" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_4.jpg" alt="Detalhes" width={300} height={400} />
                    </div>
                    <div className={`${styles['mosaic-item']} ${styles['medium']}`}>
                        <ImageZoom src="/IMG_3912.jpg" alt="Ambiente" width={400} height={300} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_6.jpg" alt="Entrada" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_3886.jpg" alt="Vista Externa" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_3897.jpg" alt="Iluminação" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_3908.jpg" alt="Arquitetura" width={300} height={400} />
                    </div>
                    <div className={styles['mosaic-item']}>
                        <ImageZoom src="/IMG_5.jpg" alt="Espaço Verde" width={300} height={400} />
                    </div>

                    <motion.div className={styles['experience-badge']} variants={badgeVariants}>
                        <div className={styles['badge-floating-content']}>
                            <span>+4 anos</span>
                            <p>Criando Memórias</p>
                        </div>
                    </motion.div>
                </div>

                {/* Lado Direito: Conteúdo de Texto e Ação */}
                <div className={styles['text-content']}>
                    <motion.span className={styles['upper-title']} variants={itemVariants}>
                        Bem-vindo à Experiência
                    </motion.span>

                    <motion.h2 className={styles['main-title']} variants={itemVariants}>
                        Onde a natureza abraça a sua <span className={styles['italic']}>celebração</span>
                    </motion.h2>

                    <motion.div className={styles['description-block']} variants={itemVariants}>
                        <p>
                            A <strong>Casa Jardine</strong> não é apenas um espaço de eventos em Vitória da Conquista;
                            é um refúgio planejado para transformar sonhos em realidades inesquecíveis.
                        </p>
                        <p>
                            Com uma arquitetura que integra o rústico ao sofisticado, oferecemos um ambiente versátil,
                            perfeito para quem busca exclusividade e a beleza serena de nossos <strong>jardins</strong>.
                        </p>
                        <p>
                            Nossa paixão por criar experiências vai além das nossas paredes.
                            Também <strong>planejamos e organizamos eventos em locais externos</strong>, levando nossa
                            curadoria estética e foco rigoroso em <strong>design e ambientação</strong> para qualquer
                            lugar, garantindo que a essência da Casa Jardine acompanhe o seu projeto onde quer que ele aconteça.
                        </p>
                    </motion.div>

                    <motion.div className={styles['action-row']} variants={itemVariants}>
                        <div className={styles['stats-row']}>
                            <div className={styles['stat-item']}>
                                <h4>400+</h4>
                                <p>Capacidade</p>
                            </div>
                            <div className={styles['stat-divider']}></div>
                            <div className={styles['stat-item']}>
                                <h4>100%</h4>
                                <p>Climatizado</p>
                            </div>
                        </div>

                        <button className={styles['quote-button']} onClick={handleQuoteClick}>
                            Orçar seu evento <IoChevronForward />
                        </button>
                    </motion.div>
                </div>
            </motion.div>

         
            <motion.div
                className={styles['video-section']}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className={styles['video-header']}>
                    <h3 className={styles['video-title']}>Conheça nosso Ambiente</h3>
                    <p className={styles['video-subtitle']}>Sinta a atmosfera da Casa Jardine através de um tour exclusivo</p>
                </div>

                <div className={styles['video-container']}>
                    <VideoPlayer
                        src="/casa-jardine.mp4"

                    />
                </div>
            </motion.div>
        </section>
    );
};

export default PresentationSection;