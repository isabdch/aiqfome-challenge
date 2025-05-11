"use client";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import type { Restaurant } from "@/types/restaurants";

import TicketDishCard from "@/components/ticket/TicketDishCard";

type TicketDishesListProps = {
  restaurant: Restaurant;
};

export default function TicketDishesList({
  restaurant,
}: TicketDishesListProps) {
  const { getSelectedDishesWithChoices } = useDishOrderContext();

  const selectedDishesWithSelectedChoices = getSelectedDishesWithChoices();

  return (
    <div>
      {selectedDishesWithSelectedChoices.map((dish) => (
        <TicketDishCard key={dish.id} dish={dish} restaurant={restaurant} />
      ))}
    </div>
  );
}
