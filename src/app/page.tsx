"use client";

import { useSearch } from "@/contexts/SearchContext";

import { useRestaurantsData } from "@/hooks/useRestaurantsData";

import Banner from "@/components/core/Banner";
import RestaurantsList from "@/components/restaurant/RestaurantsList";

export default function Home() {
  const { searchTerm } = useSearch();
  const {
    restaurants: filteredRestaurants,
    openRestaurants,
    closedRestaurants,
  } = useRestaurantsData({ searchTerm });

  return (
    <div>
      <Banner image="/images/banner.webp" />

      <section className="py-lg px-md flex flex-col gap-2xl max-container-md mx-auto">
        {filteredRestaurants.length === 0 && searchTerm.length > 0 ? (
          <p className="text-center text-neutral-500 text-sm">
            Nenhum restaurante encontrado para &quot;{searchTerm}&quot;.
          </p>
        ) : (
          <>
            <RestaurantsList title="abertos" restaurants={openRestaurants} />
            <RestaurantsList title="fechados" restaurants={closedRestaurants} />
          </>
        )}
      </section>
    </div>
  );
}
