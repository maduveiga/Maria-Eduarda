import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria Eduarda Veiga",
  description:
    "Estrategista Digital & Direção Criativa. Criando experiências digitais com precisão, estética premium e profundidade estratégica.",
  keywords: ["Maria Eduarda Veiga", "Madu", "Estratégia Digital", "Design Premium", "Portfólio", "Direção Criativa"],
  authors: [{ name: "Maria Eduarda Veiga" }],
  openGraph: {
    title: "Maria Eduarda Veiga",
    description: "Estrategista Digital & Direção Criativa. Criando experiências digitais com precisão e estética premium.",
    type: "website",
    locale: "pt_BR",
    siteName: "Maria Eduarda Veiga",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Eduarda Veiga",
    description: "Estrategista Digital & Direção Criativa.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-cinema-black text-cinema-light antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
