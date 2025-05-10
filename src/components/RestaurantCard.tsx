import Link from "next/link";
import Image from "next/image";

import { deliveryFeeStatus, formatDeliveryText } from "@/utils/delivery";

import type { Restaurant } from "@/types/restaurants";

import Star from "@/assets/icons/star.svg";
import Aiqentrega from "@/assets/icons/aiqentrega.svg";
import Motorcycle from "@/assets/icons/motorcycle.svg";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const IMG_SIZE = 72;

  const textColorVariants = {
    free: "text-teal-600",
    paid: "text-brand",
  };

  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="bg-neutral-50 rounded-md overflow-hidden flex gap-3sm"
    >
      <div className="relative rounded-l-md overflow-hidden border border-neutral-100 flex items-center justify-center">
        <Image
          loading="lazy"
          width={IMG_SIZE}
          height={IMG_SIZE}
          alt={restaurant.name}
          src={restaurant.cover}
          className={
            restaurant.status === "open" ? "opacity-100" : "opacity-40"
          }
        />
      </div>

      <div className="pr-3sm py-3sm flex flex-col flex-1 justify-center gap-3xs">
        <h3 className="text-md font-bold text-neutral-700 line-clamp-1">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-3xs">
          <div className="flex items-center gap-xs">
            {deliveryFeeStatus(restaurant.deliveryFee) === "free" ? (
              <Motorcycle />
            ) : (
              <Aiqentrega />
            )}

            <span
              className={`${
                textColorVariants[deliveryFeeStatus(restaurant.deliveryFee)]
              } text-sm font-bold`}
            >
              {formatDeliveryText(restaurant.deliveryFee)}
            </span>
          </div>

          <div className="w-icon-micro h-icon-micro bg-neutral-400 rounded-full ml-xs" />

          <div className="flex items-center gap-xs">
            <Star />

            <span className="text-sm font-bold text-neutral-500">
              {restaurant.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
