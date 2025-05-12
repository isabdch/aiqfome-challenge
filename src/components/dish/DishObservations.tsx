"use client";

import { useOrderContext } from "@/contexts/OrderContext";

import type { Dish } from "@/types/dishes";

import Textarea from "@/components/ui/Textarea";

type DishObservationsProps = {
  dish: Dish;
};

export default function DishObservations({ dish }: DishObservationsProps) {
  const { handleDishObservations, selectedDishes } = useOrderContext();

  const currentObservation =
    selectedDishes.find((d) => d.id === dish.id)?.observations || "";

  return (
    <section className="pt-md px-md pb-8xl">
      <h3 className="sr-only">Observações do prato</h3>

      <Textarea
        placeholder={`alguma observação do item? • opcional
ex: tirar algum ingrediente, ponto do prato`}
        value={currentObservation}
        onChange={(newValue) => handleDishObservations(dish, newValue)}
      />
    </section>
  );
}
