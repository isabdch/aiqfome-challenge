import type { SelectedDish } from "@/types/dishes";
import type { Restaurant } from "@/types/restaurants";

import TicketDishEdit from "@/components/ticket/TicketDishEdit";
import TicketDishHeader from "@/components/ticket/TicketDishHeader";
import TicketDishOptions from "@/components/ticket/TicketDishOptions";
import TicketDishObservations from "@/components/ticket/TicketDishObservations";

type TicketDishCardProps = {
  dish: SelectedDish;
  restaurant: Restaurant;
};

export default function TicketDishCard({
  dish,
  restaurant,
}: TicketDishCardProps) {
  return (
    <article className="p-md border-b-4 border-neutral-100 last:border-b-0 flex flex-col gap-6xs">
      <TicketDishHeader dish={dish} />
      <TicketDishEdit restaurant={restaurant} dish={dish} />
      <TicketDishOptions options={dish.options} />

      {dish.observations && (
        <TicketDishObservations observations={dish.observations} />
      )}
    </article>
  );
}
