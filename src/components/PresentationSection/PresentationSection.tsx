"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion'; 
import { ImageZoom } from "@/src/ui/ImageZoom";
import VideoPlayer from "@/src/ui/video-player";
import styles from './PresentationSection.module.css';
import { IoChevronForward } from "react-icons/io5";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PresentationSection = () => {
    const videoSectionRef = useRef(null);
    const videoTitleRef = useRef(null);
    const videoSubtitleRef = useRef(null);
    const videoPlayerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: videoSectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(videoTitleRef.current, {
                y: 50, opacity: 0, duration: 1, ease: "power4.out"
            })
            .from(videoSubtitleRef.current, {
                y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
            }, "-=0.6")
            .from(videoPlayerRef.current, {
                scale: 0.9, opacity: 0, duration: 1.2, ease: "back.out(1.2)"
            }, "-=0.4");
        }, videoSectionRef);
        return () => ctx.revert();
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
    };

    // ÁREA DE TEXTO: Fluxo contínuo
    const textContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.7, 
                delayChildren: 1.0 
            }
        }
    };

    // ÁREA DE IMAGENS: Mais lenta (0.5s entre cada foto) e espera o texto terminar
    const imageContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.5, // Imagens aparecem mais devagar uma por uma
                delayChildren: 5.0 
            }
        }
    };

    // SELO: Só aparece por último (com delay somado à galeria)
    const badgeVariants: Variants = {
        hidden: { scale: 0, opacity: 0, rotate: -20 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 10, 
                delay: 8.5 // Delay alto para garantir que seja o Grand Finale
            } 
        },
    };

    // Variantes de parágrafos
    const fadeUp: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
    };

    const fadeRight: Variants = {
        hidden: { x: -40, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
    };

    const fadeLeft: Variants = {
        hidden: { x: 40, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
    };

    const imageVariants: Variants = {
        hidden: { scale: 0.95, opacity: 0, filter: "blur(4px)" },
        visible: { 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)",
            transition: { duration: 1.0, ease: "easeOut" } 
        },
    };

    const titleVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const handleQuoteClick = () => {
        const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para meu evento na Casa Jardine.");
        window.open(`https://wa.me/5577999920367?text=${message}`, '_blank');
    };

    return (
        <section className={styles['presentation-container']} id="present">
            <motion.div
                className={styles['presentation-wrapper']}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                {/* 1. IMAGENS À ESQUERDA */}
                <motion.div className={styles['image-mosaic']} variants={imageContainerVariants}>
                    <motion.div variants={imageVariants} className={`${styles['mosaic-item']} ${styles['large']}`}>
                        <ImageZoom src="/IMG_1.jpg" alt="Salão" width={600} height={800} />
                    </motion.div>
                    {[ "/IMG_7.jpg", "/IMG_3.jpg", "/IMG_4.jpg", "/IMG_3912.jpg", "/IMG_6.jpg", "/IMG_3886.jpg", "/IMG_3897.jpg", "/IMG_3908.jpg", "/IMG_5.jpg" ].map((img, i) => (
                         <motion.div key={i} variants={imageVariants} className={styles['mosaic-item']}>
                            <ImageZoom src={img} alt="Galeria" width={300} height={400} />
                         </motion.div>
                    ))}

                    {/* SELO DE EXPERIÊNCIA (AGUARDA TUDO) */}
                    <motion.div className={styles['experience-badge']} variants={badgeVariants}>
                        <div className={styles['badge-floating-content']}>
                            <span>+4 anos</span>
                            <p>Criando Memórias</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. TEXTO À DIREITA */}
                <motion.div className={styles['text-content']} variants={textContainerVariants}>
                    <motion.span className={styles['upper-title']} variants={titleVariants}>
                        Bem-vindo à Experiência
                    </motion.span>

                    <motion.h2 className={styles['main-title']} variants={titleVariants}>
                        Onde a natureza abraça a sua <span className={styles['italic']}>celebração</span>
                    </motion.h2>

                    <div className={styles['description-block']}>
                        <motion.p variants={fadeUp}>
                            A <strong>Casa Jardine</strong> não é apenas um espaço de eventos em Vitória da Conquista;
                            é um refúgio planejado para transformar sonhos em realidades inesquecíveis.
                        </motion.p>
                        <motion.p variants={fadeRight}>
                            Com uma arquitetura que integra o rústico ao sofisticado, oferecemos um ambiente versátil,
                            perfeito para quem busca exclusividade e a beleza serena de nossos <strong>jardins</strong>.
                        </motion.p>
                        <motion.p variants={fadeLeft}>
                            Nossa paixão por criar experiências vai além das nossas paredes. Tambem planejamos e organizamos eventos em locais externos...
                        </motion.p>

                        <motion.div className={styles['action-row']} variants={fadeUp}>
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
            </motion.div>

            {/* VÍDEO NO FINAL */}
            <div className={styles['video-section']} ref={videoSectionRef}>
                <div className={styles['video-header']}>
                    <h3 className={styles['video-title']} ref={videoTitleRef}>Conheça nosso Ambiente</h3>
                    <p className={styles['video-subtitle']} ref={videoSubtitleRef}>Sinta a atmosfera da Casa Jardine através de um tour exclusivo</p>
                </div>
                <div className={styles['video-container']} ref={videoPlayerRef}>
                    <VideoPlayer src="/casa-jardine.mp4" />
                </div>
            </div>
        </section>
    );
};

export default PresentationSection;