"use client";

import React from 'react';
import Image from 'next/image';
import styles from './LocalSection.module.css';
import { MapPin, Clock3, Navigation } from 'lucide-react';

export default function LocationSection() {
  
  const GOOGLE_MAPS_EXTERNAL_URL = "https://www.google.com/maps/place/Casa+Jardine/@-14.8658877,-40.8279386,17z/data=!3m1!4b1!4m6!3m5!1s0x7463b2a87cf723b:0x4ce508756700b31f!8m2!3d-14.8658929!4d-40.8253637!16s%2Fg%2F11v64zcmj8?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D";

  return (
    <section className={styles.section} id="loc">
      <div className={styles.container}>
        
        <div className={styles.infoSide}>
          <span className={styles.upperTitle}>Onde Estamos</span>
          <h2 className={styles.mainTitle}>Nossa <span className={styles.italic}>Localização</span></h2>
          
          <div className={styles.premiumDetails}>
            <div className={styles.detailItemGlass}>
              <div className={styles.iconBubble}>
                <MapPin className={styles.icon} size={22} />
              </div>
              <div>
                <strong>Vitória da Conquista, BA</strong>
                <p>Avenida Jesiel Norberto, 367</p>
                <small>Consulte o mapa para rotas de acesso</small>
              </div>
            </div>

            <div className={styles.detailItemGlass}>
              <div className={styles.iconBubble}>
                <Clock3 className={styles.icon} size={22} />
              </div>
              <div>
                <strong>Visitas com Agendamento</strong>
                <p>Segunda a Sexta, 08h às 17h</p>
              </div>
            </div>
          </div>

          <a 
            href={GOOGLE_MAPS_EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.premiumGpsButton}
          >
            <span>Traçar Rota no GPS</span>
            <Navigation size={18} />
          </a>
        </div>

        <div className={styles.mapSide}>
          <a 
            href={GOOGLE_MAPS_EXTERNAL_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.mapWrapperPremium}
          >
            <Image 
              src="/mapa.png" 
              alt="Mapa Localização Casa Jardine"
              fill
              style={{ objectFit: 'cover' }}
              className={styles.mapImage}
              priority
            />
            <div className={styles.mapOverlay}>
                <div className={styles.mapBadge}>
                    <MapPin size={20} />
                    <span>Abrir no Google Maps</span>
                </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}