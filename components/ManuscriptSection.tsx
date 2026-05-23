"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Contact Data ─────────────────────────────────────────────────────────── */
const CONTACTS = [
  {
    label: "WhatsApp",
    value: "+55 (47) 98919-2263",
    href: "https://wa.me/5547989192263",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
  {
    label: "E-mail",
    value: "madu.oficial@outlook.com",
    href: "mailto:madu.oficial@outlook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

/* ─── Custom Hook: Scroll Progress ─────────────────────────────────────────── */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        const start = windowH;
        const end = windowH * 0.6;
        const current = rect.top;
        const raw = 1 - (current - end) / (start - end);
        setProgress(Math.max(0, Math.min(1, raw)));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function ManuscriptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Animation phases
  const manuscriptReveal = Math.max(0, Math.min(1, progress * 1.5));
  const textReveal = Math.max(0, Math.min(1, (progress - 0.1) * 1.5));
  const contactReveal = Math.max(0, Math.min(1, (progress - 0.2) * 1.8));

  // Manuscript transform
  const manuscriptScale = 0.95 + manuscriptReveal * 0.05;
  const manuscriptOpacity = manuscriptReveal;

  // Ink reveal
  const textOpacity = Math.pow(textReveal, 0.5);
  const textBlur = (1 - textReveal) * 10;
  const textY = (1 - textReveal) * 14;

  // Staggered contacts
  const getContactProgress = useCallback(
    (index: number) => {
      const stagger = index * 0.1;
      return Math.max(0, Math.min(1, (contactReveal - stagger) * 1.5));
    },
    [contactReveal]
  );

  return (
    <section
      ref={sectionRef}
      id="manuscript"
      aria-label="Conexão — Manuscrito contemporâneo"
      style={{
        position: "relative",
        background: "transparent",
        minHeight: "100vh",
        marginTop: "-60vh",
        zIndex: 20,
        pointerEvents: "none", // Let scroll events pass through the empty background
      }}
    >
      {/* Left/Right ambient removed to avoid breaking the global overlapping composition */}

      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "flex-end", // Push it to bottom to overlap
          justifyContent: "flex-start", // Push to left for asymmetry
          padding: "40px clamp(16px, 10vw, 120px)",
          pointerEvents: "none", // Let container be transparent
        }}
      >
        {/* Pointer events auto for actual content */}
        {/* ─── The Manuscript — Horizontal / Landscape ─────────────────── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "960px", // slightly thinner to fit nicely offset
            marginBottom: "10vh",
            opacity: manuscriptOpacity,
            pointerEvents: "auto", // Re-enable clicks here
            transform: `scale(${manuscriptScale}) translateY(${(1 - manuscriptReveal) * 100}px)`,
            transition: "transform 0.1s linear, opacity 0.1s linear",
            willChange: "transform, opacity",
          }}
        >
          {/* Manuscript card — landscape */}
          <div
            style={{
              position: "relative",
              background:
                "linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(12,12,12,0.85) 50%, rgba(5,5,5,0.7) 100%)",
              backdropFilter: "blur(30px)",
              borderRadius: "2px", // Editorial shape
              padding: "clamp(36px, 4vw, 64px) clamp(32px, 5vw, 60px)",
              boxShadow: `
                0 0 0 1px rgba(184,151,90,0.1),
                0 40px 100px -20px rgba(0,0,0,1),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
              overflow: "hidden",
            }}
          >
            {/* Subtle texture */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px 200px",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            />

            {/* Top champagne line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(184,151,90,0.12), transparent)",
              }}
            />

            {/* Bottom champagne line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: "15%",
                right: "15%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(184,151,90,0.08), transparent)",
              }}
            />

            {/* Corner ornaments */}
            {[
              { top: "20px", left: "20px", rotate: "0deg" },
              { top: "20px", right: "20px", rotate: "90deg" },
              { bottom: "20px", right: "20px", rotate: "180deg" },
              { bottom: "20px", left: "20px", rotate: "270deg" },
            ].map((pos, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  ...pos,
                  width: "14px",
                  height: "14px",
                  opacity: 0.1,
                  transform: `rotate(${pos.rotate})`,
                } as React.CSSProperties}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "rgba(184,151,90,0.5)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "100%", background: "rgba(184,151,90,0.5)" }} />
              </div>
            ))}

            {/* ─── CONTENT: Quote on left, Contacts on right ─────────── */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "clamp(32px, 5vw, 72px)",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* LEFT — Main Quote */}
              <div
                style={{
                  flex: "1 1 340px",
                  maxWidth: "500px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {/* Decorative line */}
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.3), transparent)",
                    opacity: textOpacity * 0.5,
                    filter: `blur(${textBlur * 0.3}px)`,
                    transition: "opacity 0.05s linear, filter 0.05s linear",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.4,
                      color: "rgba(240, 240, 240, 0.92)",
                      margin: 0,
                      letterSpacing: "0.01em",
                      opacity: textOpacity,
                      filter: `blur(${textBlur}px)`,
                      transform: `translateY(${textY}px)`,
                      transition: "opacity 0.05s linear, filter 0.05s linear, transform 0.05s linear",
                      willChange: "opacity, filter, transform",
                    }}
                  >
                    Toda criação começa
                    <br />
                    <span style={{ color: "rgba(184, 151, 90, 0.75)" }}>
                      por uma conexão verdadeira.
                    </span>
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                      fontWeight: 300,
                      color: "rgba(240, 240, 240, 0.3)",
                      letterSpacing: "0.02em",
                      margin: 0,
                      opacity: textOpacity,
                      filter: `blur(${textBlur}px)`,
                      transform: `translateY(${textY}px)`,
                      transition: "opacity 0.05s linear, filter 0.05s linear, transform 0.05s linear",
                      willChange: "opacity, filter, transform",
                    }}
                  >
                    Every creation begins with a true connection.
                  </p>
                </div>

                {/* Decorative dot */}
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(184,151,90,0.3)",
                    opacity: textOpacity * 0.5,
                    transition: "opacity 0.05s linear",
                  }}
                />
              </div>

              {/* CENTER — Vertical divider */}
              <div
                style={{
                  width: "1px",
                  height: "160px",
                  background: "linear-gradient(to bottom, transparent, rgba(184,151,90,0.2), transparent)",
                  opacity: textOpacity * 0.8,
                  transition: "opacity 0.1s linear",
                  flexShrink: 0,
                  position: "relative"
                }}
              >
                {/* Animated Light Pulse on Divider */}
                <motion.div 
                  animate={{ 
                    top: ["-10%", "110%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    position: "absolute",
                    left: "-1px",
                    width: "3px",
                    height: "40px",
                    background: "linear-gradient(to bottom, transparent, rgba(184,151,90,0.4), transparent)",
                    filter: "blur(2px)"
                  }}
                />
              </div>

              {/* RIGHT — Contact Items */}
              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "420px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(20px, 3vw, 32px)",
                  alignItems: "flex-start",
                }}
              >
                {CONTACTS.map((contact, index) => {
                  const p = getContactProgress(index);
                  const itemOpacity = Math.pow(p, 0.45);
                  const itemBlur = (1 - p) * 6;
                  const itemY = (1 - p) * 12;

                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === "E-mail" ? undefined : "_blank"}
                      rel={contact.label === "E-mail" ? undefined : "noopener noreferrer"}
                      id={`manuscript-contact-${contact.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        textDecoration: "none",
                        cursor: "pointer",
                        opacity: itemOpacity,
                        filter: `blur(${itemBlur}px)`,
                        transform: `translateY(${itemY}px)`,
                        transition: "opacity 0.05s linear, filter 0.05s linear, transform 0.05s linear, background 0.6s cubic-bezier(0.19,1,0.22,1)",
                        willChange: "opacity, filter, transform",
                        padding: "12px 20px",
                        borderRadius: "4px",
                        width: "100%",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(184,151,90,0.04)";
                        el.style.transform = `translateY(${itemY - 4}px) scale(1.02)`;
                        const label = el.querySelector("[data-contact-label]") as HTMLElement;
                        const value = el.querySelector("[data-contact-value]") as HTMLElement;
                        const icon = el.querySelector("[data-contact-icon]") as HTMLElement;
                        if (label) {
                          label.style.color = "rgba(184,151,90,1)";
                          label.style.letterSpacing = "0.4em";
                        }
                        if (value) value.style.color = "rgba(255,255,255,1)";
                        if (icon) {
                          icon.style.color = "rgba(184,151,90,0.9)";
                          icon.style.transform = "scale(1.1) rotate(-5deg)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "transparent";
                        el.style.transform = `translateY(${itemY}px) scale(1)`;
                        const label = el.querySelector("[data-contact-label]") as HTMLElement;
                        const value = el.querySelector("[data-contact-value]") as HTMLElement;
                        const icon = el.querySelector("[data-contact-icon]") as HTMLElement;
                        if (label) {
                          label.style.color = "rgba(184,151,90,0.5)";
                          label.style.letterSpacing = "0.3em";
                        }
                        if (value) value.style.color = "rgba(240,240,240,0.6)";
                        if (icon) {
                          icon.style.color = "rgba(184,151,90,0.4)";
                          icon.style.transform = "scale(1) rotate(0deg)";
                        }
                      }}
                    >
                      {/* Icon */}
                      <span
                        data-contact-icon
                        style={{
                          color: "rgba(184,151,90,0.4)",
                          transition: "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {contact.icon}
                      </span>

                      {/* Text group */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        {/* Label */}
                        <span
                          data-contact-label
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.65rem",
                            fontWeight: 400,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "rgba(184,151,90,0.5)",
                            transition: "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                          }}
                        >
                          {contact.label}
                        </span>

                        {/* Value */}
                        <span
                          data-contact-value
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            color: "rgba(240,240,240,0.6)",
                            letterSpacing: "0.02em",
                            transition: "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                          }}
                        >
                          {contact.value}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
