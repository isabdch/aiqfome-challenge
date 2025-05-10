import { readJson } from "@/lib/readJson";

import type { Restaurant } from "@/types/restaurants";

import Banner from "@/components/core/Banner";
import RestaurantsList from "@/components/RestaurantsList";

export default async function Home() {
  const restaurants = await readJson<Restaurant[]>("src/data/restaurants.json");

  const openRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "open"
  );

  const closedRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "closed"
  );

  return (
    <main>
      <Banner image="/images/banner.webp" />

      <section className="py-lg px-md flex flex-col gap-2xl">
        <RestaurantsList title="abertos" restaurants={openRestaurants} />
        <RestaurantsList title="fechados" restaurants={closedRestaurants} />
      </section>
    </main>
  );
}
