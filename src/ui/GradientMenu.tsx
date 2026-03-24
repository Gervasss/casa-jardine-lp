import React from 'react';
import Image from 'next/image'; 
import { 
  IoHomeOutline, 
  IoVideocamOutline, 
  IoCameraOutline, 
  IoShareSocialOutline, 
  IoHeartOutline 
} from 'react-icons/io5';
import styles from './GradientMenu.module.css'; 

const menuItems = [
  { 
    title: 'Casa Jardine', 
    icon: <Image src="/casaLogo.jpg" alt="Logo" width={44} height={44} className={styles['nav-logo']} />, 
    color1: '#4B5320', 
    color2: '#6B8E23'  
  },
  { title: 'Home', icon: <IoHomeOutline />, color1: '#4B5320', color2: '#6B8E23' },
  { title: 'Video', icon: <IoVideocamOutline />, color1: '#4B5320', color2: '#6B8E23' },
  { title: 'Photo', icon: <IoCameraOutline />, color1: '#4B5320', color2: '#6B8E23' },
  { title: 'Tym', icon: <IoHeartOutline />, color1: '#4B5320', color2: '#6B8E23' }
];

export default function GradientMenu() {
  return (
    <div className={styles['menu-container']}>
      <ul className={styles['menu-list']}>
        {menuItems.map(({ title, icon, color1, color2 }, idx) => (
          <li
            key={idx}
            className={styles['menu-item']}
            style={{ '--clr1': color1, '--clr2': color2 } as React.CSSProperties}
          >
            <span className={styles['menu-bg']}></span>
            <span className={styles['menu-glow']}></span>
            
            <span className={styles['menu-icon']}>
              {icon}
            </span>
            
            <span className={styles['menu-title']}>{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}