"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactSection.module.css';
import { Mail, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

gsap.registerPlugin(SplitText, ScrollTrigger);

type FormState = {
    name: string;
    message: string;
    errors: Record<string, string>;
    submitting: boolean;
    submitted: boolean;
};

const WHATSAPP_NUMBER_E164 = '5577999920367';

export default function ContactSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const handleRef = useRef(null);
    const formRef = useRef(null);
    const infoRowsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [state, setState] = React.useState<FormState>({
        name: '',
        message: '',
        errors: {},
        submitting: false,
        submitted: false,
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Criamos o SplitText
            const splitTitle = new SplitText(titleRef.current, { type: "chars, words" });
            const splitSubtitle = new SplitText(subtitleRef.current, { type: "lines" });

            // Escondemos o que vai ser animado ANTES da timeline começar
            gsap.set([handleRef.current, splitTitle.chars, splitSubtitle.lines, formRef.current, infoRowsRef.current], { 
                opacity: 0 
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%", // Dispara um pouco mais tarde
                    toggleActions: "play none none reverse",
                }
            });

            tl.to(handleRef.current, {
                opacity: 1,
                y: 0,
                startAt: { y: -15 }, // Força o ponto de partida
                duration: 0.6
            })
            .to(splitTitle.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                startAt: { y: 40, rotateX: -90 },
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .to(splitSubtitle.lines, {
                opacity: 1,
                y: 0,
                startAt: { y: 20 },
                stagger: 0.1,
                duration: 0.8
            }, "-=0.5")
            .to(formRef.current, {
                opacity: 1,
                x: 0,
                startAt: { x: -40 },
                duration: 1,
                ease: "expo.out"
            }, "-=0.6")
            .to(infoRowsRef.current, {
                opacity: 1,
                x: 0,
                startAt: { x: 40 },
                stagger: 0.15,
                duration: 0.8,
                ease: "expo.out"
            }, "-=0.8");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ... (handleChange, validate e handleSubmit permanecem iguais)
    const handleChange =
        (key: keyof Pick<FormState, 'name' | 'message'>) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            setState((prev) => ({
                ...prev,
                [key]: value,
                errors: { ...prev.errors, [key]: '' },
                submitted: false,
            }));
        };

    const validate = () => {
        const errors: Record<string, string> = {};
        if (!state.name.trim()) errors.name = "Por favor, digite seu nome";
        if (!state.message.trim()) errors.message = "Escreva uma mensagem";
        if (state.message.trim().length < 10) {
            errors.message = "Sua mensagem deve ter pelo menos 10 caracteres";
        }
        return errors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length) {
            setState((prev) => ({ ...prev, errors }));
            return;
        }

        setState((prev) => ({ ...prev, submitting: true }));
        const whatsappMessage = `Olá Casa Jardine!\n\n*Nome:* ${state.name}\n*Mensagem:* ${state.message}`.trim();
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');

        setState({
            name: '',
            message: '',
            errors: {},
            submitting: false,
            submitted: true,
        });
    };

    const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER_E164}`;

    return (
        <section ref={sectionRef} className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span ref={handleRef} className={styles.handle}>Contato</span>
                    <h2 ref={titleRef} className={styles.title} style={{ perspective: "1000px" }}>
                        Vamos planejar seu <span className={styles.italic}>evento</span>?
                    </h2>
                    <p ref={subtitleRef} className={styles.subtitle}>
                        Fale conosco para orçamentos, visitas e disponibilidade de datas.
                    </p>
                </div>

                <div className={styles.grid}>
                    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label}>Nome Completo</label>
                            <input
                                className={styles.input}
                                placeholder="Como podemos te chamar?"
                                value={state.name}
                                onChange={handleChange('name')}
                            />
                            {!!state.errors?.name && <p className={styles.error}>{state.errors.name}</p>}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Mensagem</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Conte-nos um pouco sobre o seu sonho..."
                                value={state.message}
                                onChange={handleChange('message')}
                            />
                            {!!state.errors?.message && <p className={styles.error}>{state.errors.message}</p>}
                        </div>

                        <button className={styles.button} type="submit" disabled={state.submitting}>
                            <span>{state.submitting ? "Enviando..." : "Enviar para o WhatsApp"}</span>
                            <Send className={styles.sendIcon} size={18} />
                        </button>
                    </form>

                    <div className={styles.side}>
                        <h3 className={styles.sideTitle}>Canais de Atendimento</h3>
                        <div ref={(el) => (infoRowsRef.current[0] = el)} className={styles.infoRow}>
                            <a className={styles.iconBubble} href={whatsappDirect} target="_blank" rel="noreferrer">
                                <FaWhatsapp size={24} />
                            </a>
                            <div className={styles.infoText}>
                                <p>WhatsApp Oficial</p>
                                <p className={styles.infoStrong}>(77) 99992-0367</p>
                            </div>
                        </div>
                        <div ref={(el) => (infoRowsRef.current[1] = el)} className={styles.infoRow}>
                            <a className={styles.iconBubble} href="mailto:contato@casajardine.com.br">
                                <Mail size={24} />
                            </a>
                            <div className={styles.infoText}>
                                <p>Email</p>
                                <p className={styles.infoStrong}>contato@casajardine.com.br</p>
                            </div>
                        </div>
                        <div ref={(el) => (infoRowsRef.current[2] = el)} className={styles.socialRow}>
                            <a className={styles.social} href="https://www.instagram.com/casajardinevca/" target="_blank" rel="noreferrer">
                                <BsInstagram size={22} />
                            </a>
                            <div className={styles.infoText}>
                                <p>Instagram</p>
                                <p className={styles.infoStrong}>@casajardinevca</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}