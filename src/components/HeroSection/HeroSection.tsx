import React from 'react';
import GradientMenu from "@/src/components/ui/GradientMenu";
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles['hero-container']}>
            {/* Navbar Fixa no Topo */}
            <nav className={styles['hero-menu-wrapper']}>
                <GradientMenu />
            </nav>

            {/* Background Image com Overlay */}
            <div className={styles['hero-bg-wrapper']}>
                <div className={styles['hero-overlay']}></div>
            </div>
            {/* Conteúdo Principal (Centralizado) */}
            <div className={styles['hero-content']}>
                <h1 className={styles['hero-title']}>
                    Onde seus sonhos encontram o <span className={styles['hero-title-italic']}>cenário perfeito</span>.
                </h1>

                <p className={styles['hero-description']}>
                    A Casa Jardine oferece sofisticação e natureza para casamentos,
                    aniversários, eventos  e os momentos mais importantes da sua vida.
                </p>
                {/* Call to Action */}
                <button className={styles['hero-cta']}>
                    Conhecer Espaço
                </button>
            </div>

            {/* Efeito de Scroll no rodapé */}
            <div className={styles['hero-scroll-indicator']}>
                <div className={styles['mouse-container']}>
                    <div className={styles['mouse-wheel']}></div>
                </div>
                <span className={styles['scroll-text']}>Scroll</span>
            </div>
        </section>
    );
};

export default HeroSection;