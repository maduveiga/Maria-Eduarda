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
  
  // Using "start start" to "end end" ensures the 0-1 range matches the sticky phase perfectly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Very responsive
    damping: 40
  });

  // Animation values - Cinema Timeline
  const globeOpacity = useTransform(scrollProgress, [0, 0.05], [0, 1]);
  const atmosphereOpacity = useTransform(scrollProgress, [0, 0.1], [0, 1]);

  // Phase 1: The Focal Phrase (stays longer)
  const phraseOpacity = useTransform(scrollProgress, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const phraseY = useTransform(scrollProgress, [0.05, 0.15], [30, 0]);

  // Phase 2: Staggered Contacts (Revealed through the long scroll)
  const c1Opacity = useTransform(scrollProgress, [0.48, 0.55, 0.65, 0.70], [0, 1, 1, 0]);
  const c2Opacity = useTransform(scrollProgress, [0.70, 0.77, 0.87, 0.92], [0, 1, 1, 0]);
  const c3Opacity = useTransform(scrollProgress, [0.92, 0.96, 0.99, 1.00], [0, 1, 1, 1]); // Stays till end

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
        minHeight: "700vh", // Deep cinematic scroll depth
        marginTop: "-2px",
        overflow: "visible", // Critical for sticky to work correctly without clipping
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
          overflow: "hidden", // We clip only the sticky div content
        }}
      >
        {/* The Globe */}
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

        {/* Atmosphere Overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: atmosphereOpacity,
            background: "radial-gradient(circle at 50% 50%, rgba(184,151,90,0.08) 0%, transparent 85%)",
            pointerEvents: "none",
          }}
        />

        {/* Content Stages */}
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          
          {/* STAGE 1: Focal Phrase */}
          <motion.div
            style={{
              opacity: phraseOpacity,
              y: phraseY,
              textAlign: "center",
              maxWidth: "900px",
              position: "absolute",
              zIndex: 10
            }}
          >
            <h2 style={{ 
              fontFamily: "var(--font-cormorant)", 
              fontSize: "clamp(2.5rem, 6vw, 5rem)", 
              fontWeight: 300, 
              color: "#fff", 
              margin: 0,
              lineHeight: 1.15,
            }}>
              Toda criação começa
              <br />
              <span style={{ color: "rgba(184,151,90,0.9)", fontStyle: "italic" }}>
                por uma conexão verdadeira.
              </span>
            </h2>
          </motion.div>

          {/* STAGE 2: Contacts Sequential Reveal */}
          <div style={{ position: "absolute", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[
              { ...CONTACTS[0], opacity: c1Opacity },
              { ...CONTACTS[1], opacity: c2Opacity },
              { ...CONTACTS[2], opacity: c3Opacity },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: contact.opacity,
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
                  textDecoration: "none",
                  pointerEvents: "auto",
                }}
              >
                <div style={{ 
                  padding: "24px", 
                  borderRadius: "50%", 
                  border: "1px solid rgba(184,151,90,0.3)", 
                  background: "rgba(0,0,0,0.5)",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                }}>
                  {contact.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ 
                    display: "block", 
                    fontSize: "12px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.5em", 
                    color: "rgba(184,151,90,0.7)", 
                    marginBottom: "12px" 
                  }}>
                    {contact.label}
                  </span>
                  <span style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "clamp(1.8rem, 4vw, 3.2rem)", 
                    fontWeight: 300, 
                    color: "#fff" 
                  }}>
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
