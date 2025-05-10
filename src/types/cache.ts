import { Dish } from "@/types/dishes";
import { Option } from "@/types/options";
import { Choice } from "@/types/choices";
import { Category } from "@/types/categories";
import { Restaurant } from "@/types/restaurants";

export type CacheableEntity = Restaurant | Dish | Option | Choice | Category;

export type CachedDataArray =
  | Restaurant[]
  | Dish[]
  | Option[]
  | Choice[]
  | Category[];
