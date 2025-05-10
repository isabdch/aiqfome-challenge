import Link from "next/link";

import Input from "@/components/core/Input";

import Logo from "@/assets/icons/logo.svg";
import Profile from "@/assets/icons/profile.svg";
import Location from "@/assets/icons/location.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";

export default function Header() {
  return (
    <header className="p-md bg-brand sticky top-0 flex flex-col gap-md z-10 mb-micro">
      <nav className="flex items-center gap-lg">
        <Link href="/" aria-label="Ir para página inicial">
          <Logo className="w-icon-lg h-icon-lg" />
        </Link>

        <div className="flex items-center gap-2sm">
          <Location aria-hidden="true" className="w-icon-md h-icon-md" />

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
              <ChevronRight
                aria-hidden="true"
                className="w-icon-sm h-icon-sm"
              />
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="text-neutral-0 ml-auto"
          aria-label="Acessar perfil do usuário"
        >
          <Profile className="w-icon-md h-icon-md" aria-hidden="true" />
        </Link>
      </nav>

      <Input
        type="search"
        placeholder="busque pela loja ou culinária"
        aria-label="Buscar loja ou culinária"
      />
    </header>
  );
}
