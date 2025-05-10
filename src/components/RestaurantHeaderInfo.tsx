import {
  DELIVERY_TEXT_COLOR_VARIANTS,
  RESTAURANT_STATUS_COLOR_VARIANTS,
} from "@/constants/styles";

import {
  deliveryFeeStatus,
  formatDeliveryText,
  formatRestaurantStatusText,
} from "@/utils/restaurant";
import { formatCurrency } from "@/utils/currency";

import type { Restaurant } from "@/types/restaurants";

import Badge from "@/components/core/Badge";
import ArrowIcon from "@/components/core/ArrowIcon";

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
    <div className="flex flex-col gap-sm">
      <div className="flex items-center gap-6xs">
        <div
          className={`${deliveryTextColorVariant} flex items-center gap-4xs`}
        >
          <MotorcycleIcon />

          <span className="text-sm font-bold">
            {formatDeliveryText(restaurant.deliveryFee)}
          </span>

          <ArrowIcon />
        </div>

        <div className="dot-separator" />

        <p className="text-xs-bold-neutral-500">
          hoje, {restaurant.deliveryTime}
        </p>

        <div className="dot-separator" />

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
        <div className="flex items-center text-neutral-500 gap-4xs">
          <StarIcon width={16} height={16} viewBox="0 0 24 24" />

          <span className="text-xs-bold-neutral-500">
            {restaurant.rating} de 5
          </span>

          <ArrowIcon />
        </div>

        <div className="dot-separator" />

        <p className={`${restaurantStatusColorVariant} font-bold text-xs`}>
          {formatRestaurantStatusText(restaurant)}
        </p>
      </div>

      <p className="text-xs-bold-neutral-500">
        pedido mínimo: {formatCurrency(restaurant.minOrder)}
      </p>
    </div>
  );
}
