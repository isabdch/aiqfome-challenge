import type { Option } from "@/types/options";

export enum TagType {
  SPICY = "spicy",
  VEGAN = "vegan",
  VEGETARIAN = "vegetarian",
  GLUTEN_FREE = "gluten_free",
  LACTOSE_FREE = "lactose_free",
}

export type Tag = {
  id: number;
  type: TagType;
};

export type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  tags: Tag[];
  options: Option[];
  restaurantId: number;
  categoryId: number;
};
