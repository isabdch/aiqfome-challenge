"use client";

import { useOrderContext } from "@/contexts/OrderContext";

import { formatCurrency } from "@/utils/currency";

import type { Dish } from "@/types/dishes";

import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

type DishQuantitySectionProps = {
  dish: Dish;
};

export default function DishQuantitySection({
  dish,
}: DishQuantitySectionProps) {
  const { handleDish, dishIsAlreadySelected, selectedDish, getDishPrice } =
    useOrderContext();

  const isSelected = dishIsAlreadySelected(dish);
  const quantity = selectedDish(dish)?.quantity || 0;

  return (
    <section className="pt-sm pb-lg px-md border-b-4 border-neutral-100 flex items-center justify-between">
      <div className="flex flex-col gap-6xs">
        <h3 className="text-md-bold-neutral-700">quantos?</h3>

        <p className="text-sm font-semibold text-neutral-500">
          total{" "}
          <span className="text-md-bold-neutral-700">
            {formatCurrency(getDishPrice(selectedDish(dish)))}
          </span>
        </p>
      </div>

      {isSelected ? (
        <Counter
          trash
          size="large"
          value={quantity}
          onChange={(value) => handleDish(dish, value)}
        />
      ) : (
        <Button
          size="medium"
          variant="secondary"
          onClick={() => handleDish(dish, 1)}
          aria-label={`Adicionar ${dish.name} ao pedido`}
        >
          adicionar
        </Button>
      )}
    </section>
  );
}
