"use client";

import Link from "next/link";

import { useOrderContext } from "@/contexts/OrderContext";

import type { SelectedDish } from "@/types/dishes";
import type { Restaurant } from "@/types/restaurants";

import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

import EditPencilIcon from "@/assets/icons/edit-pencil.svg";

type TicketDishEditProps = {
  dish: SelectedDish;
  restaurant: Restaurant;
};

export default function TicketDishEdit({
  restaurant,
  dish,
}: TicketDishEditProps) {
  const { handleDish } = useOrderContext();

  return (
    <div className="flex justify-end items-center gap-lg">
      <Link
        href={`/restaurants/${restaurant.id}/dishes/${dish.id}`}
        aria-label={`Editar item: ${dish.name}`}
      >
        <Button size="small" variant="color" aria-hidden="true" tabIndex={-1}>
          <EditPencilIcon aria-hidden="true" />
          editar
        </Button>
      </Link>

      <Counter
        trash
        value={dish.quantity}
        onChange={(value) => handleDish(dish, value)}
      />
    </div>
  );
}
