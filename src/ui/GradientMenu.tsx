"use client";

import React from 'react';
import Image from 'next/image';
import styles from './GradientMenu.module.css';
import { IoMdPin } from 'react-icons/io';
import { MdEvent } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { CiPhone } from 'react-icons/ci';

const menuItems = [
  {
    id: 'hero',
    title: 'Início',
    icon: <Image src="/optimized/casaLogo1-96.webp" alt="" width={44} height={44} className={styles['nav-logo']} />,
    color1: '#4B5320',
    color2: '#6B8E23'
  },
  { id: 'loc', title: 'Localização', icon: <IoMdPin />, color1: '#4B5320', color2: '#6B8E23' },
  { id: 'events', title: 'Eventos', icon: <MdEvent />, color1: '#4B5320', color2: '#6B8E23' },
  { id: 'instagram', title: 'Instagram', icon: <FaInstagram />, color1: '#4B5320', color2: '#6B8E23' },
  { id: 'contact', title: 'Contato', icon: <CiPhone />, color1: '#4B5320', color2: '#6B8E23' }
];

export default function GradientMenu() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.dispatchEvent(new Event('load-deferred-sections'));
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <nav className={styles['menu-container']} aria-label="Navegação principal">
      <ul className={styles['menu-list']}>
        {menuItems.map(({ id, title, icon, color1, color2 }) => (
          <li key={id}>
            <button
              type="button"
              className={styles['menu-item']}
              style={{ '--clr1': color1, '--clr2': color2 } as React.CSSProperties}
              onClick={() => scrollToId(id)}
              aria-label={title}
            >
              <span className={styles['menu-bg']} />
              <span className={styles['menu-glow']} />
              <span className={styles['menu-icon']} aria-hidden="true">
                {icon}
              </span>
              <span className={styles['menu-title']}>{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
