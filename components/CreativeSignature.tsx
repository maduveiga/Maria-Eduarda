"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

/**
 * CreativeSignature (About Section)
 * Redesigned to be a living, cinematic editorial experience.
 */
export default function CreativeSignature() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Spring animations for a "liquid" premium feel
  const smoothMouseX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });
  
  const imageParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], ["-12px", "12px"]);
  const imageParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], ["-12px", "12px"]);
  const contentParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], ["8px", "-8px"]);
  const contentParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], ["8px", "-8px"]);

  // Lighting effect following mouse
  const lightX = useTransform(smoothMouseX, [-0.5, 0.5], ["0%", "100%"]);
  const lightY = useTransform(smoothMouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      id="vision"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        background: "#000000", 
        padding: "160px 0 160px 0",
        position: "relative",
        overflow: "hidden",
        perspective: "1200px"
      }}
    >
      {/* Background Ambient Glow — Reactive to mouse */}
      <motion.div 
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,151,90,0.04) 0%, transparent 70%)",
          x: useTransform(smoothMouseX, [-0.5, 0.5], ["-40%", "-60%"]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], ["-40%", "-60%"]),
          pointerEvents: "none",
          filter: "blur(100px)",
        }}
      />

      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 8vw, 120px)", position: "relative", zIndex: 2 }}>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-24 lg:gap-32">
          
          {/* IMAGE BLOCK — Interactive Editorial Portrait */}
          <div style={{ flex: "1 1 45%", position: "relative", width: "100%", maxWidth: "520px" }}>
            <motion.div 
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
              style={{ 
                position: "relative",
                aspectRatio: "3/4",
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03)",
                x: imageParallaxX,
                y: imageParallaxY,
              }}
            >
              {/* The Image */}
              <div style={{ position: "relative", width: "100%", height: "100%", scale: 1.1 }}>
                <Image 
                  src="/creative_visionary_portrait.png"
                  alt="Creative Visionary"
                  fill
                  style={{ objectFit: "cover", filter: "contrast(1.05) brightness(0.95)" }}
                  priority
                />
              </div>

              {/* Dynamic Lens Light / Glare */}
              <motion.div 
                aria-hidden="true"
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: useTransform(
                    [lightX, lightY],
                    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.08) 0%, transparent 50%)`
                  ),
                  pointerEvents: "none",
                  mixBlendMode: "soft-light"
                }} 
              />

              {/* Subtle Vignette Layer */}
              <div style={{ 
                position: "absolute", 
                inset: 0, 
                background: "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)",
                pointerEvents: "none"
              }} />

              {/* Scanline / Grain Overlay */}
              <div 
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.03,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Decorative Geometry */}
            <motion.div 
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                borderRight: "1px solid rgba(184,151,90,0.15)",
                borderTop: "1px solid rgba(184,151,90,0.15)",
                zIndex: -1,
                opacity: isHovered ? 1 : 0.4,
                transition: "opacity 1s ease"
              }}
            />
          </div>

          {/* TEXT BLOCK — Revealed Manifesto */}
          <motion.div 
            style={{ 
              flex: "1 1 55%", 
              paddingTop: "10px",
              x: contentParallaxX,
              y: contentParallaxY,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                  style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "clamp(1.1rem, 1.75vw, 1.45rem)", 
                    fontWeight: 300, 
                    lineHeight: 1.5, 
                    color: "rgba(220, 220, 220, 0.85)",
                    margin: 0
                  }}
                >
                  Entre referências clássicas e tecnologia contemporânea, minha direção dá vida a experiências digitais.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "clamp(1.1rem, 1.75vw, 1.45rem)", 
                    fontWeight: 300, 
                    lineHeight: 1.5, 
                    color: "rgba(220, 220, 220, 0.85)",
                    margin: 0
                  }}
                >
                  Cada composição nasce com intenção, transparência e atenção minuciosa aos elementos que tornam uma marca inesquecível.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "clamp(1.1rem, 1.75vw, 1.45rem)", 
                    fontWeight: 300, 
                    lineHeight: 1.5, 
                    color: "rgba(220, 220, 220, 0.85)",
                    margin: 0
                  }}
                >
                  Não desenvolvo apenas interfaces.<br />
                  <span style={{ color: "rgba(255,255,255,1)" }}>Traduzo essência, conduzo percepção e transformo identidade em presença singular.</span>
                </motion.p>

                <motion.h2 
                  initial={{ opacity: 0, scale: 0.98, x: -10 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  style={{ 
                    fontFamily: "var(--font-cormorant)", 
                    fontSize: "clamp(1.3rem, 2vw, 1.75rem)", 
                    fontWeight: 300, 
                    lineHeight: 1.3, 
                    color: "rgba(184, 151, 90, 0.85)",
                    fontStyle: "italic",
                    margin: "12px 0 0 0",
                    position: "relative",
                    paddingLeft: "32px"
                  }}
                >
                  <span style={{ position: "absolute", left: 0, top: "0.6em", width: "20px", height: "1px", background: "rgba(184,151,90,0.4)" }} />
                  Existe um traço invisível entre o silêncio e o impacto, onde atmosfera, profundidade e sofisticação ultrapassam o óbvio.
                </motion.h2>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
                style={{ 
                  marginTop: "8px", 
                  borderTop: "1px solid rgba(255,255,255,0.06)", 
                  paddingTop: "32px", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "20px", 
                  maxWidth: "480px" 
                }}
              >
                <p style={{ 
                  fontFamily: "var(--font-inter)", 
                  fontSize: "clamp(0.75rem, 0.85vw, 0.85rem)", 
                  lineHeight: 1.7, 
                  color: "rgba(255, 255, 255, 0.25)",
                  fontWeight: 300,
                  margin: 0
                }}>
                  Between classic references and contemporary technology, my direction brings digital experiences to life. 
                  Every composition is born with intention, transparency, and meticulous attention to the elements that make a brand unforgettable.
                </p>

                <p style={{ 
                  fontFamily: "var(--font-inter)", 
                  fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)", 
                  lineHeight: 1.7, 
                  color: "rgba(184, 151, 90, 0.4)",
                  fontStyle: "italic",
                  margin: 0
                }}>
                  There is an invisible line between silence and impact, where atmosphere, depth, and sophistication go beyond the obvious.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
