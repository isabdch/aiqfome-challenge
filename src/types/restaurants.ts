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

export enum ItemOptionType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  NUMBER = "number",
}

export type Choice = {
  id: number;
  name: string;
  price: number | null;
  originalPrice: number | null;
  additionalPrice: number | null;
};

export type Option = {
  id: number;
  name: string;
  min: number | null;
  max: number | null;
  limit: number | null;
  required: boolean;
  type: ItemOptionType;
  choices: Choice[];
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
};

export type Category = {
  id: number;
  name: string;
  description: string;
  dishes: Dish[];
};

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
