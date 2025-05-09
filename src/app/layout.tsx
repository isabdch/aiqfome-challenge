import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIQfome",
  description: "AIQfome",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
