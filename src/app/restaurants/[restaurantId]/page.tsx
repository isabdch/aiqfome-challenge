import { Metadata } from "next";

import {
  getRestaurantById,
  getCategoriesWithDishes,
} from "@/lib/services/dataService";
import { generatePageMetadata, generateNotFoundMetadata } from "@/lib/metadata";

import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantCategories from "@/components/restaurant/RestaurantCategories";

type RestaurantPageProps = {
  params: {
    restaurantId: string;
  };
};

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const restaurant = await getRestaurantById(ID);

  if (!restaurant) return generateNotFoundMetadata("Restaurante");

  return generatePageMetadata(
    restaurant.name,
    `Cardápio do restaurante ${restaurant.name}. Faça seu pedido!`
  );
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params;

  const ID = Number(restaurantId);

  const [restaurant, categories] = await Promise.all([
    getRestaurantById(ID),
    getCategoriesWithDishes(ID),
  ]);

  if (!restaurant)
    return (
      <section>
        <h1 className="p-md text-label text-center">
          Restaurante não encontrado
        </h1>
      </section>
    );

  return (
    <section className="max-container-md">
      <RestaurantHeader restaurant={restaurant} />

      <section aria-label="Cardápio do restaurante">
        <RestaurantCategories categories={categories} />
      </section>
    </section>
  );
}
