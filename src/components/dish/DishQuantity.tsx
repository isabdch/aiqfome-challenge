"use client";

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
  return (
    <section className="pt-sm pb-lg px-md border-b-4 border-neutral-100 flex items-center justify-between">
      <div className="flex flex-col gap-6xs">
        <p className="text-md-bold-neutral-700">quantos?</p>

        <p className="text-sm font-semibold text-neutral-500">
          total{" "}
          <span className="text-md-bold-neutral-700">
            {formatCurrency(dish.price)}
          </span>
        </p>
      </div>

      <Button size="medium" variant="secondary">
        adicionar
      </Button>
    </section>
  );
}
