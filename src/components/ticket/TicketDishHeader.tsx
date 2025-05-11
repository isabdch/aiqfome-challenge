"use client";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import type { SelectedDish } from "@/types/dishes";

import PriceTag from "@/components/core/PriceTag";

type TicketDishHeaderProps = {
  dish: SelectedDish;
};

export default function TicketDishHeader({ dish }: TicketDishHeaderProps) {
  const { getDishPrice } = useDishOrderContext();

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-bold text-neutral-900">{dish.name}</h3>

      <PriceTag
        price={getDishPrice(dish)}
        discountPosition="top"
        originalPrice={dish.originalPrice}
      />
    </div>
  );
}
