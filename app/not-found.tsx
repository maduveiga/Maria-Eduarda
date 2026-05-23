/**
 * Global not found handler.
 */
export default function NotFound() {
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
        Página não encontrada.
      </h2>
      <a
        href="/"
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
          textDecoration: "none",
          transition: "all 0.3s ease"
        }}
      >
        Voltar ao início
      </a>
    </div>
  );
}
