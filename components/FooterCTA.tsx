"use client";

import { motion } from "framer-motion";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, delay, ease: [0.19, 1, 0.22, 1] },
  }),
};

/* ─── Icons (SVG) ─────────────────────────────────────────────────────────── */

const Icons = {
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  ),
  TikTok: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  Email: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-10 7L2 7"/>
    </svg>
  ),
};

export default function FooterCTA() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="cinema-section relative flex flex-col items-center bg-black px-8 pt-40 pb-12"
      id="contact"
      aria-label="Footer and Contacts"
    >


      {/* ─── BOTTOM META BAR (From Screenshot) ─── */}
      <div 
        className="w-full flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5"
        style={{ maxWidth: "1600px", margin: "0 auto" }}
      >
        {/* Left: Branding */}
        <div className="flex-1 flex flex-col gap-1 mb-8 md:mb-0">
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, color: "rgba(255,255,255,0.9)" }}>
            Maria Eduarda Veiga
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(184,151,90,0.6)" }}>
            ESTRATEGISTA VISUAL · Posicionamento · Narrativa · Experiências Digitais
          </span>
        </div>

        {/* Center: Small Icons */}
        <div className="flex items-center gap-6 mb-8 md:mb-0">
           <a href="https://www.instagram.com/m4du.oficial" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)" }}>
             <Icons.Instagram />
           </a>
           <a href="https://www.tiktok.com/@mariadudaveiga" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", transform: "scale(0.8)" }}>
             <Icons.TikTok />
           </a>
           <a href="https://wa.me/5547989192263" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)" }}>
             <Icons.WhatsApp />
           </a>
           <a href="mailto:madu.oficial@outlook.com" style={{ color: "rgba(255,255,255,0.3)" }}>
             <Icons.Email />
           </a>
        </div>

        {/* Right: Credits */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-1 text-center md:text-right">
           <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
             © {currentYear} · TODOS OS DIREITOS RESERVADOS
           </span>
           <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
             JOINVILLE - SANTA CATARINA, BRASIL
           </span>
        </div>
      </div>
    </footer>
  );
}
