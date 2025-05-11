"use client";

import Link from "next/link";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import type { SelectedDish } from "@/types/dishes";
import type { Restaurant } from "@/types/restaurants";

import Button from "@/components/core/Button";
import Counter from "@/components/core/Counter";

import EditPencilIcon from "@/assets/icons/edit-pencil.svg";

type TicketDishEditProps = {
  dish: SelectedDish;
  restaurant: Restaurant;
};

export default function TicketDishEdit({
  restaurant,
  dish,
}: TicketDishEditProps) {
  const { handleDish } = useDishOrderContext();

  return (
    <div className="flex justify-end items-center gap-lg">
      <Link href={`/restaurants/${restaurant.id}/dishes/${dish.id}`}>
        <Button size="small" variant="color">
          <EditPencilIcon />
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
