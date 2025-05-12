import { Metadata } from "next";

import { getRestaurantById } from "@/lib/services/dataService";
import { generatePageMetadata, generateNotFoundMetadata } from "@/lib/metadata";

import TicketHeader from "@/components/ticket/TicketHeader";
import TicketDishesList from "@/components/ticket/TicketDishesList";

type TicketPageProps = {
  params: {
    restaurantId: string;
  };
};

export async function generateMetadata({
  params,
}: TicketPageProps): Promise<Metadata> {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const restaurant = await getRestaurantById(ID);

  if (!restaurant) return generateNotFoundMetadata("Restaurante");

  return generatePageMetadata(
    `Pedido - ${restaurant.name}`,
    `Finalize seu pedido no ${restaurant.name}.`
  );
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const restaurant = await getRestaurantById(ID);

  if (!restaurant)
    return (
      <section>
        <h1 className="p-md text-label text-center">
          Restaurante não encontrado
        </h1>
      </section>
    );

  return (
    <section className="py-lg mb-3md max-container-md">
      <TicketHeader restaurant={restaurant} />
      <TicketDishesList restaurant={restaurant} />
    </section>
  );
}
