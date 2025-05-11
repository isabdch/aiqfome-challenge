import type { Category } from "@/types/categories";

export function hasCategoryDiscount(category: Category): boolean {
  return category.dishes.some(
    (dish) => dish.originalPrice && dish.originalPrice > dish.price
  );
}
