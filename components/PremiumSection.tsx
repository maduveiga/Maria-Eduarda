"use client";

import { motion } from "framer-motion";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, delay, ease: [0.19, 1, 0.22, 1] },
  }),
};

const FEATURES = [
  {
    number: "01",
    title: "Guiado pelo Scroll",
    titleEn: "Scroll-Driven",
    body: "Cada pixel de scroll se traduz em um quadro cinematográfico preciso. Sem autoplay. Sem adivinhações. Você controla o tempo.",
    bodyEn: "Every pixel of scroll translates into a precise cinematic frame. No autoplay. No guessing. You control time.",
  },
  {
    number: "02",
    title: "Perfeição Visual",
    titleEn: "Frame Perfect",
    body: "122 quadros em alta resolução, previamente carregados e otimizados, renderizados perfeitamente na sua tela.",
    bodyEn: "122 high-resolution PNG frames, preloaded, cache-optimized, rendered at native display density.",
  },
  {
    number: "03",
    title: "Objeto Vivo",
    titleEn: "Living Object",
    body: "A sequência existe como uma presença tridimensional, uma escultura digital que surge através da sua interação.",
    bodyEn: "The sequence exists as a three-dimensional presence, a digital sculpture that emerges through your interaction.",
  },
];

export default function PremiumSection() {
  return (
    <section
      className="cinema-section relative min-h-screen flex items-center justify-center px-8 py-32"
      id="concept"
      aria-labelledby="concept-heading"
    >
      {/* Fundo limpo — sem gradient radial nem maskImage (eram manchas) */}

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center gap-8 mb-24">
          <motion.span
            className="text-label"
            style={{ color: "rgba(184,151,90,0.6)" }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true, margin: "-10%" }}
          >
            A Tecnologia
            <br /><span style={{ fontSize: "0.45rem", color: "rgba(184,151,90,0.3)", display: "block", marginTop: "4px" }}>The Technology</span>
          </motion.span>

          <motion.h2
            id="concept-heading"
            className="text-display text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "rgba(240,240,240,0.9)" }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            custom={0.1}
            viewport={{ once: true, margin: "-10%" }}
          >
            Projetado para profundidade.
            <br />
            <span style={{ fontSize: "1.2rem", color: "rgba(240,240,240,0.3)", display: "block", marginTop: "8px", fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}>
              Designed for depth.
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
        </div>

        {/* Feature grid — separadores via gap-px sobre fundo #1a1a1a */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cinema-ash">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              className="flex flex-col gap-6 p-10 bg-cinema-black"
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              custom={i * 0.12}
              viewport={{ once: true, margin: "-5%" }}
            >
              <span className="text-label" style={{ color: "rgba(184,151,90,0.4)" }}>
                {f.number}
              </span>
              <div style={{ width: "32px", height: "1px", background: "rgba(184,151,90,0.3)" }} />
              <h3
                className="text-display"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "rgba(240,240,240,0.85)" }}
              >
                {f.title}
                <br /><span style={{ fontSize: "0.8rem", color: "rgba(240,240,240,0.3)", display: "block", marginTop: "4px", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>{f.titleEn}</span>
              </h3>
              <p className="text-body-cinema" style={{ lineHeight: "1.6" }}>
                {f.body}
                <br />
                <span style={{ fontSize: "0.75rem", color: "rgba(240,240,240,0.2)", display: "block", marginTop: "8px" }}>{f.bodyEn}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
