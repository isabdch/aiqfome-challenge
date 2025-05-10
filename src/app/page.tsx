import { getRestaurants } from "@/lib/services/dataService";

import Banner from "@/components/core/Banner";
import RestaurantsList from "@/components/RestaurantsList";

export default async function Home() {
  const restaurants = await getRestaurants();

  const openRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "open"
  );

  const closedRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "closed"
  );

  return (
    <div>
      <Banner image="/images/banner.webp" />

      <section className="py-lg px-md flex flex-col gap-2xl">
        <RestaurantsList title="abertos" restaurants={openRestaurants} />
        <RestaurantsList title="fechados" restaurants={closedRestaurants} />
      </section>
    </div>
  );
}
