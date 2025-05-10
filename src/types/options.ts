import type { Choice } from "@/types/choices";

export enum ItemOptionType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  NUMBER = "number",
}

export type Option = {
  id: number;
  name: string;
  min: number | null;
  max: number | null;
  limit: number | null;
  required: boolean;
  type: ItemOptionType;
  choices: Choice[];
  dishId: number;
};
