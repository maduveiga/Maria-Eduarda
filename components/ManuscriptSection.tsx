"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AtmosphericGlobe from "./AtmosphericGlobe";

/* ─── Contact Data ─────────────────────────────────────────────────────────── */
const CONTACTS = [
  {
    label: "WhatsApp",
    value: "+55 (47) 98919-2263",
    href: "https://wa.me/5547989192263",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: "madu.oficial@outlook.com",
    href: "mailto:madu.oficial@outlook.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    stiffness: 40,
    damping: 20
  });

  // Animation values
  const globeOpacity = useTransform(scrollProgress, [0, 0.2], [0, 1]);
  const globeScale = useTransform(scrollProgress, [0, 0.4], [0.8, 1]);
  const atmosphereOpacity = useTransform(scrollProgress, [0.1, 0.3], [0, 1]);
  
  const textOpacity = useTransform(scrollProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollProgress, [0.3, 0.5], [20, 0]);
  const textBlur = useTransform(scrollProgress, [0.3, 0.5], ["8px", "0px"]);

  const contactContainerOpacity = useTransform(scrollProgress, [0.5, 0.7], [0, 1]);
  const contactY = useTransform(scrollProgress, [0.5, 0.7], [30, 0]);

  return (
    <section
      ref={containerRef}
      id="manuscript"
      style={{
        position: "relative",
        background: "#000000",
        minHeight: "180vh",
        marginTop: "-2px",
        overflow: "hidden",
      }}
    >
      {/* ─── PHASE 1 & 2: THE ATMOSPHERE & GLOBE ─────────────────── */}
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
        <motion.div
          style={{
            opacity: globeOpacity,
            scale: globeScale,
            position: "absolute",
            zIndex: -1,
          }}
        >
          <AtmosphericGlobe 
            width={1000} 
            height={1000} 
            scrollProgress={scrollProgress as any} 
          />
        </motion.div>

        {/* Atmosphere Overlay (Cinematic Glow) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: atmosphereOpacity,
            background: "radial-gradient(circle at 50% 50%, rgba(184,151,90,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* ─── PHASE 3: THE PHRASE (INK REVEAL) ─────────────────── */}
        <div style={{ position: "relative", textAlign: "center", maxWidth: "800px", zIndex: 10, padding: "0 24px" }}>
          <motion.div
            style={{
              opacity: textOpacity,
              filter: textBlur,
              y: textY,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                 lineHeight: 1.2,
                 color: "rgba(255,255,255,1)",
                 margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Toda criação começa
              <br />
              <motion.span
                style={{
                  color: "rgba(184,151,90,0.8)",
                  fontStyle: "italic",
                  display: "inline-block",
                  position: "relative"
                }}
              >
                por uma conexão verdadeira.
                {/* Ink Reveal Simulation Mask */}
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: "0%" }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    background: "#000000",
                    mixBlendMode: "multiply",
                    zIndex: 1
                  }}
                />
              </motion.span>
            </h2>

            <p
              style={{
                marginTop: "24px",
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.7rem, 0.8vw, 0.85rem)",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "rgba(184,151,90,0.4)",
              }}
            >
              Every creation begins with a true connection
            </p>
          </motion.div>

          {/* ─── PHASE 4: CONTACT DATA ─────────────────── */}
          <motion.div
            style={{
              opacity: contactContainerOpacity,
              y: contactY,
              marginTop: "80px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 60px)",
              flexWrap: "wrap",
            }}
          >
            {CONTACTS.map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, color: "rgba(184,151,90,1)" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.5)",
                  transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                <div 
                  style={{ 
                    padding: "15px", 
                    borderRadius: "50%", 
                    border: "1px solid rgba(184,151,90,0.15)",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {contact.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ 
                    display: "block", 
                    fontSize: "9px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.2em", 
                    color: "rgba(184,151,90,0.6)",
                    marginBottom: "4px"
                  }}>
                    {contact.label}
                  </span>
                  <span style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "1.2rem", 
                    fontWeight: 300,
                    color: "inherit"
                  }}>
                    {contact.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Spacer to allow scroll-based progress to complete */}
      <div style={{ height: "80vh" }} />
    </section>
  );
}
