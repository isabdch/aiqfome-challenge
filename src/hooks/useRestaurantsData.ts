import { useState, useEffect, useMemo } from "react";

import type { Restaurant } from "@/types/restaurants";

type UseRestaurantsDataParams = {
  searchTerm: string;
};

type UseRestaurantsDataReturn = {
  restaurants: Restaurant[];
  openRestaurants: Restaurant[];
  closedRestaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
};

export function useRestaurantsData({
  searchTerm,
}: UseRestaurantsDataParams): UseRestaurantsDataReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allFetchedRestaurants, setAllFetchedRestaurants] = useState<
    Restaurant[]
  >([]);

  useEffect(() => {
    async function fetchRestaurantsData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/restaurants");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setAllFetchedRestaurants(data);
      } catch (e) {
        console.error("Failed to fetch restaurants from API:", e);

        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurantsData();
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (!searchTerm.trim()) return allFetchedRestaurants;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return allFetchedRestaurants.filter((restaurant) => {
      const nameMatch = restaurant.name
        .toLowerCase()
        .includes(lowercasedSearchTerm);

      const tagMatch =
        restaurant.tags &&
        Array.isArray(restaurant.tags) &&
        restaurant.tags.some((tag) =>
          tag.toLowerCase().includes(lowercasedSearchTerm)
        );

      return nameMatch || tagMatch;
    });
  }, [allFetchedRestaurants, searchTerm]);

  const openRestaurants = useMemo(
    () =>
      filteredRestaurants.filter((restaurant) => restaurant.status === "open"),
    [filteredRestaurants]
  );

  const closedRestaurants = useMemo(
    () =>
      filteredRestaurants.filter(
        (restaurant) => restaurant.status === "closed"
      ),
    [filteredRestaurants]
  );

  return {
    restaurants: filteredRestaurants,
    openRestaurants,
    closedRestaurants,
    isLoading,
    error,
  };
}
