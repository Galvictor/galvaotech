import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://galvaotech.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Galvão Tech — Full Stack & Infraestrutura",
    template: "%s · Galvão Tech",
  },
  description:
    "Transformo sua ideia em aplicação web profissional — do primeiro código ao servidor em produção. Full stack, infra, deploy e segurança.",
  openGraph: {
    title: "Galvão Tech — Da ideia ao ar",
    description:
      "Sites, sistemas, MVPs e infraestrutura. Desenvolvimento acelerado com IA, entrega completa.",
    locale: "pt_BR",
    type: "website",
    siteName: "Galvão Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galvão Tech",
    description: "Full stack + infra — sua ideia online mais rápido.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sans.variable} ${display.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
