import RestaurantCard from "@/components/RestaurantCard";

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
    <article className="max-container-md">
      <h2 className="text-lg font-bold text-brand mb-md">{title}</h2>

      <div className="flex flex-col gap-md">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </article>
  );
}
