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
  title: "MADU — Luxury Cinematic Experience",
  description:
    "An ultra-premium scroll-driven cinematic experience. A digital object revealed through movement.",
  keywords: ["luxury", "cinematic", "immersive", "experience", "scroll"],
  openGraph: {
    title: "MADU — Luxury Cinematic Experience",
    description: "A digital object revealed through movement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
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
