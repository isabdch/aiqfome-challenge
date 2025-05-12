import RestaurantCard from "@/components/restaurant/RestaurantCard";

import type { Restaurant } from "@/types/restaurants";

type RestaurantsListProps = {
  title: string;
  restaurants: Restaurant[];
};

export default function RestaurantsList({
  title,
  restaurants,
}: RestaurantsListProps) {
  return (
    <section className="max-container-md">
      <h2 className="text-lg font-bold text-brand mb-md">{title}</h2>

      <ul className="flex flex-col gap-md">
        {!restaurants.length ? (
          <li className="text-label">Nenhum restaurante encontrado</li>
        ) : (
          restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
