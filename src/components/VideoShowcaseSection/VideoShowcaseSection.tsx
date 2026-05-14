"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicFrameLayout } from "@/src/ui/dynamic-file";
import styles from "./VideoShowcaseSection.module.css";
import { MdAdsClick, MdTouchApp } from "react-icons/md";

gsap.registerPlugin(SplitText, ScrollTrigger);

const videoFrames = [
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635491/1_zxmmxn.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635491/2_xutarq.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635488/3_avk1kw.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635495/4_d40igg.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635489/5_rbgelk.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635504/6_ndmwy7.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635488/7_jf7smd.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635508/8_obcekq.mp4",
  "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635513/9_g0rd2k.mp4",
].map((video, index) => {
  const id = index + 1;

  return {
    id,
    video,
    poster: `/videos/${id}.png`,
    defaultPos: { x: (index % 3) * 4, y: Math.floor(index / 3) * 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
    corner: "0",
    edgeHorizontal: "0",
    edgeVertical: "0",
    borderThickness: 1,
    borderSize: 1,
  };
});

export default function VideoShowcaseSection() {
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. SplitText aplicado ao título principal
      // Dividimos por chars (letras) para o efeito premium
      const splitTitle = new SplitText(titleRef.current, { 
        type: "chars, words",
        charsClass: "char-item" 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animação de entrada
      tl.from(taglineRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out"
      })
      // Os caracteres do SplitText surgem um a um com um efeito de rotação sutil
      .from(splitTitle.chars, {
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        transformOrigin: "0% 50% -50"
      }, "-=0.3")

      // 2. Animação da Grid de Vídeos
      .from(gridRef.current, {
        opacity: 0,
        scale: 0.98,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles["section-container"]} id="showcase">
      <header className={styles["text-header"]}>
        <span ref={taglineRef} className={styles["tagline"]}>Nossa Essência</span>
        {/* Adicionei uma classe de visibilidade para evitar o Flash Of Unstyled Text */}
        <h2 ref={titleRef} className={styles["main-title"]} style={{ perspective: "1000px" }}>
          Isso é <span className={styles["italic"]}>Casa Jardine</span>
        </h2>
      </header>

      <div ref={gridRef} className={styles["grid-container"]}>
        <div className={styles["grid-wrapper"]}>
          <DynamicFrameLayout
            frames={videoFrames}
            hoverSize={6}
            gapSize={16}
            revealInterval={220}
          />
        </div>

        <div className={styles["logo-overlay"]}>
          <Image
            src="/optimized/CasaJardine-Marca-Bege-640.webp" 
            alt="Casa Jardine Logo" 
            width={320}
            height={197}
            className={styles["central-logo"]} 
          />
        </div>

        <div className={styles["interaction-hint"]}>
          <MdAdsClick className={`${styles["hint-icon"]} ${styles["desktop-icon"]}`} />
          <MdTouchApp className={`${styles["hint-icon"]} ${styles["mobile-icon"]}`} />
          <span className={styles["desktop-hint-text"]}>Passe o mouse nos quadros para interagir</span>
          <span className={styles["mobile-hint-text"]}>Dê dois toques nos quadros para interagir</span>
        </div>
      </div>
    </section>
  );
}
