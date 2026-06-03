"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ScrollIndicatorProps {
  visible: boolean;
}

/**
 * ScrollIndicator
 * Elegant animated scroll prompt — inline styles only (sem Tailwind)
 * para garantir centralização perfeita em qualquer dispositivo.
 */
export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-indicator"
          style={{
            position: "fixed",
            bottom: "40px",
            left: 0,
            right: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 2 }}
          aria-label="Scroll to explore"
        >
          {/* Label */}
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(184,151,90,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            scroll
          </span>

          {/* Linha + dot animado */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "1px",
                height: "32px",
                background: "linear-gradient(to bottom, transparent, rgba(184,151,90,0.5))",
              }}
            />
            <motion.div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(184,151,90,0.6)",
              }}
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
