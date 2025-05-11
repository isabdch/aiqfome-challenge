export type Choice = {
  id: number;
  name: string;
  price: number | null;
  originalPrice: number | null;
  additionalPrice: number | null;
  optionId: number;
  dishId: number;
};

export type SelectedChoice = Choice & { quantity: number };