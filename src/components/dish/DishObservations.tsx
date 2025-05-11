"use client";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import type { Dish } from "@/types/dishes";

import Textarea from "@/components/core/Textarea";

type DishObservationsProps = {
  dish: Dish;
};

export default function DishObservations({ dish }: DishObservationsProps) {
  const { handleDishObservations, selectedDishes } = useDishOrderContext();

  const currentObservation =
    selectedDishes.find((d) => d.id === dish.id)?.observations || "";

  return (
    <div className="pt-md px-md pb-8xl">
      <Textarea
        placeholder={`alguma observação do item? • opcional
ex: tirar algum ingrediente, ponto do prato`}
        value={currentObservation}
        onChange={(newValue) => handleDishObservations(dish, newValue)}
      />
    </div>
  );
}
