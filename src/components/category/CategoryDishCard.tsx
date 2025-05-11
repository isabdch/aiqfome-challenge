import Link from "next/link";

import type { Dish } from "@/types/dishes";

import PriceTag from "@/components/core/PriceTag";
import CategoryTags from "@/components/category/CategoryTags";

type CategoryDishCardProps = {
  dish: Dish;
};

export default function CategoryDishCard({ dish }: CategoryDishCardProps) {
  return (
    <Link
      className="pl-sm flex justify-between"
      href={`/restaurant/${dish.restaurantId}/dish/${dish.id}`}
    >
      <div className="flex flex-col gap-2xs">
        <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-4xs">
          {dish.name}

          <CategoryTags dish={dish} />
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-2">
          {dish.description}
        </p>
      </div>

      <PriceTag
        icon={!!dish.originalPrice}
        originalPrice={dish.originalPrice}
        discountPosition="top"
        startPrice={!!dish.options.length}
        price={dish.price}
      />
    </Link>
  );
}
