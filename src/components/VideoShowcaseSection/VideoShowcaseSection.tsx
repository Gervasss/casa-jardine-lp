"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicFrameLayout } from "@/src/ui/dynamic-file";
import styles from "./VideoShowcaseSection.module.css";
import { MdTouchApp } from "react-icons/md";

gsap.registerPlugin(SplitText, ScrollTrigger);

const videoFrames = [
  { id: 1, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635491/1_zxmmxn.mp4", defaultPos: { x: 0, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 2, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635491/2_xutarq.mp4", defaultPos: { x: 4, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 3, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635488/3_avk1kw.mp4", defaultPos: { x: 8, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 4, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635495/4_d40igg.mp4", defaultPos: { x: 0, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 5, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635489/5_rbgelk.mp4", defaultPos: { x: 4, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 }, 
  { id: 6, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635504/6_ndmwy7.mp4", defaultPos: { x: 8, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 7, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635488/7_jf7smd.mp4", defaultPos: { x: 0, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 8, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635508/8_obcekq.mp4", defaultPos: { x: 4, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
  { id: 9, video: "https://res.cloudinary.com/ddwu6s64v/video/upload/v1774635513/9_g0rd2k.mp4", defaultPos: { x: 8, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false, corner: "0", edgeHorizontal: "0", edgeVertical: "0", borderThickness: 1, borderSize: 1 },
];

export default function VideoShowcaseSection() {
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const logoRef = useRef(null);

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
      }, "-=0.5")

      // 3. Logo Central
      .from(logoRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)"
      }, "-=1.0");

      // Loop de pulsação na logo
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

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
          />
        </div>

        <div ref={logoRef} className={styles["logo-overlay"]}>
          <img 
            src="/CasaJardine-Marca-Bege.png" 
            alt="Casa Jardine Logo" 
            className={styles["central-logo"]} 
          />
        </div>

        <div className={styles["mobile-hint"]}>
          <MdTouchApp className={styles["hint-icon"]} />
          <span>Dê dois Toques nos quadros para interagir</span>
        </div>
      </div>
    </section>
  );
}