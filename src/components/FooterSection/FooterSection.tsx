"use client";

import Image from 'next/image';
import React from 'react';
import styles from './FooterSection.module.css';
import { BsInstagram } from 'react-icons/bs';

export default function FooterSection() {


    const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className={styles.footer} id="footer">
            <div className={styles.glowContainer}>
                <div className={styles.glowLeft}></div>
                <div className={styles.glowRight}></div>
            </div>

            <div className={`${styles.glass} ${styles.mainContent}`}>
                <div className={styles.brandSide}>
                    <a href="#hero" onClick={(e) => scrollToId(e, "hero")} className={styles.logo}>
                        <span className={styles.logoIcon}>
                            <Image
                                src="/casaLogo1.jpg"
                                alt="Logo Casa Jardine"
                                fill
                                sizes="36px"
                                style={{ borderRadius: "60px", objectFit: "cover" }}
                            />
                        </span>
                        <span className={styles.logoText}>
                            Casa <span className={styles.italic}>Jardine</span>
                        </span>
                    </a>

                    <p className={styles.description}>
                        Criamos <span className={styles.italic}>experiências</span>, não apenas <span className={styles.italic}>eventos</span>.
                    </p>

                    <div className={styles.socials}>
                        <a href="https://www.instagram.com/casajardinevca/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                            <BsInstagram size={24} />
                        </a>
                    </div>
                </div>

                <nav className={styles.navLinks}>
                    <div className={styles.navColumn}>
                        <span className={styles.navTitle}>O Espaço</span>
                        <ul>
                            <li><a href="#hero" onClick={(e) => scrollToId(e, "hero")}>Início</a></li>
                            <li><a href="#present" onClick={(e) => scrollToId(e, "present")}>Conhecer</a></li>
                            <li><a href="#loc" onClick={(e) => scrollToId(e, "loc")}>Localização</a></li>
                            <li><a href="#events" onClick={(e) => scrollToId(e, "events")}>Galeria</a></li>
                        </ul>
                    </div>

                    <div className={styles.navColumn}>
                        <span className={styles.navTitle}>Eventos</span>
                        <ul>
                            <li><a href="#">Casamentos</a></li>
                            <li><a href="#">Aniversários</a></li>
                            <li><a href="#">Corporativos</a></li>
                        </ul>
                    </div>

                    <div className={styles.navColumn}>
                        <span className={styles.navTitle}>Suporte</span>
                        <ul>
                            <li><a href="#contact" onClick={(e) => scrollToId(e, "contact")}>Contato</a></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className={styles.copyright}>
                <span>&copy; {new Date().getFullYear()} Casa Jardine. Todos os direitos reservados.</span>
            </div>
        </footer>
    );
}
