"use client";

import { useEffect } from "react";

/**
 * Global error handler for the Next.js app.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Next.js App Error:", error);
  }, [error]);

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#000000",
      color: "#ffffff",
      fontFamily: "var(--font-inter), sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h2 style={{ 
        fontFamily: "var(--font-cormorant), serif", 
        fontSize: "2rem", 
        fontWeight: 300, 
        color: "#b8975a",
        marginBottom: "16px" 
      }}>
        Algo interrompeu a experiência.
      </h2>
      <p style={{ opacity: 0.6, maxWidth: "400px", lineHeight: "1.6", marginBottom: "32px" }}>
        Uma falha inesperada ocorreu ao carregar os elementos cinematográficos.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "12px 32px",
          background: "transparent",
          border: "1px solid rgba(184,151,90,0.3)",
          color: "#b8975a",
          borderRadius: "2px",
          cursor: "pointer",
          fontSize: "0.85rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(184,151,90,0.05)";
          e.currentTarget.style.borderColor = "rgba(184,151,90,0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "rgba(184,151,90,0.3)";
        }}
      >
        Tentar Novamente
      </button>
    </div>
  );
}
