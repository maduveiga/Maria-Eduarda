"use client";

import { motion } from "framer-motion";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.19, 1, 0.22, 1] },
  }),
};

export default function IntroSection() {
  return (
    <section
      className="cinema-section relative min-h-screen flex items-center justify-center px-8"
      id="intro"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-12">
        <motion.span
          className="text-label"
          style={{ color: "rgba(184,151,90,0.6)" }}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, margin: "-15%" }}
        >
          A Experiência
          <br /><span style={{ fontSize: "0.45rem", color: "rgba(184,151,90,0.3)", display: "block", marginTop: "4px" }}>The Experience</span>
        </motion.span>

        <motion.h2
          id="intro-heading"
          className="text-display"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "rgba(240,240,240,0.92)" }}
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.15}
          viewport={{ once: true, margin: "-15%" }}
        >
          Um objeto digital
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(184,151,90,0.75)" }}>
            revelado através do movimento.
          </em>
          <br />
          <span style={{ fontSize: "1rem", color: "rgba(184,151,90,0.4)", display: "block", marginTop: "12px", fontFamily: "var(--font-inter)", fontStyle: "normal", letterSpacing: "0.1em" }}>
            A digital object revealed through movement.
          </span>
        </motion.h2>

        <motion.div
          className="gold-line"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.25}
          viewport={{ once: true, margin: "-15%" }}
        />

        <motion.p
          className="text-body-cinema max-w-md"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          custom={0.35}
          viewport={{ once: true, margin: "-15%" }}
        >
          Uma imersão cinematográfica onde cada frame é uma respiração,
          cada movimento uma revelação. Isso não é um site, é uma escultura
          digital viva.
          <br /><br />
          <span style={{ fontSize: "0.75rem", color: "rgba(240,240,240,0.25)" }}>
            Scroll-driven cinematic immersion where every frame is a breath,
            every movement a revelation. This is not a website, it is a living
            digital sculpture.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
