"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { FaInstagram, FaHeart, FaComment } from "react-icons/fa";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./InstagramSection.module.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

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
    
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const handleRef = useRef(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useLayoutEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            // SplitText para o Título principal
            const splitTitle = new SplitText(titleRef.current, { type: "chars, words" });
            const splitSubtitle = new SplitText(subtitleRef.current, { type: "lines" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animação de entrada dos textos
            tl.from(handleRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.6
            })
            .from(splitTitle.chars, {
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .from(splitSubtitle.lines, {
                opacity: 0,
                y: 20,
                stagger: 0.2,
                duration: 0.8
            }, "-=0.5");

            // Animação dos Cards do Instagram
            // Eles surgem com um efeito de "pop" e uma leve rotação orgânica
            tl.from(cardsRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 60,
                rotate: (i) => (i % 2 === 0 ? -3 : 3), // Roda levemente para lados alternados
                stagger: 0.15,
                duration: 1,
                ease: "expo.out"
            }, "-=0.4");

        }, sectionRef);

        return () => ctx.revert();
    }, [loading]);

    // Mock Data
    useLayoutEffect(() => {
        const mockData: Post[] = [
            { id: "1", mediaUrl: "/inst 1.png", permalink: "#", caption: "A flor mais linda do jardim...", likeCount: 142, commentsCount: 4 },
            { id: "2", mediaUrl: "/inst 2.png", permalink: "#", caption: "Algumas pessoas têm o dom...", likeCount: 144, commentsCount: 5 },
            { id: "3", mediaUrl: "/inst 3.png", permalink: "#", caption: "Quando duas metades reconhecem...", likeCount: 215, commentsCount: 6 },
            { id: "4", mediaUrl: "/inst 4.png", permalink: "#", caption: "Celebrar os 5 aninhos...", likeCount: 110, commentsCount: 8 },
            { id: "5", mediaUrl: "/inst 5.png", permalink: "#", caption: "Luzes acesas, música no ar...", likeCount: 167, commentsCount: 14 },
            { id: "6", mediaUrl: "/inst 6.png", permalink: "#", caption: "Quando não há evento...", likeCount: 189, commentsCount: 4 },
        ];

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
        <section ref={sectionRef} className={styles["container"]} id="instagram">
            <div className={styles["content"]}>
                <header className={styles["header"]}>
                    <span ref={handleRef} className={styles["handle"]}>@casajardinevca</span>
                    <h2 ref={titleRef} className={styles["title"]}>Vibe Casa Jardine</h2>
                    <p ref={subtitleRef} className={styles["subtitle"]}>
                        Acompanhe momentos reais e inspirações em nosso feed oficial.
                    </p>
                </header>

                <div className={styles["grid"]}>
                    {posts.map((post, idx) => (
                        <a
                            key={post.id}
                            ref={(el) => (cardsRef.current[idx] = el)}
                            href={post.permalink}
                            target="_blank"
                            className={styles["post-card"]}
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
                        </a>
                    ))}
                </div>

                <button
                    className={styles["followButton"]}
                    onClick={() => window.open("https://www.instagram.com/casajardinevca", "_blank")}
                >
                    Siga nosso perfil  <FaInstagram />
                </button>
            </div>
        </section>
    );
}