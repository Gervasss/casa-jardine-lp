"use client";

import React from "react";
import { motion } from "framer-motion";
import { DynamicFrameLayout } from "@/src/ui/dynamic-file";
import styles from "./VideoShowcaseSection.module.css";

const videoFrames = [
  { 
    id: 1, 
    video: "/videos/1.mp4", 
    defaultPos: { x: 0, y: 0, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false,
    corner: "0",           // Adicionado para satisfazer o tipo Frame
    edgeHorizontal: "0",   // Adicionado para satisfazer o tipo Frame
    edgeVertical: "0",     // Adicionado para satisfazer o tipo Frame
    borderThickness: 1,  // Adicionado para satisfazer o tipo Frame
    borderSize: 1        // Adicionado para satisfazer o tipo Frame
  },
  { 
    id: 2, 
    video: "/videos/2.mp4", 
    defaultPos: { x: 4, y: 0, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 3, 
    video: "/videos/3.mp4", 
    defaultPos: { x: 8, y: 0, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 4, 
    video: "/videos/4.mp4", 
    defaultPos: { x: 0, y: 4, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 5, 
    video: "/videos/5.mp4", 
    defaultPos: { x: 4, y: 4, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  }, 
  { 
    id: 6, 
    video: "/videos/6.mp4", 
    defaultPos: { x: 8, y: 4, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 7, 
    video: "/videos/7.mp4", 
    defaultPos: { x: 0, y: 8, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 8, 
    video: "/videos/8.mp4", 
    defaultPos: { x: 4, y: 8, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
  { 
    id: 9, 
    video: "/videos/9.mp4", 
    defaultPos: { x: 8, y: 8, w: 4, h: 4 }, 
    mediaSize: 1, 
    isHovered: false, 
    corner: "0", 
    edgeHorizontal: "0", 
    edgeVertical: "0", 
    borderThickness: 1, 
    borderSize: 1 
  },
];

export default function VideoShowcaseSection() {
  return (
    <section className={styles["section-container"]} id="showcase">
      <motion.header 
        className={styles["text-header"]}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className={styles["tagline"]}>Nossa Essência</span>
        <h2 className={styles["main-title"]}>Isso é <span className={styles["italic"]}>Casa Jardine</span></h2>
      </motion.header>

      <div className={styles["grid-container"]}>
        <div className={styles["grid-wrapper"]}>
          <DynamicFrameLayout
            frames={videoFrames}
            hoverSize={6}
            gapSize={16}
          />
        </div>

        <div className={styles["logo-overlay"]}>
          <img 
            src="/CasaJardine-Marca-Bege.png" 
            alt="Casa Jardine Logo" 
            className={styles["central-logo"]} 
          />
        </div>
      </div>
    </section>
  );
}