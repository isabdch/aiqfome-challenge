"use client";

import { useSearch } from "@/contexts/SearchContext";

import { useRestaurantsData } from "@/hooks/useRestaurantsData";

import Banner from "@/components/ui/Banner";
import RestaurantsList from "@/components/restaurant/RestaurantsList";

export default function Home() {
  const { searchTerm } = useSearch();
  const {
    restaurants: filteredRestaurants,
    openRestaurants,
    closedRestaurants,
  } = useRestaurantsData({ searchTerm });

  return (
    <article>
      <h1 className="sr-only">Restaurantes disponíveis</h1>

      <Banner image="/images/banner.webp" alt="Banner" />

      <section className="py-lg px-md flex flex-col gap-2xl max-container-md mx-auto">
        <h2 className="sr-only">Listas de Restaurantes</h2>

        {filteredRestaurants.length === 0 && searchTerm.length > 0 ? (
          <p className="text-center text-label">
            Nenhum restaurante encontrado para &quot;{searchTerm}&quot;.
          </p>
        ) : (
          <>
            <RestaurantsList title="abertos" restaurants={openRestaurants} />
            <RestaurantsList title="fechados" restaurants={closedRestaurants} />
          </>
        )}
      </section>
    </article>
  );
}
