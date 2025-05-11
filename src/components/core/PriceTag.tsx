import {
  PRICE_TAG_COLOR_VARIANTS,
  PRICE_TAG_SIZE_VARIANTS,
} from "@/constants/styles";

import { formatCurrency } from "@/utils/currency";
import { dishDiscountStatus } from "@/utils/dish";

import DiscountIcon from "@/assets/icons/discount.svg";

type PriceTagProps = {
  price: number;
  icon?: boolean;
  size?: "sm" | "md" | "lg";
  additional?: boolean;
  startPrice?: boolean;
  originalPrice?: number | null;
  color?: "primary" | "secondary";
  discountPosition?: "left" | "top";
};

export default function PriceTag({
  icon,
  price,
  additional,
  startPrice,
  size = "md",
  color = "primary",
  originalPrice,
  discountPosition,
}: PriceTagProps) {
  const ICON_SIZE = 16;

  const hasDiscount = !!originalPrice;
  const priceColor = hasDiscount ? dishDiscountStatus(hasDiscount) : color;

  return (
    <div className="h-fit flex items-center gap-2xs">
      {originalPrice && discountPosition === "left" && (
        <span className="mr-2xs text-xs-bold-neutral-500">
          de {formatCurrency(originalPrice)} por
        </span>
      )}

      <div className="flex flex-col gap-2xs">
        {startPrice && (
          <span className="text-xs-bold-neutral-500 text-center">
            a partir de
          </span>
        )}

        {originalPrice && discountPosition === "top" && (
          <span className="text-xs-bold-neutral-500 text-right line-through">
            {formatCurrency(originalPrice)}
          </span>
        )}

        <p
          className={`flex items-center gap-2xs ${PRICE_TAG_SIZE_VARIANTS[size]}  ${PRICE_TAG_COLOR_VARIANTS[priceColor]}`}
        >
          {icon && (
            <DiscountIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              viewBox="0 0 24 24"
            />
          )}

          {additional && "+"}
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
}
