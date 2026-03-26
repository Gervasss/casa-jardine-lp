"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaHeart, FaComment } from "react-icons/fa";
import styles from "./InstagramSection.module.css";

interface Post {
    id: string;
    mediaUrl: string;
    permalink: string;
    caption: string;
    likeCount: number;
    commentsCount: number;
}

export default function InstagramSection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockData: Post[] = [
            {
                id: "1", mediaUrl: "/inst 1.png", permalink: "https://www.instagram.com/p/DVjA9zGj_lH/?img_index=1",
                caption: " A flor mais linda do jardim foi o tema escolhido para celebrar o primeiro aninho da Maria. Um dia leve, doce e cheio de encanto, como essa fase tão especial da infância. 🌸✨ Cada detalhe foi pensado para traduzir delicadeza, cor e suavidade, criando uma atmosfera acolhedora para celebrar o início de uma história que está apenas começando. 🤍🌿 Maria foi cercada de amor, sorrisos e momentos que ficarão guardados para sempre na memória da família e de todos que estiveram presentes. 🌷💛",
                likeCount: 142, commentsCount: 4
            },
            {
                id: "2", mediaUrl: "/inst 2.png", permalink: "https://www.instagram.com/p/DVrqgiqmq9i/?img_index=1",
                caption: "Algumas pessoas têm o dom de reunir alegria ao redor, e Ludymilla é assim!Seus 44 anos foram celebrados do jeito que combina com ela:",
                likeCount: 144, commentsCount: 5
            },
            {
                id: "3", mediaUrl: "/inst 3.png", permalink: "https://www.instagram.com/p/DQfrmfcDJpH/",
                caption: " “Quando duas metades reconhecem o mesmo brilho” ✨Existe um tipo de encontro que não se explica, se reconhece. 💫",
                likeCount: 215, commentsCount: 6
            },
            {
                id: "4", mediaUrl: "/inst 4.png", permalink: "https://www.instagram.com/p/DUMNa5gD1xA/?img_index=1",
                caption: "Celebrar os 5 aninhos da Sophia foi levar cuidado, afeto e intenção também para fora da Casa Jardine 🌿✨",
                likeCount: 110, commentsCount: 8
            },
            {
                id: "5", mediaUrl: "/inst 5.png", permalink: "https://www.instagram.com/p/DV9A98rDpyX/?img_index=1",
                caption: "Luzes acesas, música no ar… o espetáculo começou para celebrar o primeiro aninho da Liz! 🎪💖",
                likeCount: 167, commentsCount: 14
            },
            {
                id: "6", mediaUrl: "/inst 6.png", permalink: "https://www.instagram.com/p/DU5t4k3CIRy/",
                caption: "Quando não há evento, a Casa Jardine continua acontecendo. É o tempo de observar o espaço com calma,",
                likeCount: 189, commentsCount: 4
            },
        ];

        // Simula um pequeno delay de carregamento para ficar natural
        const timer = setTimeout(() => {
            setPosts(mockData);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={styles["loading-container"]}>
                <div className={styles["loader"]}></div>
            </div>
        );
    }

    return (
        <section className={styles["container"]} id="instagram">
            <div className={styles["content"]}>
                <header className={styles["header"]}>
                    <span className={styles["handle"]}>@casajardinevca</span>
                    <h2 className={styles["title"]}>Vibe Casa Jardine</h2>
                    <p className={styles["subtitle"]}>Acompanhe momentos reais e inspirações em nosso feed oficial.</p>
                </header>

                <div className={styles["grid"]}>
                    {posts.map((post, idx) => (
                        <motion.a
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            className={styles["post-card"]}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles["image-container"]}>
                                <img src={post.mediaUrl} alt={post.caption} />
                                <div className={styles["overlay"]}>
                                    <div className={styles["stats"]}>
                                        <span className={styles["stat-item"]}><FaHeart /> {post.likeCount}</span>
                                        <span className={styles["stat-item"]}><FaComment /> {post.commentsCount}</span>
                                    </div>
                                    <p className={styles["caption"]}>{post.caption.substring(0, 60)}...</p>
                                    <div className={styles["view-on-insta"]}>Ver no Instagram</div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.button
                    className={styles["followButton"]}
                    onClick={() => window.open("https://www.instagram.com/casajardinevca", "_blank")}
                >
                    Siga nosso perfil  <FaInstagram />
                </motion.button>
            </div>
        </section>
    );
}