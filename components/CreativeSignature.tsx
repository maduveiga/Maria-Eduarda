"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function CreativeSignature() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  };

  const smoothX = useSpring(mousePos.x, { stiffness: 40, damping: 22 });
  const smoothY = useSpring(mousePos.y, { stiffness: 40, damping: 22 });

  const imgMouseX = useTransform(smoothX, [0, 1], ["-8px", "8px"]);
  const imgMouseY = useTransform(smoothY, [0, 1], ["-6px", "6px"]);
  const textMouseX = useTransform(smoothX, [0, 1], ["5px", "-5px"]);
  const textMouseY = useTransform(smoothY, [0, 1], ["3px", "-3px"]);
  const imgScrollY = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);

  return (
    <section
      ref={containerRef}
      id="vision"
      onMouseMove={handleMouseMove}
      style={{
        background: "#000000",
        padding: "clamp(60px, 10vw, 140px) 0 clamp(80px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,151,90,0.05) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 clamp(20px, 6vw, 100px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Grid: photo left, manifesto right */}
        <div
          className="signature-grid"
          style={{
            display: "grid",
            gap: "clamp(32px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* ═══ LEFT: Portrait ═══ */}
          <motion.div
            style={{
              position: "relative",
              x: imgMouseX,
              y: imgMouseY,
            }}
          >
            {/* Corner accents */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{
                position: "absolute",
                top: "-14px",
                left: "-14px",
                width: "50px",
                height: "50px",
                borderLeft: "1px solid rgba(184,151,90,0.3)",
                borderTop: "1px solid rgba(184,151,90,0.3)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "-14px",
                right: "-14px",
                width: "50px",
                height: "50px",
                borderRight: "1px solid rgba(184,151,90,0.3)",
                borderBottom: "1px solid rgba(184,151,90,0.3)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 2.0, ease: [0.19, 1, 0.22, 1] }}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                overflow: "hidden",
                boxShadow:
                  "0 50px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: "-6%",
                  y: imgScrollY,
                }}
              >
                <Image
                  src="/creative_visionary_portrait.png"
                  alt="Madu"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </motion.div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT: Manifesto ═══ */}
          <motion.div
            style={{
              paddingTop: "clamp(0px, 3vw, 48px)",
              x: textMouseX,
              y: textMouseY,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 2.5vw, 38px)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.1rem, 1.65vw, 1.45rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(215,215,215,0.88)",
                margin: 0,
              }}
            >
              Entre referências clássicas e tecnologia contemporânea, minha
              direção dá vida a{" "}
              <em
                style={{ color: "rgba(255,255,255,1)", fontStyle: "normal" }}
              >
                experiências digitais.
              </em>
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2 }}
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(184,151,90,0.28), transparent)",
                transformOrigin: "left",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.1rem, 1.65vw, 1.45rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(215,215,215,0.88)",
                margin: 0,
              }}
            >
              Cada composição nasce com intenção, transparência e atenção
              minuciosa aos elementos que tornam uma marca inesquecível.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.1rem, 1.65vw, 1.45rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(215,215,215,0.88)",
                margin: 0,
              }}
            >
              Não desenvolvo apenas interfaces.{" "}
              <span style={{ color: "#fff", fontWeight: 400 }}>
                Traduzo essência, conduzo percepção e transformo identidade em
                presença singular.
              </span>
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.65, ease: [0.19, 1, 0.22, 1] }}
              style={{
                margin: "4px 0 0",
                paddingLeft: "22px",
                borderLeft: "1px solid rgba(184,151,90,0.38)",
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "rgba(184,151,90,0.85)",
              }}
            >
              Existe um traço invisível entre o silêncio e o impacto, onde
              atmosfera, profundidade e sofisticação ultrapassam o óbvio.
            </motion.blockquote>
          </motion.div>
        </div>

        {/* ═══ NEW: Literary Signature Block (Full-width centered) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
          style={{
            marginTop: "clamp(60px, 12vw, 140px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 24px)",
            width: "100%"
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.5), transparent)", marginBottom: "8px" }} />
          
          <div className="literary-container" style={{ width: "100%", overflow: "hidden" }}>
             <h3 className="literary-phrase" style={{ 
               fontFamily: "var(--font-cormorant)", 
               fontSize: "clamp(0.9rem, 1.9vw, 2.2rem)", 
               fontWeight: 300, 
               lineHeight: 1.1, 
               color: "rgba(255,255,255,0.95)",
               margin: 0,
               letterSpacing: "0.02em",
               textAlign: "center",
             }}>
               A escrita permanece como uma das origens mais profundas do meu processo criativo.
             </h3>
          </div>
          
          <div className="literary-container" style={{ width: "100%", overflow: "hidden" }}>
             <p className="literary-subphrase" style={{ 
               fontFamily: "var(--font-cormorant)", 
               fontSize: "clamp(0.8rem, 1.3vw, 1.4rem)", 
               fontWeight: 300, 
               fontStyle: "italic",
               lineHeight: 1.2, 
               color: "rgba(184,151,90,0.75)",
               margin: "8px 0 0",
               letterSpacing: "0.01em",
               textAlign: "center",
             }}>
               Parte dessa trajetória foi reconhecida por premiações literárias e iniciativas culturais.
             </p>
          </div>
        </motion.div>

        {/* Signature Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
          style={{
            marginTop: "clamp(60px, 10vw, 140px)",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.2), transparent)" }} />

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              paddingTop: "40px", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: "12px", 
              textAlign: "center",
              cursor: "default"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px, 3.5vw, 42px)", fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>
                Maria Eduarda Veiga
              </span>
              <span style={{ fontSize: "12px", color: "rgba(184,151,90,0.6)" }}>·</span>
              <motion.a 
                href="https://www.instagram.com/m4du.oficial"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontFamily: "var(--font-cormorant)", 
                  fontSize: "clamp(20px, 3.5vw, 42px)", 
                  fontWeight: 300, 
                  color: "rgba(255,255,255,0.9)", 
                  fontStyle: "italic",
                  textDecoration: "none",
                  transition: "color 0.3s ease"
                }}
                whileHover={{ color: "#b8975a" }}
              >
                Madu
              </motion.a>
            </div>
            <div style={{ width: "60px", height: "1px", background: "rgba(184,151,90,0.4)" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(8px, 1.1vw, 12px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(184,151,90,0.7)", fontWeight: 300 }}>
              Posicionamento & Estratégia Digital
            </span>
            <span 
              style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(7px, 0.8vw, 10px)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400, color: "rgba(235, 230, 215, 0.95)" }}
            >
              Estratégia · Conteúdo · Design · Copywriting · Social Media · Desenvolvimento Web · Vídeo · IA Aplicada à Criação
            </span>
          </motion.div>
        </motion.div>
        {/* ─── NEW: Transitional Scroll Indicator (Link to Globe) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
          style={{
            marginTop: "clamp(120px, 18vw, 220px)", // MOVED LOWER
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
            paddingBottom: "100px" // MORE BREATHING ROOM
          }}
        >
          <span style={{ 
            fontFamily: "var(--font-inter)", 
            fontSize: "clamp(8px, 1vw, 10px)", 
            letterSpacing: "0.4em", 
            textTransform: "uppercase", 
            color: "rgba(184,151,90,0.45)",
            fontWeight: 300
          }}>
            Explorar Conexões
          </span>
          
          <div style={{ position: "relative", height: "60px", width: "1px" }}>
            <motion.div 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1px",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(184,151,90,0.5), transparent)"
              }}
            />
            <motion.div 
              animate={{ y: [0, 40, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: "-1px",
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "#b8975a",
                boxShadow: "0 0 10px rgba(184,151,90,0.8)"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
