"use client";

import React from 'react';
import styles from './ContactSection.module.css';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

type FormState = {
    name: string;
    message: string;
    errors: Record<string, string>;
    submitting: boolean;
    submitted: boolean;
};

const WHATSAPP_NUMBER_E164 = '5577999920367'; // Substitua pelo número real da Casa Jardine
const CITY_QUERY = 'Casa Jardine Vitória da Conquista';

export default function ContactSection() {
    const [state, setState] = React.useState<FormState>({
        name: '',
        message: '',
        errors: {},
        submitting: false,
        submitted: false,
    });

    const handleChange =
        (key: keyof Pick<FormState, 'name' |  'message'>) =>
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

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
            whatsappMessage
        )}`;

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
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CITY_QUERY)}`;

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.header}>
                     <span className={styles.handle}>Contato</span>
                    <h2 className={styles.title}>Vamos planejar seu <span className={styles.italic}>evento</span>?</h2>
                    <p className={styles.subtitle}>Fale conosco para orçamentos, visitas e disponibilidade de datas.</p>
                </div>

                <div className={styles.grid}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label}>Nome Completo</label>
                            <input
                                className={styles.input}
                                placeholder="Como podemos te chamar?"
                                value={state.name}
                                onChange={handleChange('name')}
                            />
                            {!!state.errors?.name && (
                                <p className={styles.error}>{state.errors.name}</p>
                            )}
                        </div>

                        
                        <div className={styles.field}>
                            <label className={styles.label}>Mensagem</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Conte-nos um pouco sobre o seu sonho..."
                                value={state.message}
                                onChange={handleChange('message')}
                            />
                            {!!state.errors?.message && (
                                <p className={styles.error}>{state.errors.message}</p>
                            )}
                        </div>

                        <button
                            className={styles.button}
                            type="submit"
                            disabled={state.submitting}
                        >
                            <span>{state.submitting ? "Enviando..." : "Enviar para o WhatsApp"}</span>
                            <Send className={styles.sendIcon} size={18} />
                        </button>

                        {state.submitted && (
                            <p className={styles.success}>Obrigado! Redirecionando para o WhatsApp...</p>
                        )}
                    </form>

                    <div className={styles.side}>
                        <h3 className={styles.sideTitle}>Canais de Atendimento</h3>

                        <div className={styles.infoRow}>
                            <a className={styles.iconBubble} href={whatsappDirect} target="_blank" rel="noreferrer">
                                <FaWhatsapp className={styles.icon} size={24} />
                            </a>
                            <div className={styles.infoText}>
                                <p>WhatsApp Oficial</p>
                                <p className={styles.infoStrong}>(77) 99992-0367</p>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <a className={styles.iconBubble} href="mailto:contato@casajardine.com.br">
                                <Mail className={styles.icon} size={24} />
                            </a>
                            <div className={styles.infoText}>
                                <p>Email</p>
                                <p className={styles.infoStrong}>contato@casajardine.com.br</p>
                            </div>
                        </div>

                      

                        <div className={styles.socialRow}>
                            <a className={styles.social} href="https://www.instagram.com/casajardinevca/" target="_blank" rel="noreferrer">
                                <BsInstagram className={styles.icon} size={22} />
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