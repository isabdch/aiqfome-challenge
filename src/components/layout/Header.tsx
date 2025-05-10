"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Input from "@/components/core/Input";

import Logo from "@/assets/icons/logo.svg";
import Profile from "@/assets/icons/profile.svg";
import Location from "@/assets/icons/location.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="p-md bg-brand sticky top-0 flex flex-col gap-md z-10 mb-micro">
      <nav className="flex items-center gap-lg max-container-md mx-auto">
        <Link href="/" aria-label="Ir para página inicial">
          <Logo />
        </Link>

        <div className="flex items-center gap-2sm">
          <Location aria-hidden="true" />

          <div>
            <p className="text-purple-200 text-sm font-bold mb-xs">
              entregando em
            </p>

            <Link
              href="/"
              aria-label="Alterar endereço de entrega"
              className="flex items-center gap-3xs font-bold text-neutral-0 text-md"
            >
              Rua Mandaguari, 198
              <ChevronRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="text-neutral-0 ml-auto"
          aria-label="Acessar perfil do usuário"
        >
          <Profile aria-hidden="true" />
        </Link>
      </nav>

      {isHomePage && (
        <div className="max-container-md mx-auto">
          <Input
            type="search"
            placeholder="busque pela loja ou culinária"
            aria-label="Buscar loja ou culinária"
          />
        </div>
      )}
    </header>
  );
}
