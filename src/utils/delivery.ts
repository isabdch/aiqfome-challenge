import { formatCurrency } from "@/utils/currency";

export function deliveryFeeStatus(deliveryFee: number): "free" | "paid" {
  if (deliveryFee === 0) return "free";

  return "paid";
}

export function formatDeliveryText(deliveryFee: number): string {
  if (deliveryFeeStatus(deliveryFee) === "free") return "grátis";

  return formatCurrency(deliveryFee);
}
