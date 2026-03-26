import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academia Mori's-Reforma | Moldando os Líderes do Amanhã",
  description:
    "Instituição de vanguarda em Luanda dedicada ao desenvolvimento de liderança, oratória e inteligência emocional para crianças e adolescentes.",
  keywords: [
    "Educação",
    "Liderança Infantil",
    "Empreendedorismo Kids",
    "Oratória",
    "Luanda",
    "Benfica",
    "Angola",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-AO"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
        {/* O 'main' dentro de 'children' no page.tsx ocupará o espaço flexível */}
        {children}
      </body>
    </html>
  );
}
