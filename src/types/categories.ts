import type { Dish } from "@/types/dishes";

export type Category = {
  id: number;
  name: string;
  description: string;
  dishes: Dish[];
  restaurantId: number;
};
