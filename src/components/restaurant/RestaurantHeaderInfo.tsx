import Link from "next/link";

import {
  DELIVERY_TEXT_COLOR_VARIANTS,
  RESTAURANT_STATUS_COLOR_VARIANTS,
} from "@/constants/styles";

import { formatCurrency } from "@/utils/currency";
import { formatRestaurantStatusText } from "@/utils/restaurants";
import { deliveryFeeStatus, formatDeliveryText } from "@/utils/delivery";

import type { Restaurant } from "@/types/restaurants";

import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/ui/ArrowIcon";

import StarIcon from "@/assets/icons/star.svg";
import MotorcycleIcon from "@/assets/icons/motorcycle.svg";

type RestaurantHeaderInfoProps = {
  restaurant: Restaurant;
};

export default function RestaurantHeaderInfo({
  restaurant,
}: RestaurantHeaderInfoProps) {
  const deliveryTextColorVariant =
    DELIVERY_TEXT_COLOR_VARIANTS[deliveryFeeStatus(restaurant.deliveryFee)];

  const restaurantStatusColorVariant =
    RESTAURANT_STATUS_COLOR_VARIANTS[restaurant.status];

  return (
    <div className="flex flex-col gap-sm" aria-label="Informações do restaurante">
      <div className="flex items-center gap-6xs">
        <Link
          href={`/restaurants/${restaurant.id}`}
          className={`${deliveryTextColorVariant} flex items-center gap-4xs`}
          aria-label={`Taxa de entrega: ${formatDeliveryText(restaurant.deliveryFee)}`}
        >
          <MotorcycleIcon aria-hidden="true" />

          <span className="text-sm font-bold">
            {formatDeliveryText(restaurant.deliveryFee)}
          </span>

          <ArrowIcon aria-hidden="true" />
        </Link>

        <div className="dot-separator" aria-hidden="true" />

        <p className="text-xs-bold-neutral-500">
          hoje, {restaurant.deliveryTime}
        </p>

        <div className="dot-separator" aria-hidden="true" />

        <p className="text-xs-bold-neutral-500">{restaurant.distance}km</p>
      </div>

      {restaurant.freeDeliveryOver && (
        <Badge
          text={`entrega grátis acima de ${formatCurrency(
            restaurant.freeDeliveryOver
          )}`}
          variant="background"
        />
      )}

      <div className="flex items-center gap-6xs">
        <Link
          href={`/restaurants/${restaurant.id}`}
          className="flex items-center text-neutral-500 gap-4xs"
          aria-label={`Avaliação: ${restaurant.rating} de 5 estrelas`}
        >
          <StarIcon width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" />

          <span className="text-xs-bold-neutral-500">
            {restaurant.rating} de 5
          </span>

          <ArrowIcon aria-hidden="true" />
        </Link>

        <div className="dot-separator" aria-hidden="true" />

        <p 
          className={`${restaurantStatusColorVariant} font-bold text-xs`}
          aria-label={`Status: ${formatRestaurantStatusText(restaurant)}`}
        >
          {formatRestaurantStatusText(restaurant)}
        </p>
      </div>

      <p className="text-xs-bold-neutral-500">
        pedido mínimo: {formatCurrency(restaurant.minOrder)}
      </p>
    </div>
  );
}
