import type { Dish } from "@/types/dishes";

import { dishHasPriceOptions } from "@/utils/dish";

import PriceTag from "@/components/core/PriceTag";

type DishHeaderProps = {
  dish: Dish;
};

export default function DishHeader({ dish }: DishHeaderProps) {
  return (
    <header className="p-md flex flex-col gap-6xs">
      <h1 className="text-lg font-bold text-neutral-700">{dish.name}</h1>

      <div className="flex items-center gap-sm">
        {dishHasPriceOptions(dish) && (
          <span className="text-sm text-neutral-500 font-extrabold">
            a partir de
          </span>
        )}

        <PriceTag
          size="lg"
          price={dish.price}
          discountPosition="left"
          originalPrice={dish.originalPrice}
        />
      </div>

      {dish.description && (
        <p className="text-sm text-neutral-500">{dish.description}</p>
      )}
    </header>
  );
}
