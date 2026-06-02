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
        padding: "140px 0 160px",
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
          padding: "0 clamp(24px, 6vw, 100px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Grid: photo left (wider), text right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 6vw, 96px)",
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

            {/* Photo container — full aspect ratio 3/4 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(14px)", scale: 0.98 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
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
              {/* Scroll parallax sits inside — image moves within container */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: "-6%",
                  y: imgScrollY,
                }}
              >
                <Image
                  src="/creative_visionary_portrait.png"
                  alt="Madu — Diretora Criativa"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "contrast(1.04) brightness(0.92)",
                  }}
                />
              </motion.div>

              {/* Bottom vignette */}
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

              {/* Light sweep */}
              <motion.div
                animate={{ left: ["-60%", "160%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 7,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "30%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                  transform: "skewX(-18deg)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT: Manifesto ═══ */}
          <motion.div
            style={{
              paddingTop: "clamp(10px, 3vw, 48px)",
              x: textMouseX,
              y: textMouseY,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(24px, 2.5vw, 38px)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8%" }}
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8%" }}
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8%" }}
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
              viewport={{ once: true, margin: "-8%" }}
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

            {/* EN translation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.9 }}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Between classic references and contemporary technology, my
                direction brings digital experiences to life. Every composition
                is born with intention, transparency, and meticulous attention
                to the elements that make a brand unforgettable.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  lineHeight: 1.75,
                  color: "rgba(184,151,90,0.32)",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                There is an invisible line between silence and impact, where
                atmosphere, depth, and sophistication go beyond the obvious.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Full-width Bottom Signature Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 0.6 }}
          style={{
            marginTop: "clamp(80px, 8vw, 140px)",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Subtle line above */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.3), transparent)",
            }}
          />

          <motion.div
            whileHover="hovered"
            style={{
              paddingTop: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              textAlign: "center",
              cursor: "crosshair",
            }}
          >
            {/* Top: Name section */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <motion.span
                variants={{ hovered: { letterSpacing: "0.08em" } }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(24px, 3.5vw, 42px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Maria Eduarda Veiga
              </motion.span>
              <span style={{ fontSize: "12px", color: "rgba(184,151,90,0.6)" }}>
                ·
              </span>
              <motion.span
                variants={{ hovered: { letterSpacing: "0.08em" } }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(24px, 3.5vw, 42px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.9)",
                  fontStyle: "italic",
                }}
              >
                Madu
              </motion.span>
            </div>

            {/* Middle: Elegant Line */}
            <motion.div
              variants={{ hovered: { width: "100%", opacity: 1 } }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              style={{
                width: "60%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.5), transparent)",
                opacity: 0.5,
                marginTop: "4px",
                marginBottom: "4px",
              }}
            />

            {/* Bottom: Subtitle */}
            <motion.span
              variants={{ hovered: { letterSpacing: "0.22em", color: "rgba(184,151,90,1)" } }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(9px, 1.1vw, 12px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(184,151,90,0.7)",
                fontWeight: 300,
              }}
            >
              Posicionamento & Estratégia Digital
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
