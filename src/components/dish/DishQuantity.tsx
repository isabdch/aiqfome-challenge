"use client";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import { formatCurrency } from "@/utils/currency";

import type { Dish } from "@/types/dishes";

import Button from "@/components/core/Button";
import Counter from "@/components/core/Counter";

type DishQuantitySectionProps = {
  dish: Dish;
};

export default function DishQuantitySection({
  dish,
}: DishQuantitySectionProps) {
  const { handleDish, dishIsAlreadySelected, selectedDish, getDishPrice } =
    useDishOrderContext();

  return (
    <section className="pt-sm pb-lg px-md border-b-4 border-neutral-100 flex items-center justify-between">
      <div className="flex flex-col gap-6xs">
        <p className="text-md-bold-neutral-700">quantos?</p>

        <p className="text-sm font-semibold text-neutral-500">
          total{" "}
          <span className="text-md-bold-neutral-700">
            {formatCurrency(getDishPrice(selectedDish(dish)))}
          </span>
        </p>
      </div>

      {dishIsAlreadySelected(dish) ? (
        <Counter
          trash
          size="large"
          value={selectedDish(dish)?.quantity || 0}
          onChange={(value) => handleDish(dish, value)}
        />
      ) : (
        <Button
          size="medium"
          variant="secondary"
          onClick={() => handleDish(dish, 1)}
        >
          adicionar
        </Button>
      )}
    </section>
  );
}
