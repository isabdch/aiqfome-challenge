import Link from "next/link";

import { dishHasPriceOptions } from "@/utils/dish";

import type { Dish } from "@/types/dishes";

import PriceTag from "@/components/core/PriceTag";
import CategoryTags from "@/components/category/CategoryTags";

type CategoryDishCardProps = {
  dish: Dish;
};

export default function CategoryDishCard({ dish }: CategoryDishCardProps) {
  return (
    <article>
      <Link
        aria-label={dish.name}
        className="pl-sm flex justify-between"
        href={`/restaurants/${dish.restaurantId}/dishes/${dish.id}`}
      >
        <div className="flex flex-col gap-2xs">
          <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-4xs">
            {dish.name}

            <CategoryTags dish={dish} />
          </h3>

          {dish.description && (
            <p className="text-xs text-neutral-500 line-clamp-2">
              {dish.description}
            </p>
          )}
        </div>

        <PriceTag
          price={dish.price}
          discountPosition="top"
          icon={!!dish.originalPrice}
          originalPrice={dish.originalPrice}
          startPrice={dishHasPriceOptions(dish)}
        />
      </Link>
    </article>
  );
}
