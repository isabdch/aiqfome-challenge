import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "@/styles/globals.css";

import { DishOrderProvider } from "@/contexts/DishOrderContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      <body className={`${nunito.variable} antialiased flex flex-col`}>
        <DishOrderProvider>
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </DishOrderProvider>
      </body>
    </html>
  );
}
