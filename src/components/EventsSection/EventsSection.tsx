"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Certifique-se de que o arquivo SplitText está no seu diretório de plugins
import { ImageGallery } from "@/src/ui/carousel-circular-image-gallery";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./EventsSection.module.css";

// Registro do plugin apenas no cliente
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

const eventTypes = [
    {
        id: "1 ANO - MARIA",
        title: "Aniversário de 1 Ano - Maria",
        description: "Celebração encantadora para o primeiro ano de vida da Maria, repleta de momentos mágicos e memórias inesquecíveis.",
        image: "https://i.postimg.cc/MpqWTW5f/099A6400.jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/SNWSkX60/099A6340.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/fTxzD3ct/099A6345.jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/L6z92qtZ/099A6354.jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/bNQypGxn/099A6387.jpg" },
            { title: "Altar", url: "https://i.postimg.cc/wjg6v62T/099A6399.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/52bx0xgq/099A6428.jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/CxSF1F7J/099A6429.jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/g2mYJYsN/099A6435.jpg" },
            { title: "Altar", url: "https://i.postimg.cc/W1T23289/099A6453.jpg" },
            { title: "Altar", url: "https://i.postimg.cc/dVwq1q6S/099A6458.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/CxSF1F7Q/099A6470.jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/kgs7RkYF/099A6547.jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/T30T5ZNc/099A6551.jpg" },
            { title: "Altar", url: "https://i.postimg.cc/2SGCLP92/099A6555.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/dV6JZzNW/099A6564.jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/sgm3GtHN/099A6608.jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/NjDQ2WCV/099A6616.jpg" },
        ]
    },
    {
        id: "10 ANOS - Elis",
        title: "Aniversário de 10 Anos - Elis",
        description: "celebração vibrante para os 10 anos da Elis, repleta de alegria, diversão e momentos inesquecíveis para toda a família.",
        image: "https://i.postimg.cc/rFW1T9ZM/EV-(32).jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/tTMTZLJg/EV-(1).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/6TspznCc/EV-(10).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/NF201p2K/EV-(6).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/XqBvwQBG/EV-(7).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/4yH3zBHv/EV-(8).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/MZn0PwyX/EV-(18).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/dQhRHF8r/EV-(19).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/ZnvqrVvC/EV-(2).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/NGK8Jt1x/EV-(20).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/gc1V17Ds/EV-(23).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/nVN4NWkT/EV-(24).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/3rzXzq1h/EV-(25).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/T2BVBs0f/EV-(26).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/rFW1T9ZM/EV-(32).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/xTHvQPpf/EV-(33).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/fySbxBSS/EV-(5).jpg" },
        ]
    },
    {
        id: "ABC Sacramentinas",
        title: "ABC Sacramentinas",
        description: "Evento corporativo para a formatura do ABC da Sacramentinas, proporcionando um ambiente elegante e inspirador para networking.",
        image: "https://i.postimg.cc/jjv69dgG/Extras-(157).jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/fT0KLsL1/Extras-(150).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/vZrtrv5h/Extras-(151).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/Mp7m7Y1N/Extras-(152).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/L8t3tVjv/Extras-(153).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/y8mymT0b/Extras-(154).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/ZqJFVycY/Extras-(155).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/cJT7j49n/Extras-(156).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/jjv69dgG/Extras-(157).jpg" },
        ]
    },
    {
        id: "ESTIN Inverno",
        title: "ESTIN coleção de Inverno",
        description: "Evento especial para a coleção de inverno da ESTIN, trazendo uma atmosfera elegante e descontraída para uma noite inesquecível.",
        image: "https://i.postimg.cc/WbnMt4VW/Whats-App-Image-2026-03-02-at-09-38-16.jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/650dTQwq/Whats-App-Image-2026-03-02-at-09-38-17.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/xTRKqdYT/Whats-App-Image-2026-03-02-at-09-38-17-(1).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/QxbpVMsN/Whats-App-Image-2026-03-02-at-09-38-17-(2).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/wTVh3BH7/Whats-App-Image-2026-03-02-at-09-38-17-(3).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/WbnMt4VW/Whats-App-Image-2026-03-02-at-09-38-16.jpg" },
        ]
    },
    {
        id: "valeria",
        title: "Aniversário Valéria - 50 anos",
        description: "celebração vibrante para os 50 anos de Valéria, repleta de alegria e momentos inesquecíveis para toda a família.",
        image: "https://i.postimg.cc/Y0tQ4CSL/Val-(329).jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/cJ8R2zjt/Val-(324).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/50dBV3dn/Val-(325).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/yd4mHP4L/Val-(326).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/85QRSHQK/Val-(327).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/MT7yKQq9/Val-(328).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/Y0tQ4CSL/Val-(329).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/j2vPyYWM/Val-(330).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/prPK9LdB/Val-(331).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/zvpKTYLS/Val-(332).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/NGx13mNG/Val-(333).jpg" },
        ]
    },
    {
        id: "antonio",
        title: "Aniversário Antonio - 1 ano",
        description: "Celebração encantadora para o primeiro ano de vida do Antonio, com cenários lúdicos e inesquecíveis.",
        image: "https://i.postimg.cc/Dw3n14TM/Whats-App-Image-2026-01-07-at-18-12-22-(1).jpg",
        gallery: [
            { title: "Foto 1", url: "https://i.postimg.cc/X7CnZcTc/Whats-App-Image-2026-01-07-at-18-12-15.jpg" },
            { title: "Foto 2", url: "https://i.postimg.cc/WbksD6QS/Whats-App-Image-2026-01-07-at-18-12-16.jpg" },
            { title: "Foto 3", url: "https://i.postimg.cc/02w96dLf/Whats-App-Image-2026-01-07-at-18-12-16-(1).jpg" },
            { title: "Foto 4", url: "https://i.postimg.cc/4N9XKbrB/Whats-App-Image-2026-01-07-at-18-12-17.jpg" },
            { title: "Foto 5", url: "https://i.postimg.cc/pXFP9YgC/Whats-App-Image-2026-01-07-at-18-12-17-(1).jpg" },
            { title: "Foto 6", url: "https://i.postimg.cc/x1VnLN2M/Whats-App-Image-2026-01-07-at-18-12-18.jpg" },
            { title: "Foto 7", url: "https://i.postimg.cc/vZwb5xsW/Whats-App-Image-2026-01-07-at-18-12-19.jpg" },
            { title: "Foto 8", url: "https://i.postimg.cc/Bnf42P0N/Whats-App-Image-2026-01-07-at-18-12-20.jpg" },
            { title: "Foto 9", url: "https://i.postimg.cc/nhfpq9JK/Whats-App-Image-2026-01-07-at-18-12-20-(1).jpg" },
            { title: "Foto 10", url: "https://i.postimg.cc/wjYgDRpc/Whats-App-Image-2026-01-07-at-18-12-20-(2).jpg" },
            { title: "Foto 11", url: "https://i.postimg.cc/fRQDYSNC/Whats-App-Image-2026-01-07-at-18-12-20-(3).jpg" },
            { title: "Foto 12", url: "https://i.postimg.cc/2SNrnLDX/Whats-App-Image-2026-01-07-at-18-12-21.jpg" },
            { title: "Foto 13", url: "https://i.postimg.cc/0y1P7Ksc/Whats-App-Image-2026-01-07-at-18-12-21-(1).jpg" },
            { title: "Foto 14", url: "https://i.postimg.cc/8zgNLfSZ/Whats-App-Image-2026-01-07-at-18-12-21-(2).jpg" },
            { title: "Foto 15", url: "https://i.postimg.cc/jSYtynb9/Whats-App-Image-2026-01-07-at-18-12-22.jpg" },
            { title: "Foto 16", url: "https://i.postimg.cc/Dw3n14TM/Whats-App-Image-2026-01-07-at-18-12-22-(1).jpg" },
            { title: "Foto 17", url: "https://i.postimg.cc/mgWB71sn/Whats-App-Image-2026-01-07-at-18-12-22-(2).jpg" },
            { title: "Foto 18", url: "https://i.postimg.cc/dVcwGZYz/Whats-App-Image-2026-01-07-at-18-12-23.jpg" },
            { title: "Foto 19", url: "https://i.postimg.cc/jSYtynbm/Whats-App-Image-2026-01-07-at-18-12-23-(1).jpg" },
            { title: "Foto 20", url: "https://i.postimg.cc/131sDVSx/Whats-App-Image-2026-01-07-at-18-12-23-(2).jpg" },
        ]
    },
];

export default function EventsSection() {
    const [activeGallery, setActiveGallery] = useState<typeof eventTypes[0] | null>(null);
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Refs para SplitText
    const upperTitleRef = useRef<HTMLSpanElement>(null);
    const mainTitleRef = useRef<HTMLHeadingElement>(null);
    const ctaTextRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!scrollRef.current || !triggerRef.current) return;

            const pinWrap = scrollRef.current;
            const container = triggerRef.current;

            // 1. SPLIT TEXT ANIMATIONS
            const splitUpper = new SplitText(upperTitleRef.current, { type: "chars" });
            const splitMain = new SplitText(mainTitleRef.current, { type: "chars, words" });
            const splitCTA = new SplitText(ctaTextRef.current, { type: "lines" });

            // Animação do cabeçalho ao entrar no scroll
            gsap.from(splitUpper.chars, {
                scrollTrigger: {
                    trigger: upperTitleRef.current,
                    start: "top 90%",
                },
                opacity: 0,
                y: 10,
                stagger: 0.05,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(splitMain.chars, {
                scrollTrigger: {
                    trigger: mainTitleRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                rotateX: -90,
                stagger: 0.02,
                duration: 1,
                ease: "back.out(1.7)"
            });

            // 2. HORIZONTAL SCROLL (PIN)
            const getScrollAmount = () => {
                const horizontalWidth = pinWrap.scrollWidth;
                return -(horizontalWidth - window.innerWidth);
            };

            gsap.to(pinWrap, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${pinWrap.scrollWidth - window.innerWidth}`, 
                    pin: true,
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                    pinSpacing: true
                }
            });

            // 3. CTA SPLIT TEXT
            gsap.from(splitCTA.lines, {
                scrollTrigger: {
                    trigger: ctaTextRef.current,
                    start: "top 90%",
                },
                opacity: 0,
                y: 20,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.sectionContainer} id="events">
            
            {/* 1. CABEÇALHO VERTICAL */}
            <div className={styles.header}>
                <span ref={upperTitleRef} className={styles.upperTitle}>
                    Experiências Exclusivas
                </span>

                <h2 ref={mainTitleRef} className={styles.mainTitle}>
                    Cenários para a sua <br /> <span className={styles.italic}>história</span>
                </h2>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    Conheça alguns de nossos eventos mais memoráveis e inspire-se para criar o seu momento único com a Casa Jardine.
                </motion.p>
            </div>

            {/* 2. GALERIA HORIZONTAL */}
            <div ref={triggerRef} className={styles.horizontalWrapper}>
                <div ref={scrollRef} className={styles.horizScrollStrip}>
                    {eventTypes.map((event) => (
                        <div key={event.id} className={styles.eventCardWrapper}>
                            <div className={styles.eventCard} onClick={() => setActiveGallery(event)}>
                                <div className={styles.cardInner}>
                                    <div className={styles.imageWrapper}>
                                        <img src={event.image} alt={event.title} />
                                        <div className={styles.imageOverlay} />
                                        <button className={styles.viewMoreBtn}>
                                            Explorar Detalhes
                                        </button>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className={styles.cardFooterDecoration}>•</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. CTA FINAL */}
            <div className={styles.ctaWrapper}>
                <div className={styles.ctaContent}>
                    <p ref={ctaTextRef} className={styles.ctaText}>
                        Cada detalhe é uma nota na melodia da sua celebração. <br />
                        <strong>Vamos compor o seu próximo grande momento?</strong>
                    </p>

                    <motion.button
                        className={styles.ctaButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        onClick={() => window.open('https://wa.me/5577999920367', '_blank')}
                    >
                        <span>Solicitar Orçamento Exclusivo</span>
                        <div className={styles.ctaButtonGlow} />
                    </motion.button>
                </div>
            </div>

            {/* MODAL DE GALERIA */}
            <AnimatePresence>
                {activeGallery && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={() => setActiveGallery(null)}
                        >
                            <IoCloseOutline size={24} /> <span>Fechar</span>
                        </button>

                        <div className={styles.galleryWrapper}>
                            <h2 className={styles.galleryTitle}>
                                {activeGallery.title}
                            </h2>

                            <div className={styles.galleryContainer}>
                                <ImageGallery images={activeGallery.gallery} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}