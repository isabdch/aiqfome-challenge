export enum TagType {
  SPICY = "spicy",
  VEGAN = "vegan",
  VEGETARIAN = "vegetarian",
  GLUTEN_FREE = "gluten_free",
  LACTOSE_FREE = "lactose_free",
}

export interface Tag {
  id: number;
  type: TagType;
}

export enum ItemOptionType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  NUMBER = "number",
}

export interface Choice {
  id: number;
  name: string;
  price: number | null;
  originalPrice: number | null;
  additionalPrice: number | null;
}

export interface Option {
  id: number;
  name: string;
  min: number | null;
  max: number | null;
  limit: number | null;
  required: boolean;
  type: ItemOptionType;
  choices: Choice[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  tags: Tag[];
  options: Option[];
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  items: MenuItem[];
}

export enum OpenStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export interface Product {
  id: number;
  name: string;
  cover: string;
  rating: number;
  deliveryFee: number;
  open: OpenStatus;
  deliveryTime: string;
  distance: number;
  minOrder: number;
  freeDeliveryOver: number;
  openingHours: string;
  menus: Menu[];
}
