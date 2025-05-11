"use client";

import { useState } from "react";

import { hasCategoryDiscount } from "@/utils/category";

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
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    1: true,
  });

  const toggleCategory = (categoryId: number) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [categoryId]: !prevStates[categoryId],
    }));
  };

  return (
    <div>
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
            {category.dishes.length > 0 && (
              <div className="flex flex-col gap-lg">
                {category.dishes.map((dish) => (
                  <CategoryDishCard key={dish.id} dish={dish} />
                ))}
              </div>
            )}
          </Collapse>
        );
      })}
    </div>
  );
}
