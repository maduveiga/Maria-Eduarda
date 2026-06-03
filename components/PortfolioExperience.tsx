"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    id: "hauscon",
    name: "Hauscon Empreendimentos",
    category: "Empreendimentos",
    url: "https://hauscon.vercel.app",
    year: "2024",
    description: "Presença digital premium para alto padrão imobiliário.",
  },
  {
    id: "caroline",
    name: "Caroline Bonetti",
    category: "Arquitetura",
    url: "https://caroline-bonetti.vercel.app",
    year: "2024",
    description: "Identidade digital que reflete refinamento e autenticidade.",
  },
  {
    id: "terracota",
    name: "Terracota",
    category: "Arquitetura",
    url: "https://terracota-tan.vercel.app",
    year: "2024",
    description: "Identidade visual orgânica com estética contemporânea.",
  },
  {
    id: "smarquitetura",
    name: "SM Arquitetura",
    category: "Arquitetura",
    url: "https://smarquitetura.vercel.app",
    year: "2024",
    description: "Design arquitetônico traduzido em experiência digital sofisticada.",
  },
  {
    id: "saobento",
    name: "Imobiliária São Bento",
    category: "Imóveis",
    url: "https://imobiliariasaobento.vercel.app",
    year: "2024",
    description: "Presença digital sofisticada para o mercado imobiliário.",
  },
  {
    id: "expert",
    name: "Expert Contabilidade",
    category: "Financeiro",
    url: "https://expertcontabilidade.flowsistemas.com.br",
    year: "2024",
    description: "Autoridade e modernidade para uma contabilidade de elite.",
  },
];

const RowSeparator = () => (
  <motion.div 
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
    style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      margin: "clamp(40px, 8vw, 80px) 0",
      gap: "20px"
    }}
  >
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,151,90,0.2))" }} />
    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(184,151,90,0.4)" }} />
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(-90deg, transparent, rgba(184,151,90,0.2))" }} />
  </motion.div>
);

function ProjectFrame({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Sincronização e Carregamento Robusto ───────────────────────────
  // Aumentamos a margem para 1000px para carregar bem antes do usuário chegar
  const isInView = useInView(ref, { margin: "1000px 0px", once: true });
  const isFlipped = useInView(ref, { margin: "-10% 0px" });

  // Carregamento instantâneo/agressivo conforme solicitado
  useEffect(() => {
    if (isInView) {
      const stagger = 50; // Quase instantâneo
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, index * stagger);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  // Constantes de escala para evitar o efeito "zoom/desproporção"
  // Simulamos uma tela desktop (1280px) dentro do card
  const virtualWidth = 1280;
  const aspectRatio = 16/10;
  const virtualHeight = virtualWidth / aspectRatio;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} 
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }} 
      style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <div 
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          borderRadius: "14px",
          overflow: "hidden",
          transition: "all 0.6s var(--ease-silk)",
          perspective: isMobile ? "none" : "1500px",
          background: "#080808",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,151,90,0.08)"
        }}
      >
        {isMobile ? (
          /* ── MOBILE: Exibição Direta com Escala Virtual (Evita Zoom) ── */
          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            {!iframeLoaded && (
              <div style={{ 
                position: "absolute", inset: 0,
                background: "#0a0a0a",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2
              }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "rgba(184,151,90,0.6)",
                  boxShadow: "0 0 15px rgba(184,151,90,0.4)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }} />
              </div>
            )}
            
            {shouldLoad && (
              <div style={{ 
                width: `${virtualWidth}px`, 
                height: `${virtualHeight}px`,
                transform: `scale(${ (ref.current?.offsetWidth || 350) / virtualWidth })`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none"
              }}>
                <iframe 
                  src={project.url} 
                  title={project.name} 
                  onLoad={() => setIframeLoaded(true)}
                  style={{ 
                    width: "100%", height: "100%", border: "none",
                    opacity: iframeLoaded ? 1 : 0, 
                    transition: "opacity 0.6s ease"
                  }}
                />
              </div>
            )}

            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                position: "absolute", inset: 0, zIndex: 10,
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                padding: "24px",
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",
                textDecoration: "none"
              }}
            >
              <span style={{
                padding: "10px 24px", background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(184,151,90,0.4)", borderRadius: "30px",
                color: "#fff", fontFamily: "var(--font-inter)",
                fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.2em",
                textTransform: "uppercase", backdropFilter: "blur(8px)",
              }}>
                Ver Projeto
              </span>
            </a>
          </div>
        ) : (
          /* ── DESKTOP: Flip Card com Escala Virtual ── */
          <motion.div 
            animate={{ rotateY: isFlipped ? 180 : 0, scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
          >
            {/* FRONT (Capa do Card) */}
            <div style={{ 
              backfaceVisibility: "hidden", position: "absolute", inset: 0, 
              borderRadius: "14px", background: "linear-gradient(135deg, #0a0a0a 0%, #151515 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.03)"
            }}>
               <div style={{ 
                 position: "absolute", inset: 0, 
                 background: "radial-gradient(circle at 50% 50%, rgba(184,151,90,0.05) 0%, transparent 70%)" 
               }} />
               <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(184,151,90,0.4)", textTransform: "uppercase" }}>
                 Visualizar Preview
               </span>
            </div>

            {/* BACK (Preview do Site com Escala Desktop) */}
            <div style={{ 
              backfaceVisibility: "hidden", position: "absolute", inset: 0, 
              borderRadius: "14px", overflow: "hidden", transform: "rotateY(180deg)", background: "#050505",
              border: "1px solid rgba(184,151,90,0.25)"
            }}>
              {!iframeLoaded && (
                <div style={{ 
                  position: "absolute", inset: 0, background: "#0a0a0a", 
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2
                }}>
                  <div className="shimmer-text" style={{ fontSize: "0.6rem", opacity: 0.3, letterSpacing: "0.2em" }}>
                    RENDERIZANDO...
                  </div>
                </div>
              )}
 
              {shouldLoad && (
                <div style={{ 
                  width: `${virtualWidth}px`, 
                  height: `${virtualHeight}px`,
                  transform: `scale(${ (ref.current?.offsetWidth || 600) / virtualWidth })`,
                  transformOrigin: "top left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none"
                }}>
                  <iframe 
                    src={project.url} 
                    title={project.name} 
                    onLoad={() => setIframeLoaded(true)}
                    style={{ 
                      width: "100%", height: "100%", border: "none",
                      opacity: iframeLoaded ? 1 : 0, 
                      transition: "opacity 0.8s ease-in-out"
                    }}
                  />
                </div>
              )}
              
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 50%)",
                  display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 10
                }}
              >
                 <motion.a href={project.url} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: "14px 36px", background: "linear-gradient(135deg, #b8975a, #82693c)",
                      borderRadius: "40px", color: "#fff", fontFamily: "var(--font-inter)", 
                      fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em",
                      textTransform: "uppercase", textDecoration: "none", pointerEvents: "auto",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                    }}
                 >
                    Explorar Projeto
                 </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 300, color: "rgba(255,255,255,0.95)", margin: 0, letterSpacing: "0.02em" }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(184,151,90,0.55)", letterSpacing: "0.35em", textTransform: "uppercase", margin: 0 }}>
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}


export default function PortfolioExperience() {
  return (
    <section id="portfolio" style={{ background: "#000", paddingBottom: "120px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", paddingTop: "120px", paddingBottom: "80px", textAlign: "center", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "rgba(184,151,90,0.6)", letterSpacing: "0.5em", textTransform: "uppercase" }}>
          Trabalhos Selecionados
        </span>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 300, color: "#fff", margin: 0, lineHeight: 1.1 }}>
          Composições Digitais, <em style={{ fontStyle: "italic", color: "rgba(184,151,90,0.7)" }}>criadas com precisão.</em>
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", maxWidth: "500px", lineHeight: 1.6, marginTop: "24px" }}>
          Cada projeto é uma escultura digital única, uma experiência desenhada com intenção, estética e profundidade.
        </p>
      </motion.div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
           {PROJECTS.slice(0, 2).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx} />
           ))}
        </div>
        
        <RowSeparator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
           {PROJECTS.slice(2, 4).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx + 2} />
           ))}
        </div>
        
        <RowSeparator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
           {PROJECTS.slice(4, 6).map((proj, idx) => (
             <ProjectFrame key={proj.id} project={proj} index={idx + 4} />
           ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", paddingTop: "140px", textAlign: "center", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, #b8975a, transparent)" }} />
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.2, color: "rgba(184,151,90,0.85)", margin: 0, maxWidth: "900px" }}>
          Existe uma versão mais valiosa da sua marca.
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", margin: 0 }}>
          Ela pode estar a uma <span style={{ color: "#b8975a" }}>conversa de distância</span>.
        </p>
        
        <motion.a href="https://wa.me/5547989192263" target="_blank" rel="noopener noreferrer"
           whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
           style={{
             marginTop: "32px", padding: "18px 56px", background: "linear-gradient(135deg, #111, #000)",
             border: "1px solid rgba(184,151,90,0.4)", borderRadius: "40px", color: "#fff",
             fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.3em",
             textTransform: "uppercase", textDecoration: "none", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
           }}
        >
           Iniciar Conexão
        </motion.a>
      </motion.div>
    </section>
  );
}
