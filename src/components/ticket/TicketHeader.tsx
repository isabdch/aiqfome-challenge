import Link from "next/link";
import Image from "next/image";

import type { Restaurant } from "@/types/restaurants";

type TicketHeaderProps = {
  restaurant: Restaurant;
};

export default async function TicketHeader({ restaurant }: TicketHeaderProps) {
  const IMG_SIZE = 32;

  return (
    <header className="px-md flex items-center gap-sm">
      <Link
        href={`/restaurants/${restaurant.id}`}
        aria-label="Voltar para a página do restaurante"
      >
        <Image
          width={IMG_SIZE}
          height={IMG_SIZE}
          sizes={`${IMG_SIZE}px`}
          alt={restaurant.name}
          className="rounded-sm"
          src={restaurant.cover || "/images/restaurant.webp"}
        />
      </Link>

      <div className="flex flex-col gap-4xs">
        <p className="text-label font-bold">seus itens em</p>

        <Link href={`/restaurants/${restaurant.id}`}>
          <h1 className="text-md font-bold text-neutral-900">
            {restaurant.name}
          </h1>
        </Link>
      </div>
    </header>
  );
}
