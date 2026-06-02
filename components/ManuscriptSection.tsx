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
    value: "mari4edu.oficial@gmail.com",
    href: "mailto:mari4edu.oficial@gmail.com",
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
    offset: ["start end", "end start"],
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30
  });

  // Animation values - Cinema Narrative (0 to 1.0)
  const globeOpacity = useTransform(scrollProgress, [0, 0.05], [0, 1]);
  const atmosphereOpacity = useTransform(scrollProgress, [0, 0.1], [0, 1]);

  // Phase 1: The Phrase (0.05 to 0.3)
  const textOpacity = useTransform(scrollProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const textY = useTransform(scrollProgress, [0.05, 0.15], [30, 0]);
  const textBlur = useTransform(scrollProgress, [0.05, 0.15], ["10px", "0px"]);

  // Staggered Contacts revealed one by one with the rotation
  const contact1Opacity = useTransform(scrollProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const contact2Opacity = useTransform(scrollProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const contact3Opacity = useTransform(scrollProgress, [0.8, 0.85, 0.95, 1.0], [0, 1, 1, 0]);

  // Responsive logic
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
        minHeight: "800vh", // Deep cinematic narrative
        marginTop: "-2px",
        overflow: "hidden",
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
        }}
      >
        {/* The Globe Background */}
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

        {/* Atmosphere Overlay (Cinematic Glow) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: atmosphereOpacity,
            background: "radial-gradient(circle at 50% 50%, rgba(184,151,90,0.04) 0%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Narrative Flow Container */}
        <div style={{ position: "relative", textAlign: "center", width: "100%", maxWidth: "900px", zIndex: 10 }}>
          
          {/* Phase 1: Intro Text */}
          <motion.div
            style={{
              opacity: textOpacity,
              filter: textBlur,
              y: textY,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "#fff", margin: 0 }}>
              Toda criação começa
              <br />
              <span style={{ color: "rgba(184,151,90,0.8)", fontStyle: "italic" }}>por uma conexão verdadeira.</span>
            </h2>
          </motion.div>

          {/* Phase 2: Sequential Contacts */}
          <div style={{ position: "relative", height: "300px", width: "100%" }}>
            {[
              { ...CONTACTS[0], opacity: contact1Opacity },
              { ...CONTACTS[1], opacity: contact2Opacity },
              { ...CONTACTS[2], opacity: contact3Opacity },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: contact.opacity,
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  textDecoration: "none",
                  pointerEvents: i === 0 ? "auto" : "none", // Avoid overlap click issues
                }}
              >
                <div style={{ padding: "24px", borderRadius: "50%", border: "1px solid rgba(184,151,90,0.25)", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {contact.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", color: "rgba(184,151,90,0.6)", marginBottom: "8px" }}>
                    {contact.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 300, color: "#fff" }}>
                    {contact.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
