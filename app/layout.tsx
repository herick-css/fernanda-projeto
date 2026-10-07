import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernanda Bezerra | Personal Trainer",
  description:
    "Treinos personalizados com acompanhamento profissional. Veja os horários disponíveis e agende pelo WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-slate-800 antialiased">{children}</body>
    </html>
  );
}
