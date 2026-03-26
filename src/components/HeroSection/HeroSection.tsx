import React from 'react';
import GradientMenu from "@/src/ui/GradientMenu";
import styles from './HeroSection.module.css';

const HeroSection = () => {

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles['hero-container']} id="hero">
      <nav className={styles['hero-menu-wrapper']}>
        <GradientMenu />
      </nav>
      <div className={styles['hero-bg-wrapper']}>
        <div className={styles['hero-overlay']}></div>
      </div>
      <div className={styles['hero-content']}>
        <h1 className={styles['hero-title']}>
          Onde seus sonhos encontram o <span className={styles['hero-title-italic']}>cenário perfeito</span>
        </h1>

        <p className={styles['hero-description']}>
          A Casa Jardine oferece sofisticação e natureza para casamentos,
          aniversários, eventos e os momentos mais importantes da sua vida.
        </p>

    
        <button className={styles['hero-cta']} onClick={() => scrollToId('present')}>
          Conhecer 
        </button>
      </div>
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