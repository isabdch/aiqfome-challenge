import { getRestaurantById } from "@/lib/services/dataService";

import RestaurantHeader from "@/components/RestaurantHeader";

type RestaurantPageProps = {
  params: {
    restaurantId: string;
  };
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = params;

  const id = Number(restaurantId);

  const restaurant = await getRestaurantById(id);

  if (!restaurant) return <div>Restaurante não encontrado</div>;

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
}
