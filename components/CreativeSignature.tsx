"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

/**
 * CreativeSignature (About Section) - Cinematic Reimagination
 * Asymmetrical, editorial, and deeply overlapping composition.
 */
export default function CreativeSignature() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Mouse position for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  };

  const smoothX = useSpring(mousePos.x, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mousePos.y, { stiffness: 40, damping: 20 });
  
  // Parallax layers
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const imgMouseX = useTransform(smoothX, [0, 1], ["-15px", "15px"]);
  const imgMouseY = useTransform(smoothY, [0, 1], ["-15px", "15px"]);
  
  const text1Y = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const text2Y = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const text3Y = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section 
      ref={containerRef}
      id="vision"
      onMouseMove={handleMouseMove}
      style={{ 
        background: "#000000", 
        minHeight: "150vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: "15vh"
      }}
    >
      {/* Dynamic Ambient Background */}
      <motion.div 
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "1200px",
          height: "1200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,151,90,0.03) 0%, transparent 60%)",
          x: "-50%",
          y: "-50%",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <motion.div 
        style={{
          position: "absolute",
          top: "60%",
          left: "30%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
          x: "-50%",
          y: "-50%",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Composition Wrapper */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1600px", margin: "0 auto", height: "100%" }}>
        
        {/* PARAGRAPH 1 - Drifting Top Left */}
        <motion.div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "35%",
            minWidth: "300px",
            y: text1Y,
            zIndex: 3
          }}
        >
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              fontFamily: "var(--font-cormorant)", 
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", 
              fontWeight: 300, 
              lineHeight: 1.4, 
              color: "rgba(220, 220, 220, 1)",
              margin: 0
            }}
          >
            Entre referências clássicas <br/>e tecnologia contemporânea, <br/>minha direção dá vida a <br/>
            <span style={{ fontStyle: "italic", color: "rgba(184, 151, 90, 0.9)" }}>experiências digitais.</span>
          </motion.p>
        </motion.div>

        {/* THE EDITORIAL PORTRAIT - Off-center Right */}
        <motion.div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: "45%",
            maxWidth: "600px",
            aspectRatio: "3/4",
            zIndex: 1,
            y: imgY,
            x: imgMouseX
          }}
        >
          {/* Decorative frame overlay */}
          <div style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            bottom: "30px",
            left: "30px",
            border: "1px solid rgba(184, 151, 90, 0.15)",
            zIndex: 0,
            pointerEvents: "none"
          }} />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              position: "relative",
              width: "100%",
              height: "100%",
              zIndex: 2,
              overflow: "hidden", // We clip the image inside this box
              boxShadow: "0 60px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)"
            }}
          >
            <motion.div style={{ width: "100%", height: "100%", y: imgMouseY, scale: 1.15 }}>
               <Image 
                  src="/creative_visionary_portrait.png"
                  alt="Creative Visionary"
                  fill
                  style={{ objectFit: "cover", filter: "contrast(1.05) brightness(0.9) grayscale(10%)" }}
                />
            </motion.div>
            
            {/* Cinematic light sweep */}
            <motion.div 
              animate={{ 
                left: ["-100%", "200%"],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut" 
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "40%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                transform: "skewX(-20deg)",
                zIndex: 3
              }}
            />
          </motion.div>
        </motion.div>

        {/* PARAGRAPH 2 - Overlapping Image Bottom Left */}
        <motion.div
          style={{
            position: "absolute",
            top: "45%",
            left: "15%",
            width: "40%",
            minWidth: "320px",
            zIndex: 4,
            y: text2Y
          }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(20px)",
              padding: "40px",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          >
             <p style={{ 
                fontFamily: "var(--font-cormorant)", 
                fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", 
                fontWeight: 300, 
                lineHeight: 1.6, 
                color: "rgba(220, 220, 220, 0.85)",
                margin: 0
              }}>
                Cada composição nasce com intenção, transparência e atenção minuciosa aos elementos que tornam uma marca inesquecível.
                <br/><br/>
                <span style={{ color: "#fff" }}>Não desenvolvo apenas interfaces.</span> Traduzo essência, conduzo percepção e transformo identidade em presença singular.
              </p>
          </motion.div>
        </motion.div>

        {/* HEADLINE / QUOTE - Bottom Center/Right */}
        <motion.div
           style={{
            position: "absolute",
            top: "75%",
            right: "20%",
            width: "50%",
            minWidth: "320px",
            zIndex: 5,
            y: text3Y
          }}
        >
           <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            style={{ 
              fontFamily: "var(--font-cormorant)", 
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", 
              fontWeight: 300, 
              lineHeight: 1.3, 
              color: "rgba(184, 151, 90, 0.9)",
              fontStyle: "italic",
              margin: 0,
              paddingLeft: "40px",
              position: "relative"
            }}
          >
            <span style={{ position: "absolute", left: 0, top: "0.6em", width: "25px", height: "1px", background: "rgba(184,151,90,0.5)" }} />
            Existe um traço invisível entre o silêncio e o impacto, onde atmosfera, profundidade e sofisticação ultrapassam o óbvio.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8 }}
            style={{ marginTop: "30px", marginLeft: "40px" }}
          >
             <p style={{ 
                fontFamily: "var(--font-inter)", 
                fontSize: "12px", 
                lineHeight: 1.7, 
                color: "rgba(255, 255, 255, 0.3)",
                fontWeight: 300,
                margin: 0,
                maxWidth: "400px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                [ Between classic references and contemporary technology, my direction brings digital experiences to life. ]
              </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
