"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AtmosphericGlobe from "./AtmosphericGlobe";

/* ─── Contact Data ─────────────────────────────────────────────────────────── */
const CONTACTS = [
  {
    label: "WhatsApp",
    value: "+55 (47) 98919-2263",
    href: "https://wa.me/5547989192263",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: "madu.oficial@outlook.com",
    href: "mailto:madu.oficial@outlook.com",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 7l-10 7L2 7"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@m4du.oficial",
    href: "https://www.instagram.com/m4du.oficial",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function ManuscriptSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40
  });

  // Animation values - Cinema Timeline
  const globeOpacity = useTransform(scrollProgress, [0, 0.05], [0, 1]);
  const atmosphereOpacity = useTransform(scrollProgress, [0, 0.1], [0, 1]);

  // Phase Granularity (8 Items Flow)
  // Logic: 0.1 to 0.95 range divided for 8 items (~0.1 per item)
  
  const phrase1Opacity = useTransform(scrollProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);
  const phrase2Opacity = useTransform(scrollProgress, [0.22, 0.26, 0.32, 0.36], [0, 1, 1, 0]);
  const waOpacity = useTransform(scrollProgress, [0.36, 0.40, 0.46, 0.50], [0, 1, 1, 0]);
  const phrase3Opacity = useTransform(scrollProgress, [0.50, 0.54, 0.60, 0.64], [0, 1, 1, 0]);
  const igOpacity = useTransform(scrollProgress, [0.64, 0.68, 0.74, 0.78], [0, 1, 1, 0]);
  const phrase4Opacity = useTransform(scrollProgress, [0.78, 0.82, 0.88, 0.92], [0, 1, 1, 0]);
  const mailOpacity = useTransform(scrollProgress, [0.92, 0.94, 0.96, 0.98], [0, 1, 1, 0]);
  
  const ctaOpacity = useTransform(scrollProgress, [0.96, 0.99], [0, 1]);
  const ctaY = useTransform(scrollProgress, [0.96, 0.99], [20, 0]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section
      ref={containerRef}
      id="manuscript"
      style={{
        position: "relative",
        background: "#000000",
        minHeight: "800vh", // Slightly deeper for the new 8-item flow
        marginTop: "-2px",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            opacity: globeOpacity,
            position: "absolute",
            inset: 0,
            zIndex: -1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AtmosphericGlobe 
            width={dimensions.width} 
            height={dimensions.height} 
            scrollProgress={scrollProgress as any} 
          />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: atmosphereOpacity,
            background: "radial-gradient(circle at 50% 50%, rgba(184,151,90,0.08) 0%, transparent 85%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          
          {/* ITEM 1: PHRASE */}
          <motion.div style={{ opacity: phrase1Opacity, textAlign: "center", maxWidth: "900px", position: "absolute", zIndex: 10 }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Toda criação começa<br />
              <span style={{ color: "rgba(184,151,90,0.9)", fontStyle: "italic" }}>por uma conexão verdadeira.</span>
            </h2>
          </motion.div>

          {/* ITEM 2: PHRASE */}
          <motion.div style={{ opacity: phrase2Opacity, textAlign: "center", maxWidth: "900px", position: "absolute", zIndex: 10 }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Escuta antes de<br />
              <span style={{ color: "rgba(184,151,90,0.9)", fontStyle: "italic" }}>estratégia.</span>
            </h2>
          </motion.div>

          {/* ITEM 3: WHATSAPP (SECONDARY) */}
          <motion.a 
            href={CONTACTS[0].href} target="_blank" rel="noopener noreferrer"
            style={{ opacity: waOpacity, position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textDecoration: "none" }}
          >
            <div style={{ padding: "20px", borderRadius: "50%", border: "1px solid rgba(184,151,90,0.2)", background: "rgba(0,0,0,0.3)" }}>
              {CONTACTS[0].icon}
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(184,151,90,0.6)", marginBottom: "8px" }}>{CONTACTS[0].label}</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 300, color: "#fff" }}>{CONTACTS[0].value}</span>
            </div>
          </motion.a>

          {/* ITEM 4: PHRASE */}
          <motion.div style={{ opacity: phrase3Opacity, textAlign: "center", maxWidth: "900px", position: "absolute", zIndex: 10 }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Cada detalhe<br />
              <span style={{ color: "rgba(184,151,90,0.9)", fontStyle: "italic" }}>comunica.</span>
            </h2>
          </motion.div>

          {/* ITEM 5: INSTAGRAM (SECONDARY) */}
          <motion.a 
            href={CONTACTS[2].href} target="_blank" rel="noopener noreferrer"
            style={{ opacity: igOpacity, position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textDecoration: "none" }}
          >
            <div style={{ padding: "20px", borderRadius: "50%", border: "1px solid rgba(184,151,90,0.2)", background: "rgba(0,0,0,0.3)" }}>
              {CONTACTS[2].icon}
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(184,151,90,0.6)", marginBottom: "8px" }}>{CONTACTS[2].label}</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 300, color: "#fff" }}>{CONTACTS[2].value}</span>
            </div>
          </motion.a>

          {/* ITEM 6: PHRASE */}
          <motion.div style={{ opacity: phrase4Opacity, textAlign: "center", maxWidth: "900px", position: "absolute", zIndex: 10 }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Direção antes do<br />
              <span style={{ color: "rgba(184,151,90,0.9)", fontStyle: "italic" }}>movimento.</span>
            </h2>
          </motion.div>

          {/* ITEM 7: E-MAIL (SECONDARY) */}
          <motion.a 
            href={CONTACTS[1].href} target="_blank" rel="noopener noreferrer"
            style={{ opacity: mailOpacity, position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textDecoration: "none" }}
          >
            <div style={{ padding: "20px", borderRadius: "50%", border: "1px solid rgba(184,151,90,0.2)", background: "rgba(0,0,0,0.3)" }}>
              {CONTACTS[1].icon}
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(184,151,90,0.6)", marginBottom: "8px" }}>{CONTACTS[1].label}</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 300, color: "#fff" }}>{CONTACTS[1].value}</span>
            </div>
          </motion.a>

          {/* ITEM 8: CTA FINAL */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              y: ctaY,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px"
            }}
          >
            <motion.a
                href="https://wa.me/5547989192263"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "16px 44px",
                  borderRadius: "40px",
                  background: "linear-gradient(145deg, #111111, #000000)",
                  border: "1px solid rgba(184,151,90,0.4)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                }}
            >
                Iniciar uma conexão com a Madu
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
