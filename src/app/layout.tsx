import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import GalaxyBackground from "@/components/GalaxyBackground";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAREEM DANIEL | The Architect",
  description: "From the warehouse floor to the AI war room. The Kareem Chronicles -- where intelligence meets experience.",
  keywords: ["Kareem Daniel", "MT Media AI", "AI Consultant", "The Architect", "Golden Legion"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ cursor: "none" }} className={`${playfair.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body style={{ cursor: "none" }} className="antialiased">
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}
