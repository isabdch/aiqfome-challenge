import type { Category } from "@/types/categories";

export enum OpenStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export type Restaurant = {
  id: number;
  name: string;
  cover: string;
  rating: number;
  deliveryFee: number;
  status: OpenStatus;
  deliveryTime: string;
  distance: number;
  minOrder: number;
  freeDeliveryOver: number;
  openingHours: string;
  categories: Category[];
};
