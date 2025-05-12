"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSearch } from "@/contexts/SearchContext";

import Input from "@/components/ui/Input";

import LogoIcon from "@/assets/icons/logo.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import LocationIcon from "@/assets/icons/location.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";

export default function Header() {
  const pathname = usePathname();

  const { searchTerm, setSearchTerm } = useSearch();

  const isHomePage = pathname === "/";

  return (
    <header
      className={`p-md bg-brand sticky top-0 flex flex-col gap-md z-10 ${
        isHomePage && "mb-xs"
      }`}
    >
      <nav className="flex items-center gap-lg max-container-md mx-auto w-full" aria-label="Principal">
        <Link href="/" aria-label="Ir para página inicial">
          <LogoIcon aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2sm">
          <LocationIcon aria-hidden="true" />

          <div>
            <p className="text-purple-200 text-sm font-bold mb-2xs">
              entregando em
            </p>

            <Link
              href="/"
              aria-label="Alterar endereço de entrega"
              className="flex items-center gap-4xs font-bold text-neutral-0 text-md-with-base-leading"
            >
              Rua Mandaguari, 198
              <ChevronRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="text-neutral-0 ml-auto"
          aria-label="Acessar perfil do usuário"
        >
          <ProfileIcon aria-hidden="true" />
        </Link>
      </nav>

      {isHomePage && (
        <div className="max-container-md mx-auto w-full">
          <Input
            type="search"
            placeholder="busque pela loja ou culinária"
            aria-label="Buscar loja ou culinária"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </header>
  );
}
