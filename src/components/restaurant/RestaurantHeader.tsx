import Image from "next/image";

import type { Restaurant } from "@/types/restaurants";

import Button from "@/components/core/Button";
import ArrowIcon from "@/components/core/ArrowIcon";
import RestaurantHeaderInfo from "@/components/restaurant/RestaurantHeaderInfo";

import ShareIcon from "@/assets/icons/share.svg";
import HeartIcon from "@/assets/icons/heart.svg";

type RestaurantHeaderProps = {
  restaurant: Restaurant;
};

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const IMG_SIZE = 36;

  return (
    <header className="flex flex-col gap-6xs py-lg px-md">
      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-sm">
          <Image
            width={IMG_SIZE}
            height={IMG_SIZE}
            className="rounded-sm"
            alt={restaurant.name}
            src={restaurant.cover || "/images/restaurant.webp"}
          />

          <h1 className="text-lg font-bold">{restaurant.name}</h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3sm">
            <button className="p-4xs" type="button" aria-label="Compartilhar">
              <ShareIcon aria-hidden="true" />
            </button>

            <button
              className="p-4xs"
              type="button"
              aria-label="Salvar como favorito"
            >
              <HeartIcon aria-hidden="true" />
            </button>
          </div>

          <Button
            variant="color"
            size="small"
            aria-label="Ver mais informações do restaurante"
          >
            mais infos
            <ArrowIcon aria-hidden="true" />
          </Button>
        </div>
      </div>

      <RestaurantHeaderInfo restaurant={restaurant} />
    </header>
  );
}
