import {
  getRestaurantById,
  getCategoriesWithDishes,
} from "@/lib/services/dataService";

import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantCategories from "@/components/restaurant/RestaurantCategories";

type RestaurantPageProps = {
  params: {
    restaurantId: string;
  };
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const [restaurant, categories] = await Promise.all([
    getRestaurantById(ID),
    getCategoriesWithDishes(ID),
  ]);

  if (!restaurant)
    return (
      <div className="p-md text-label text-center">
        Restaurante não encontrado
      </div>
    );

  return (
    <div className="max-container-md">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories categories={categories} />
    </div>
  );
}
