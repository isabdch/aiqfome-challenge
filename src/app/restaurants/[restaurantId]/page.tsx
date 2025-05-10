import { getRestaurantById } from "@/lib/services/dataService";

type RestaurantPageProps = {
  params: {
    restaurantId: string;
  };
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = params;

  const restaurant = await getRestaurantById(Number(restaurantId));

  if (!restaurant) return <div>Restaurante não encontrado</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
    </div>
  );
}
