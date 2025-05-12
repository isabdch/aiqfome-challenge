import { OpenStatus, type Restaurant } from "@/types/restaurants";

export function formatRestaurantStatusText(restaurant: Restaurant): string {
  const { openingHours, status } = restaurant;

  const closingTime = openingHours.split("-")[1];

  if (status === OpenStatus.OPEN) return `fecha às ${closingTime}`;

  return "fechado";
}
