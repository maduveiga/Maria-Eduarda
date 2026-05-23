"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ScrollIndicatorProps {
  visible: boolean;
}

/**
 * ScrollIndicator
 * Elegant animated scroll prompt — fades out once user starts scrolling.
 */
export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-indicator"
          className="fixed bottom-10 left-1/2 z-50 flex flex-col items-center gap-3"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 2 }}
          aria-label="Scroll to explore"
        >
          {/* Label */}
          <span
            className="text-label"
            style={{ color: "rgba(184,151,90,0.55)", letterSpacing: "0.35em" }}
          >
            scroll
          </span>

          {/* Animated line with dot */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              style={{
                width: 1,
                height: 32,
                background:
                  "linear-gradient(to bottom, transparent, rgba(184,151,90,0.5))",
              }}
            />
            <motion.div
              style={{
                width: 4,
                height: 4,
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
