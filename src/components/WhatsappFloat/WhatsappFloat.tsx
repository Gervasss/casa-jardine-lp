"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageCircle,
  FiX,
  FiClock,
  FiSend,
} from "react-icons/fi";
import styles from "./whatsapp.module.css";

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const quickMessages = [
    {
      text: "Orçamento para Casamento",
      message:
        "Olá! Gostaria de solicitar um orçamento para realizar meu casamento na Casa Jardine. Vocês poderiam me enviar as opções de pacotes e datas disponíveis?"
    },
    {
      text: "Agendar visita técnica",
      message:
        "Olá! Tenho interesse em conhecer o espaço da Casa Jardine pessoalmente. Quais são os horários disponíveis para uma visita técnica nesta semana?"
    },
    {
      text: "Eventos Corporativos",
      message:
        "Olá! Gostaria de informações sobre a estrutura da Casa Jardine para a realização de um evento corporativo/confraternização. Como funciona a reserva?"
    },
    {
      text: "Ensaio Fotográfico",
      message:
        "Olá! Gostaria de saber se vocês alugam o espaço apenas para ensaios fotográficos (pré-wedding/gestante) e quais seriam os valores e condições."
    }
  ];

  const welcomeMessage =
    "Olá! Seja bem-vindo à Casa Jardine. Como podemos ajudar a tornar o seu momento inesquecível hoje?";

  useEffect(() => {
    if (!isTyping) return;

    const t = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(t);
  }, [isTyping]);

  const sendWhatsAppMessage = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/5577999920367?text=${encoded}`, 
      "_blank"
    );
    setIsOpen(false);
    setCustomMessage("");
  };

  const handleCustomMessage = () => {
    if (customMessage.trim()) sendWhatsAppMessage(customMessage.trim());
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className={styles.header}>
                <div className={styles.headerTop}>
                  <div className={styles.headerLeft}>
                    <div className={styles.avatarWrap}>
                      <Image
                        src="/optimized/casaLogo1-96.webp"
                        alt="Logo Casa Jardine"
                        width={50}
                        height={50}
                        sizes="50px"
                        className={styles.avatar}
                      />
                      <div className={styles.onlineDot} />
                    </div>
                    <div>
                      <h3 className={styles.headerName}>Casa Jardine</h3>
                      <div className={styles.headerStatus}>
                        <FiClock className={styles.statusIcon} />
                        <span>Online • Resposta imediata</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className={styles.closeBtn}
                    aria-label="Fechar"
                  >
                    <FiX className={styles.closeIcon} />
                  </button>
                </div>
              </div>

              <div className={styles.messages}>
                <div className={styles.msgList}>
                  <div className={styles.msgRow}>
                    <div className={styles.msgBubble}>
                      {isTyping ? (
                        <div className={styles.typingDots} aria-label="Digitando">
                          <span className={styles.dot} />
                          <span className={styles.dot} />
                          <span className={styles.dot} />
                        </div>
                      ) : (
                        <>
                          <p className={styles.msgText}>{welcomeMessage}</p>
                          <p className={styles.msgTime}>Agora mesmo</p>
                        </>
                      )}
                    </div>
                  </div>

                  {!isTyping && (
                    <motion.div
                      className={styles.quickWrap}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className={styles.quickLegend}>
                        Selecione o assunto do seu interesse:
                      </p>

                      {quickMessages.map((item, i) => (
                        <motion.button
                          key={i}
                          className={styles.quickBtn}
                          onClick={() => sendWhatsAppMessage(item.message)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <span className={styles.quickText}>{item.text}</span>
                          <div className={styles.quickIconWrap}>
                            <FiMessageCircle className={styles.quickIcon} />
                          </div>
                        </motion.button>
                      ))}

                      <motion.div
                        className={styles.inputBlock}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <p className={styles.inputLegend}>
                          Ou descreva seu evento:
                        </p>
                        <div className={styles.inputRow}>
                          <input
                            className={styles.input}
                            placeholder="Escreva aqui..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleCustomMessage()
                            }
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCustomMessage}
                            className={styles.sendBtn}
                            disabled={!customMessage.trim()}
                          >
                            <FiSend className={styles.sendIcon} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className={styles.footer}>
                WhatsApp • Seg a Sex, 10h às 16:30 • Vitória da Conquista - BA
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsTyping(true);
          setIsOpen(true);
        }}
        className={styles.floatBtn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className={styles.floatIcon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.298-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={styles.floatBadge}
        >
          1
        </motion.div>
      </motion.button>

      <motion.div
        className={styles.pulseBg}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </>
  );
}

export default WhatsAppFloat;
