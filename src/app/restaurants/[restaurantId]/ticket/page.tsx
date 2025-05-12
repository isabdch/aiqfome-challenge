import { getRestaurantById } from "@/lib/services/dataService";

import TicketHeader from "@/components/ticket/TicketHeader";
import TicketDishesList from "@/components/ticket/TicketDishesList";

type TicketPageProps = {
  params: {
    restaurantId: string;
  };
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const restaurant = await getRestaurantById(ID);

  if (!restaurant)
    return (
      <div className="p-md text-label text-center">
        Restaurante não encontrado
      </div>
    );

  return (
    <div className="py-lg mb-3md max-container-md">
      <TicketHeader restaurant={restaurant} />
      <TicketDishesList restaurant={restaurant} />
    </div>
  );
}
