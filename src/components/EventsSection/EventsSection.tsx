"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageGallery } from "@/src/ui/carousel-circular-image-gallery";
import { IoCloseOutline, IoArrowForwardOutline } from "react-icons/io5";
import styles from "./EventsSection.module.css";

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
        description: "Evento corporativo para a formatura do ABC da Sacramentinas, proporcionando um ambiente elegante e inspirador para networking, palestras e celebrações empresariais.",
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
        id: "Casamento",
        title: "Casamento",
        description: "Evento especial para casamento, trazendo uma atmosfera romântica e elegante para um dia inesquecível.",
        image: "https://i.postimg.cc/Df5ZX4Wq/Whats-App-Image-2026-01-07-at-18-10-16.jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/Y0XCKTc5/Whats-App-Image-2026-01-07-at-18-10-13.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/GtMmw60f/Whats-App-Image-2026-01-07-at-18-10-13-(1).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/Y0XCKTcJ/Whats-App-Image-2026-01-07-at-18-10-14.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/L5y8KGdG/Whats-App-Image-2026-01-07-at-18-10-14-(1).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/yxf842qt/Whats-App-Image-2026-01-07-at-18-10-14-(2).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/br6wc4cP/Whats-App-Image-2026-01-07-at-18-10-15.jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/6qHpJFJX/Whats-App-Image-2026-01-07-at-18-10-15-(1).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/x8s1DBDS/Whats-App-Image-2026-01-07-at-18-10-15-(2).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/Df5ZX4Wq/Whats-App-Image-2026-01-07-at-18-10-16.jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/Df5ZX4Wq/Whats-App-Image-2026-01-07-at-18-10-16.jpg" },



        ]
    },
    {
        id: "baile de mascara",
        title: "Baile de Máscara - Domínio",
        description: "Evento temático para um baile de máscara, trazendo uma atmosfera misteriosa e divertida para uma noite inesquecível.",
        image: "https://i.postimg.cc/cLdGMXVm/Baile-(20).jpg",
        gallery: [
            { title: "Altar", url: "https://i.postimg.cc/Yq6wWJyk/Baile-(17).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/nhnfY06L/Baile-(18).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/BnJfcMdj/Baile-(19).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/26gfQmDW/Baile-(2).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/cLdGMXVm/Baile-(20).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/3x95L2Tg/Baile-(21).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/L8vKyjp0/Baile-(22).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/cJHqP6x2/Baile-(23).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/SKs0HjQs/Baile-(24).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/cJbqWZ6j/Baile-(25).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/hjkHJrLK/Baile-(26).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/L5jGj1DT/Baile-(27).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/J0jSjkxY/Baile-(28).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/2jWsssYB/Baile-(29).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/TwBXVG6g/Baile-(3).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/nVmyyyxK/Baile-(30).jpg" },
            { title: "Brinde", url: "https://i.postimg.cc/CM83330r/Baile-(31).jpg" },
            { title: "Cerimônia", url: "https://i.postimg.cc/vHdJb08t/Baile-(32).jpg" },
            { title: "Altar", url: "https://i.postimg.cc/Qxr2hfxG/Baile-(33).jpg" },
            { title: "Jardim", url: "https://i.postimg.cc/g2z16rZZ/Baile-(34).jpg" },

        ]
    },
];

export default function EventsSection() {
    const [activeGallery, setActiveGallery] = useState<typeof eventTypes[0] | null>(null);

    return (
        <section className={styles["sectionContainer"]}>
            <div className={styles["header"]}>
                <motion.span
                    className={styles["upperTitle"]}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Experiências Exclusivas
                </motion.span>

                <motion.h2
                    className={styles["mainTitle"]}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Cenários para a sua <br /> <span className={styles["italic"]}>história</span>
                </motion.h2>

                <motion.p
                    className={styles["description"]}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Conheça alguns de nossos eventos mais memoráveis e inspire-se para criar o seu momento único com a Casa Jardine.
                </motion.p>
            </div>

            <div className={styles["grid"]}>
                {eventTypes.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        className={styles["eventCard"]}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                        <div className={styles["cardInner"]}>
                            <div
                                className={styles["imageWrapper"]}
                                onClick={() => setActiveGallery(event)}
                            >
                                <img src={event.image} alt={event.title} />
                                <div className={styles["imageOverlay"]} />
                                <button className={styles["viewMoreBtn"]}>
                                    Explorar Detalhes
                                </button>
                            </div>

                            <div className={styles["cardContent"]}>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div className={styles["cardFooterDecoration"]}>•</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* MODAL DE GALERIA IMERSIVA */}
            <AnimatePresence>
                {activeGallery && (
                    <motion.div
                        className={styles["modalOverlay"]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.button
                            className={styles["closeBtn"]}
                            onClick={() => setActiveGallery(null)}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <IoCloseOutline size={24} /> <span>Fechar</span>
                        </motion.button>

                        <div className={styles["galleryWrapper"]}>
                            <motion.h2
                                className={styles["galleryTitle"]}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {activeGallery["title"]}
                            </motion.h2>

                            <div className={styles["galleryContainer"]}>
                                {/* PASSA AS IMAGENS DO EVENTO SELECIONADO AQUI */}
                                <ImageGallery images={activeGallery["gallery"]} />
                            </div>
                        </div>
                    </motion.div>
                )}
                {/* CTA FINAL */}
                <motion.div
                    className={styles["ctaWrapper"]}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <div className={styles["ctaContent"]}>
                        <p className={styles["ctaText"]}>
                            Cada detalhe é uma nota na melodia da sua celebração. <br />
                            <strong>Vamos compor o seu próximo grande momento?</strong>
                        </p>

                        <motion.button
                            className={styles["ctaButton"]}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open('https://wa.me/SEU_NUMERO', '_blank')}
                        >
                            <span>Solicitar Orçamento Exclusivo</span>
                           
                            <div className={styles["ctaButtonGlow"]} />
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}