import { formatCurrency } from "@/utils/currency";

import { OpenStatus, type Restaurant } from "@/types/restaurants";

export function deliveryFeeStatus(deliveryFee: number): "free" | "paid" {
  if (deliveryFee === 0) return "free";

  return "paid";
}

export function formatDeliveryText(deliveryFee: number): string {
  if (deliveryFeeStatus(deliveryFee) === "free") return "grátis";

  return formatCurrency(deliveryFee);
}

export function formatRestaurantStatusText(restaurant: Restaurant): string {
  const { openingHours, status } = restaurant;

  const closingTime = openingHours.split("-")[1];

  if (status === OpenStatus.OPEN) return `fecha às ${closingTime}`;

  return "fechado";
}
