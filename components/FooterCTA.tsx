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

export default function FooterCTA() {
  return (
    <footer
      className="cinema-section relative min-h-screen flex flex-col items-center justify-between px-8 py-24"
      id="enter"
      aria-label="Closing call to action"
    >
      {/* Separador superior fino — linha dourada, sem radial-gradient atrás */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.18), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Central CTA */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 text-center max-w-2xl mx-auto">
        <motion.span
          className="text-label"
          style={{ color: "rgba(184,151,90,0.55)" }}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, margin: "-10%" }}
        >
          Entre na Experiência
          <br /><span style={{ fontSize: "0.45rem", color: "rgba(184,151,90,0.3)", display: "block", marginTop: "4px" }}>Enter the Experience</span>
        </motion.span>

        <motion.h2
          className="text-display"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: "rgba(240,240,240,0.9)", lineHeight: 0.9 }}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.1}
          viewport={{ once: true, margin: "-10%" }}
        >
          Pronto para
          <br />
          <em style={{ color: "rgba(184,151,90,0.8)", fontStyle: "italic" }}>
            sentir a profundidade?
          </em>
          <br />
          <span style={{ fontSize: "1.2rem", color: "rgba(240,240,240,0.3)", display: "block", marginTop: "16px", fontFamily: "var(--font-inter)", letterSpacing: "0.05em", fontStyle: "normal" }}>
            Ready to feel depth?
          </span>
        </motion.h2>

        <motion.div
          className="gold-line"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.2}
          viewport={{ once: true, margin: "-10%" }}
        />

        <motion.p
          className="text-body-cinema"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: true, margin: "-10%" }}
        >
          Uma experiência de luxo em movimento. Feito para aqueles que exigem mais do espaço digital.
          <br /><br />
          <span style={{ fontSize: "0.75rem", color: "rgba(240,240,240,0.25)" }}>
            Luxury motion experience. Crafted for those who demand more from digital space.
          </span>
        </motion.p>

        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.4}
          viewport={{ once: true, margin: "-10%" }}
        >
          <button
            id="cta-enter"
            aria-label="Begin the experience"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 40px",
              border: "1px solid rgba(184,151,90,0.35)",
              background: "transparent",
              color: "rgba(184,151,90,0.8)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,151,90,0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,151,90,0.7)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(184,151,90,1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,151,90,0.35)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(184,151,90,0.8)";
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span>Começar de Novo</span>
              <span style={{ fontSize: "0.55rem", color: "rgba(184,151,90,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "2px" }}>Begin Again</span>
            </div>
            <span style={{ opacity: 0.5 }}>↑</span>
          </button>
        </motion.div>
      </div>

      {/* Footer meta */}
      <div className="w-full flex items-center justify-between pt-16">
        <span className="text-label" style={{ color: "rgba(255,255,255,0.15)" }}>MADU</span>
        <span className="text-label" style={{ color: "rgba(255,255,255,0.1)" }}>
          © {new Date().getFullYear()}
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span className="text-label" style={{ color: "rgba(255,255,255,0.15)" }}>movimento de luxo</span>
          <span className="text-label" style={{ color: "rgba(255,255,255,0.08)", fontSize: "0.5rem" }}>luxury motion</span>
        </div>
      </div>
    </footer>
  );
}
