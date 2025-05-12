import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "@/styles/globals.css";

import { generatePageMetadata } from "@/lib/metadata";

import { SearchProvider } from "@/contexts/SearchContext";
import { OrderProvider } from "@/contexts/OrderContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = generatePageMetadata(
  "Início",
  "Peça comida pelo aiqfome com facilidade e rapidez. Vários restaurantes disponíveis para entrega."
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} antialiased flex flex-col`}>
        <OrderProvider>
          <SearchProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SearchProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
