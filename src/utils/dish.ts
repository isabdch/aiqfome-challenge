import type { Dish } from "@/types/dishes";
import type { Option } from "@/types/options";

export function dishDiscountStatus(
  hasDiscount: boolean
): "discount" | "default" {
  return hasDiscount ? "discount" : "default";
}

export function dishHasPriceOptions(dish: Dish): boolean {
  return dish.options.some((option) =>
    option.choices.some((choice) => !!choice.price)
  );
}

export function formatDishOptionLabel(option: Option): string {
  if (option.min && option.max) return `de ${option.min} a ${option.max}`;

  if (option.limit) return `até ${option.limit}`;

  if (option.max) return `${option.max}`;

  return "quantos quiser";
}
