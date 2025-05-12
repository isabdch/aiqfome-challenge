import { useState, useEffect, useMemo } from "react";

import { formatDeliveryText } from "@/utils/delivery";
import { formatCategoryStatus } from "@/utils/categories";

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

  const checkSearchTerm = (item: string | number, term: string) => {
    if (typeof item === "string") return item.toLowerCase().includes(term);

    return item.toString().includes(term);
  };

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
      const nameMatch = checkSearchTerm(restaurant.name, lowercasedSearchTerm);

      const tagMatch =
        restaurant.tags &&
        Array.isArray(restaurant.tags) &&
        restaurant.tags.some((tag) =>
          checkSearchTerm(tag, lowercasedSearchTerm)
        );

      const imageMatch = checkSearchTerm(
        restaurant.cover,
        lowercasedSearchTerm
      );

      const deliveryFeeMatch =
        checkSearchTerm(restaurant.deliveryFee, lowercasedSearchTerm) ||
        checkSearchTerm(
          formatDeliveryText(restaurant.deliveryFee),
          lowercasedSearchTerm
        );

      const statusMatch =
        checkSearchTerm(restaurant.status, lowercasedSearchTerm) ||
        checkSearchTerm(
          formatCategoryStatus(restaurant.status),
          lowercasedSearchTerm
        );

      const ratingMatch = checkSearchTerm(
        restaurant.rating,
        lowercasedSearchTerm
      );

      return (
        nameMatch ||
        tagMatch ||
        imageMatch ||
        deliveryFeeMatch ||
        ratingMatch ||
        statusMatch
      );
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
