import Link from "next/link";
import Image from "next/image";

import { DELIVERY_TEXT_COLOR_VARIANTS } from "@/constants/styles";

import { deliveryFeeStatus, formatDeliveryText } from "@/utils/delivery";

import type { Restaurant } from "@/types/restaurants";

import StarIcon from "@/assets/icons/star.svg";
import AiqentregaIcon from "@/assets/icons/aiqentrega.svg";
import MotorcycleIcon from "@/assets/icons/motorcycle.svg";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const IMG_SIZE = 72;

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
          src={restaurant.cover || "/images/restaurant.webp"}
          className={
            restaurant.status === "open" ? "opacity-100" : "opacity-40"
          }
        />
      </div>

      <div className="pr-3sm py-3sm flex flex-col flex-1 justify-center gap-4xs">
        <h3 className="text-md-bold-neutral-700 line-clamp-1">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-4xs">
          <div
            className={`flex items-center gap-2xs ${
              DELIVERY_TEXT_COLOR_VARIANTS[
                deliveryFeeStatus(restaurant.deliveryFee)
              ]
            }`}
          >
            {deliveryFeeStatus(restaurant.deliveryFee) === "free" ? (
              <MotorcycleIcon />
            ) : (
              <AiqentregaIcon />
            )}

            <span className="text-sm font-bold">
              {formatDeliveryText(restaurant.deliveryFee)}
            </span>
          </div>

          <div className="dot-separator ml-2xs" />

          <div className="flex items-center gap-2xs">
            <StarIcon />

            <span className="text-sm font-bold text-neutral-500">
              {restaurant.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
