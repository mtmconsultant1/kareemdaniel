import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "KAREEM DANIEL | The Architect",
  description: "From the warehouse floor to the AI war room. The Kareem Chronicles: where intelligence meets experience.",
  keywords: ["Kareem Daniel", "MT Media AI", "AI Consultant", "The Architect", "Golden Legion"],
  openGraph: {
    title: "Kareem Daniel | The Architect | MT Media AI",
    description: "Ten years in the warehouse. A hip replacement. A community built from nothing. The pivot to AI. The full story of how the grind became the machine.",
    type: "website",
    url: "https://kareem.mtmediaai.com"
  },
  twitter: {
    card: "summary_large_image",
    site: "@mtmediaai"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
