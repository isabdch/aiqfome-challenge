export function dishDiscountStatus(hasDiscount: boolean): "discount" | "default" {
  return hasDiscount ? "discount" : "default";
}
