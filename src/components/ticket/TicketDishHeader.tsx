"use client";

import { useOrderContext } from "@/contexts/OrderContext";

import type { SelectedDish } from "@/types/dishes";

import PriceTag from "@/components/ui/PriceTag";

type TicketDishHeaderProps = {
  dish: SelectedDish;
};

export default function TicketDishHeader({ dish }: TicketDishHeaderProps) {
  const { getDishPrice } = useOrderContext();

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
