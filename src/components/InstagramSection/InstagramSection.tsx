"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
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

const mockPosts: Post[] = [
    { id: "1", mediaUrl: "/optimized/inst-1-520.webp", permalink: "https://www.instagram.com/p/DVjA9zGj_lH/?img_index=1", caption: "A flor mais linda do jardim...", likeCount: 142, commentsCount: 4 },
    { id: "2", mediaUrl: "/optimized/inst-2-520.webp", permalink: "https://www.instagram.com/p/DVrqgiqmq9i/?img_index=1", caption: "Algumas pessoas têm o dom...", likeCount: 144, commentsCount: 5 },
    { id: "3", mediaUrl: "/optimized/inst-3-520.webp", permalink: "https://www.instagram.com/p/DQfrmfcDJpH/", caption: "Quando duas metades reconhecem...", likeCount: 215, commentsCount: 6 },
    { id: "4", mediaUrl: "/optimized/inst-4-520.webp", permalink: "https://www.instagram.com/p/DUMNa5gD1xA/?img_index=1", caption: "Celebrar os 5 aninhos...", likeCount: 110, commentsCount: 8 },
    { id: "5", mediaUrl: "/optimized/inst-5-520.webp", permalink: "https://www.instagram.com/p/DV9A98rDpyX/?img_index=1", caption: "Luzes acesas, música no ar...", likeCount: 167, commentsCount: 14 },
    { id: "6", mediaUrl: "/optimized/inst-6-520.webp", permalink: "https://www.instagram.com/p/DU5t4k3CIRy/", caption: "Quando não há evento...", likeCount: 189, commentsCount: 4 },
];

export default function InstagramSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const handleRef = useRef<HTMLSpanElement | null>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const splitTitle = new SplitText(titleRef.current, { type: "chars, words" });
            const splitSubtitle = new SplitText(subtitleRef.current, { type: "lines" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

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
            }, "-=0.5")
            .from(cardsRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 60,
                rotate: (i) => (i % 2 === 0 ? -3 : 3),
                stagger: 0.15,
                duration: 1,
                ease: "expo.out"
            }, "-=0.4");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles["container"]} id="instagram">
            <div className={styles["content"]}>
                <header className={styles["header"]}>
                    <span ref={handleRef} className={styles["handle"]}>@casajardinevca</span>
                    <h2 ref={titleRef} className={styles["title"]}>O que já foi vivido por aqui </h2>
                    <p ref={subtitleRef} className={styles["subtitle"]}>
                       Cada imagem carrega uma história, um estilo e uma experiência construída com cuidado.
                    </p>
                </header>

                <div className={styles["grid"]}>
                    {mockPosts.map((post, idx) => (
                        <a
                            key={post.id}
                            ref={(el) => {
                                cardsRef.current[idx] = el;
                            }}
                            href={post.permalink}
                            target="_blank"
                            className={styles["post-card"]}
                        >
                            <div className={styles["image-container"]}>
                                <Image
                                    src={post.mediaUrl}
                                    alt={post.caption}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                    className={styles["post-image"]}
                                />
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
