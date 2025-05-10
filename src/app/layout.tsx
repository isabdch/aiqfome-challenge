import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "@/styles/globals.css";

import Header from "@/components/layout/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aiqfome",
  description: "aiqfome",
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
