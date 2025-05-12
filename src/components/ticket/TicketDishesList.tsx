"use client";

import { useRouter } from "next/navigation";

import { useOrderContext } from "@/contexts/OrderContext";

import type { Restaurant } from "@/types/restaurants";

import TicketDishCard from "@/components/ticket/TicketDishCard";

type TicketDishesListProps = {
  restaurant: Restaurant;
};

export default function TicketDishesList({
  restaurant,
}: TicketDishesListProps) {
  const router = useRouter();

  const { getSelectedDishesWithChoices } = useOrderContext();

  const selectedDishesWithSelectedChoices = getSelectedDishesWithChoices();

  if (!selectedDishesWithSelectedChoices.length) {
    return (
      <div className="p-md flex flex-col items-center gap-4xs">
        <p className="text-label text-center">Seu ticket está vazio.</p>

        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-brand text-center underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <ul aria-label={`Itens do pedido no restaurante ${restaurant.name}`}>
      {selectedDishesWithSelectedChoices.map((dish) => (
        <li key={dish.id}>
          <TicketDishCard dish={dish} restaurant={restaurant} />
        </li>
      ))}
    </ul>
  );
}
