import { readJson } from "@/lib/readJson";

import type { Dish } from "@/types/dishes";
import type { Option } from "@/types/options";
import type { Choice } from "@/types/choices";
import type { Category } from "@/types/categories";
import type { Restaurant } from "@/types/restaurants";
import type { CacheableEntity, CachedDataArray } from "@/types/cache";

const DISHES_FILE = "src/data/dishes.json";
const OPTIONS_FILE = "src/data/options.json";
const CHOICES_FILE = "src/data/choices.json";
const CATEGORIES_FILE = "src/data/categories.json";
const RESTAURANTS_FILE = "src/data/restaurants.json";

const cache: Record<string, CachedDataArray> = {};

async function fetchData<T extends CacheableEntity>(
  filePath: string
): Promise<T[]> {
  const cachedValue = cache[filePath];

  if (cachedValue) return cachedValue as T[];

  try {
    const dataArray = await readJson<T[]>(filePath);

    if (!dataArray) {
      const emptyData: T[] = [];

      cache[filePath] = emptyData as CachedDataArray;

      return emptyData;
    }

    cache[filePath] = dataArray as CachedDataArray;

    return dataArray;
  } catch {
    const emptyDataOnError: T[] = [];

    cache[filePath] = emptyDataOnError as CachedDataArray;

    return emptyDataOnError;
  }
}

// --- RESTAURANTS ---
export async function getRestaurants(): Promise<Restaurant[]> {
  return fetchData<Restaurant>(RESTAURANTS_FILE);
}

export async function getRestaurantById(
  id: number
): Promise<Restaurant | undefined> {
  const restaurants = await getRestaurants();

  return restaurants.find((restaurant) => restaurant.id === id);
}

export async function getFullRestaurantDetails(
  restaurantId: number
): Promise<Restaurant | undefined> {
  const restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) return undefined;

  const categoriesForRestaurant = await getCategoriesByRestaurantId(
    restaurantId
  );

  const categoriesWithDishes = await Promise.all(
    categoriesForRestaurant.map(async (category) => {
      const dishesForCategory = await getDishesByCategoryId(category.id);

      const dishesWithDetails = await Promise.all(
        dishesForCategory.map((dish) => getDishWithDetails(dish.id))
      );

      return {
        ...category,
        dishes: dishesWithDetails.filter(
          (dish) => dish !== undefined
        ) as (Dish & {
          options?: (Option & { choices?: Choice[] })[];
        })[],
      };
    })
  );

  return { ...restaurant, categories: categoriesWithDishes };
}

// --- CATEGORIES ---
export async function getCategories(): Promise<Category[]> {
  return fetchData<Category>(CATEGORIES_FILE);
}

export async function getCategoriesByRestaurantId(
  restaurantId: number
): Promise<Category[]> {
  const categories = await getCategories();

  return categories.filter(
    (category) => category.restaurantId === restaurantId
  );
}

export async function getCategoriesWithDishes(
  restaurantId: number
): Promise<Category[]> {
  const categories = await getCategoriesByRestaurantId(restaurantId);

  const dishesForCategories = await Promise.all(
    categories.map((category) => getDishesByCategoryIdWithDetails(category.id))
  );

  return categories.map((category, index) => ({
    ...category,
    dishes: dishesForCategories[index] || [],
  }));
}

export async function getCategoryById(
  id: number
): Promise<Category | undefined> {
  const categories = await getCategories();

  return categories.find((category) => category.id === id);
}

// --- DISHES ---
export async function getDishes(): Promise<Dish[]> {
  return fetchData<Dish>(DISHES_FILE);
}

export async function getDishById(id: number): Promise<Dish | undefined> {
  const dishes = await getDishes();

  return dishes.find((dish) => dish.id === id);
}

export async function getDishWithDetails(
  dishId: number
): Promise<Dish | undefined> {
  const dish = await getDishById(dishId);

  if (!dish) return undefined;

  const optionsForDish = await getOptionsByDishId(dishId);

  const optionsWithChoices = await Promise.all(
    optionsForDish.map(async (option) => {
      const choicesForOption = await getChoicesByOptionId(option.id);

      return { ...option, choices: choicesForOption };
    })
  );

  return { ...dish, options: optionsWithChoices };
}

export async function getDishesByRestaurantId(
  restaurantId: number
): Promise<Dish[]> {
  const dishes = await getDishes();

  return dishes.filter((dish) => dish.restaurantId === restaurantId);
}

export async function getDishesByCategoryId(
  categoryId: number
): Promise<Dish[]> {
  const dishes = await getDishes();

  return dishes.filter((dish) => dish.categoryId === categoryId);
}

export async function getDishesByCategoryIdWithDetails(
  categoryId: number
): Promise<Dish[]> {
  const dishes = await getDishesByCategoryId(categoryId);

  const dishesWithDetails = await Promise.all(
    dishes.map((dish) => getDishWithDetails(dish.id))
  );

  return dishesWithDetails.filter((dish) => dish !== undefined) as Dish[];
}

// --- OPTIONS ---
export async function getOptions(): Promise<Option[]> {
  return fetchData<Option>(OPTIONS_FILE);
}

export async function getOptionsByDishId(dishId: number): Promise<Option[]> {
  const options = await getOptions();

  return options.filter((option) => option.dishId === dishId);
}

export async function getOptionsByDishIdWithDetails(
  dishId: number
): Promise<Option[]> {
  const options = await getOptionsByDishId(dishId);

  const optionsWithChoices = await Promise.all(
    options.map(async (option) => {
      const choicesForOption = await getChoicesByOptionId(option.id);

      return { ...option, choices: choicesForOption };
    })
  );

  return optionsWithChoices;
}

// --- CHOICES ---
export async function getChoices(): Promise<Choice[]> {
  return fetchData<Choice>(CHOICES_FILE);
}

export async function getChoicesByOptionId(
  optionId: number
): Promise<Choice[]> {
  const choices = await getChoices();

  return choices.filter((choice) => choice.optionId === optionId);
}

export async function getChoicesByDishId(dishId: number): Promise<Choice[]> {
  const choices = await getChoices();

  return choices.filter((choice) => choice.dishId === dishId);
}
