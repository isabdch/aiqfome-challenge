import type { Dish } from "@/types/dishes";

import { formatCurrency } from "@/utils/currency";
import { dishHasPriceOptions } from "@/utils/dish";

type DishHeaderProps = {
  dish: Dish;
};

export default function DishHeader({ dish }: DishHeaderProps) {
  return (
    <div className="p-md flex flex-col gap-6xs">
      <h1 className="text-lg font-bold text-neutral-700">{dish.name}</h1>

      <div className="flex items-center gap-sm">
        {dishHasPriceOptions(dish) && (
          <span className="text-sm text-neutral-500 font-extrabold">
            a partir de
          </span>
        )}

        <span className="text-2md font-extrabold text-brand">
          {formatCurrency(dish.price)}
        </span>
      </div>

      <p className="text-sm text-neutral-500">{dish.description}</p>
    </div>
  );
}
