import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ErrorExpert | Estudo Reverso Inteligente",
  description: "Plataforma de análise de erros para concursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}