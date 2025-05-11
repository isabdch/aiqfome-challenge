import type { Option } from "@/types/options";

export enum TagType {
  SPICY = "spicy",
  VEGAN = "vegan",
}

export type Tag = {
  id: string;
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
