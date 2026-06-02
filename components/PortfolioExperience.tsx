"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    id: "hauscon",
    name: "Hauscon Empreendimentos",
    category: "Empreendimentos",
    categoryEn: "Real Estate",
    url: "https://hauscon.vercel.app",
    year: "2024",
    description: "Presença digital premium para alto padrão imobiliário.",
    descriptionEn: "Premium digital presence for high-end real estate.",
  },
  {
    id: "caroline",
    name: "Caroline Bonetti",
    category: "Arquitetura",
    categoryEn: "Architecture",
    url: "https://caroline-bonetti.vercel.app",
    year: "2024",
    description: "Identidade digital que reflete refinamento e autenticidade.",
    descriptionEn: "Digital identity reflecting refinement and authenticity.",
  },
  {
    id: "terracota",
    name: "Terracota",
    category: "Arquitetura",
    categoryEn: "Architecture",
    url: "https://terracota-tan.vercel.app",
    year: "2024",
    description: "Identidade visual orgânica com estética contemporânea.",
    descriptionEn: "Organic visual identity with contemporary aesthetics.",
  },
  {
    id: "smarquitetura",
    name: "SM Arquitetura",
    category: "Arquitetura",
    categoryEn: "Architecture",
    url: "https://smarquitetura.vercel.app",
    year: "2024",
    description: "Design arquitetônico traduzido em experiência digital sofisticada.",
    descriptionEn: "Architectural design translated into a sophisticated digital experience.",
  },
  {
    id: "saobento",
    name: "Imobiliária São Bento",
    category: "Imóveis",
    categoryEn: "Real Estate",
    url: "https://imobiliariasaobento.vercel.app",
    year: "2024",
    description: "Presença digital sofisticada para o mercado imobiliário.",
    descriptionEn: "Sophisticated digital presence for the real estate market.",
  },
  {
    id: "expert",
    name: "Expert Contabilidade",
    category: "Financeiro",
    categoryEn: "Finance",
    url: "https://expertcontabilidade.flowsistemas.com.br",
    year: "2024",
    description: "Autoridade e modernidade para uma contabilidade de elite.",
    descriptionEn: "Authority and modernity for elite accounting.",
  },
];

const RowSeparator = () => (
  <motion.div 
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: false, amount: 0.5 }}
    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
    style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      margin: "60px 0",
      gap: "20px"
    }}
  >
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.3))" }} />
    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(184,151,90,0.5)", boxShadow: "0 0 10px rgba(184,151,90,0.8)" }} />
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(-90deg, transparent, rgba(184,151,90,0.3))" }} />
  </motion.div>
);

function ProjectFrame({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLoaded = useInView(ref, { margin: "600px 0px" });
  const isFlipped = useInView(ref, { margin: "-25% 0px" });
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [isLoaded]);

  const gradients = [
    "linear-gradient(135deg, #000000 0%, #120f09 40%, #000000 100%)",
    "linear-gradient(135deg, #000000 0%, #0c1014 40%, #000000 100%)",
    "linear-gradient(135deg, #000000 0%, #0f0f0a 40%, #000000 100%)",
    "linear-gradient(135deg, #000000 0%, #120a09 40%, #000000 100%)",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "20%" }} // Trigger earlier
      transition={{ duration: 0.7, delay: (index % 4) * 0.05, ease: [0.19, 1, 0.22, 1] }} // Faster reveal
      style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10", // Wider, more substantial format
          borderRadius: "12px",
          transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          background: "transparent",
          perspective: "1600px" // Improved perspective depth
        }}
      >
        <motion.div 
          animate={{ rotateY: isFlipped ? 180 : 0, scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }} // Slower, highly fluid flip
          style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
        >
          {/* FRONT FACE (Static Premium Card) */}
          <div style={{ 
            backfaceVisibility: "hidden", position: "absolute", inset: 0, 
            borderRadius: "12px", overflow: "hidden", 
            background: gradients[index % 4], display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)"
          }}>
             <span style={{ color: "rgba(184,151,90,0.6)", fontSize: "1.2rem", fontFamily: "var(--font-cormorant)", textAlign: "center", padding: "20px", fontStyle: "italic", letterSpacing: "0.05em" }}>
               {project.name}
             </span>
          </div>

          {/* BACK FACE (Iframe + Overlays) */}
          <div style={{ 
            backfaceVisibility: "hidden", position: "absolute", inset: 0, 
            borderRadius: "12px", overflow: "hidden", transform: "rotateY(180deg)", background: "#000000",
            boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.9), 0 0 0 1px rgba(184,151,90,0.4)" : "0 10px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}>
            {isLoaded && !iframeError && (
               <iframe
                 src={project.url}
                 title={project.name}
                 loading="lazy"
                 onLoad={() => setIframeLoaded(true)}
                 onError={() => setIframeError(true)}
                 style={{
                   width: "100%",
                   height: "100%",
                   border: "none",
                   display: "block",
                   opacity: iframeLoaded ? 1 : 0,
                   transition: "opacity 0.8s ease",
                   pointerEvents: "none",
                 }}
                 sandbox="allow-scripts allow-same-origin"
               />
            )}

            {(!isLoaded || !iframeLoaded || iframeError) && (
              <div style={{ 
                position: "absolute", inset: 0, 
                background: gradients[index % 4], 
                display: "flex", alignItems: "center", justifyContent: "center", 
                zIndex: 1 
              }}>
                 {iframeError ? (
                    <span style={{ color: "rgba(184,151,90,0.5)", fontSize: "0.7rem", fontFamily: "var(--font-inter)", textAlign: "center", padding: "10px" }}>{project.name}</span>
                 ) : (
                    <div className="skeleton-pulse" style={{ 
                      width: "100%", height: "100%", 
                      background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.05), transparent)",
                      animation: "shimmer 2s infinite" 
                    }} />
                 )}
              </div>
            )}

            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
                pointerEvents: "none",
                display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px",
                zIndex: 10
              }}
            >
               <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    alignSelf: "center",
                    marginBottom: "10%",
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, rgba(184,151,90,0.9), rgba(130,105,60,0.9))",
                    borderRadius: "30px",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    pointerEvents: "auto",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    position: "relative",
                    overflow: "hidden"
                  }}
               >
                  <div style={{
                     position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%",
                     background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                     transform: "skewX(-20deg)",
                     animation: hovered ? "shine 1.5s ease-out infinite" : "none"
                  }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.4 }}>
                     <span>Abrir Projeto</span>
                     <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>Open Project</span>
                  </div>
               </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center", marginTop: "8px" }}>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "rgba(240,240,240,0.9)", margin: 0, lineHeight: 1.1 }}>
          {project.name}
        </h3>
        <div>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "rgba(184,151,90,0.8)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
            {project.category}
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(130,105,60,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0, marginTop: "2px" }}>
            {project.categoryEn}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioExperience() {
  return (
    <section
      id="portfolio"
      style={{
        background: "#000000", paddingBottom: "160px", position: "relative", overflow: "hidden"
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shine { 
           0% { left: -100%; opacity: 0; }
           20% { opacity: 1; }
           100% { left: 200%; opacity: 0; }
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "20%" }}
        transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", paddingTop: "120px", paddingBottom: "100px", textAlign: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "rgba(184,151,90,0.6)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Trabalhos Selecionados
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(184,151,90,0.3)", letterSpacing: "0.4em", textTransform: "uppercase", marginTop: "4px" }}>
            Selected Works
          </span>
        </div>
        
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 300, color: "rgba(240,240,240,0.88)", margin: "16px 0 0 0", lineHeight: 1.1 }}>
          Composições Digitais, <em style={{ fontStyle: "italic", color: "rgba(184,151,90,0.7)" }}>criados com precisão.</em>
        </h2>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "rgba(180,180,180,0.4)", margin: "4px 0 0 0" }}>
          Digital compositions, <em style={{ fontStyle: "italic", color: "rgba(130,105,60,0.4)" }}>precisely crafted.</em>
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "32px", maxWidth: "480px" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "rgba(240,240,240,0.45)", lineHeight: 1.6, margin: 0 }}>
            Cada projeto é uma escultura digital única, uma experiência desenhada com intenção, estética e profundidade.
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(240,240,240,0.2)", lineHeight: 1.6, margin: "8px 0 0 0" }}>
            Each project is a unique digital sculpture, an experience engineered with intention, aesthetics, and depth.
          </p>
        </div>
      </motion.div>

      <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)" }}>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-[1400px] mx-auto">
           {PROJECTS.slice(0, 2).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx} />
           ))}
        </div>

        <RowSeparator />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-[1400px] mx-auto">
           {PROJECTS.slice(2, 4).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx + 2} />
           ))}
        </div>

        <RowSeparator />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-[1400px] mx-auto">
           {PROJECTS.slice(4, 6).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx + 4} />
           ))}
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", paddingTop: "140px", textAlign: "center" }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, rgba(184,151,90,0.8), transparent)" }} />
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <h2 style={{ 
              fontFamily: "var(--font-cormorant)", 
              fontSize: "clamp(2rem, 4.5vw, 4rem)", 
              fontWeight: 300, 
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              textShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 60px rgba(184,151,90,0.15)",
              margin: 0,
              color: "rgba(184, 151, 90, 0.75)" // Reverted to golden tone
            }}>
              Vamos transmitir uma identidade<br />que permaneça além do tempo?
            </h2>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.8vw, 1.5rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(240,240,240,0.18)", margin: 0, letterSpacing: "0.02em" }}>
              Shall we transmit an identity that endures beyond time?
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <p style={{ 
              fontFamily: "var(--font-inter)", 
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)", 
              color: "rgba(240,240,240,0.4)", 
              letterSpacing: "0.05em",
              maxWidth: "600px",
              lineHeight: 1.6,
              margin: 0
            }}>
              Seu novo posicionamento está a uma <span style={{ color: "rgba(184,151,90,0.7)" }}>conexão de distância</span>.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)", color: "rgba(240,240,240,0.15)", letterSpacing: "0.05em", fontStyle: "italic", margin: 0 }}>
              Your new positioning is one connection away.
            </p>
          </div>
          
          <motion.a
             href="https://wa.me/5547989192263"
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,151,90,0.8)" }}
             whileTap={{ scale: 0.97 }}
             style={{
               marginTop: "32px",
               padding: "16px 48px",
               background: "linear-gradient(145deg, #111111, #000000)",
               border: "1px solid rgba(184,151,90,0.4)",
               borderRadius: "40px",
               color: "rgba(240,240,240,0.95)",
               fontFamily: "var(--font-inter)",
               fontSize: "0.75rem",
               fontWeight: 500,
               letterSpacing: "0.25em",
               textTransform: "uppercase",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               gap: "12px",
               textDecoration: "none",
               position: "relative",
               overflow: "hidden",
               boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)",
               cursor: "pointer"
             }}
          >
             <div style={{
                position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.25), transparent)",
                transform: "skewX(-20deg)",
                animation: "shine 3s ease-in-out infinite"
             }} />
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1, color: "rgba(184,151,90,0.9)" }}>
               <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
             </svg>
             <span style={{ position: 'relative', zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.4 }}>
               <span>Iniciar uma conexão com a Madu</span>
               <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", fontWeight: 400 }}>Begin a connection with Madu</span>
             </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
