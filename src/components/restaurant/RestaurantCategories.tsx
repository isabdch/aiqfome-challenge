"use client";

import { hasCategoryDiscount } from "@/utils/category";

import { useCategoriesStates } from "@/hooks/useCategoriesStates";

import type { Category } from "@/types/categories";

import Collapse from "@/components/core/Collapse";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryDishCard from "@/components/category/CategoryDishCard";

type RestaurantCategoriesProps = {
  categories: Category[];
};

export default function RestaurantCategories({
  categories,
}: RestaurantCategoriesProps) {
  const { openStates, toggleCategory } = useCategoriesStates(categories);

  return (
    <section aria-label="Categorias do restaurante">
      {categories.map((category) => {
        const isOpen = openStates[category.id] || false;

        return (
          <Collapse
            isOpen={isOpen}
            key={category.id}
            onToggle={() => toggleCategory(category.id)}
            title={
              <CategoryHeader
                isOpen={isOpen}
                category={category}
                hasDiscount={hasCategoryDiscount(category)}
              />
            }
          >
            {category.dishes.length > 0 ? (
              <ul className="flex flex-col gap-lg">
                {category.dishes.map((dish) => (
                  <li key={dish.id}>
                    <CategoryDishCard dish={dish} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-neutral-500">
                Nenhum prato disponível nesta categoria
              </p>
            )}
          </Collapse>
        );
      })}
    </section>
  );
}
