import { useState, useEffect } from "react";

import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/localStorage";

import type { Dish, SelectedDish } from "@/types/dishes";
import type { Choice, SelectedChoice } from "@/types/choices";
import { Option } from "@/types/options";

export type UseDishOrderReturn = {
  selectedDishes: SelectedDish[];
  selectedChoices: SelectedChoice[];
  handleDish: (dish: Dish, quantity: number) => void;
  dishIsAlreadySelected: (dish: Dish) => boolean;
  addFirstDish: (dish: Dish) => void;
  selectedDish: (dish: Dish) => SelectedDish | undefined;
  selectedChoice: (choice: Choice) => SelectedChoice | undefined;
  selectRadioChoice: (choice: Choice, dish: Dish) => void;
  upsertChoice: (choice: Choice, quantity: number, dish: Dish) => void;
  toggleCheckboxChoice: (
    choice: SelectedChoice,
    dish: Dish,
    option: Option
  ) => void;
  getChoiceQuantity: (choiceId: number) => number;
  optionLimitReached: (option: Option) => boolean;
  getDishPrice: (dish?: SelectedDish) => number;
  getTotalPrice: () => number;
};

const SELECTED_DISHES_KEY = "selectedDishes";
const SELECTED_CHOICES_KEY = "selectedChoices";

export function useDishOrder(): UseDishOrderReturn {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoice[]>([]);

  useEffect(() => {
    const loadedDishes =
      loadFromLocalStorage<SelectedDish[]>(SELECTED_DISHES_KEY);
    const loadedChoices =
      loadFromLocalStorage<SelectedChoice[]>(SELECTED_CHOICES_KEY);

    if (loadedDishes) {
      setSelectedDishes(loadedDishes);
    }

    if (loadedChoices) {
      setSelectedChoices(loadedChoices);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(SELECTED_DISHES_KEY, selectedDishes);
  }, [selectedDishes]);

  useEffect(() => {
    saveToLocalStorage(SELECTED_CHOICES_KEY, selectedChoices);
  }, [selectedChoices]);

  function handleDish(dishToHandle: Dish, newQuantity: number) {
    setSelectedDishes((prevDishes) => {
      const existingDishIndex = prevDishes.findIndex(
        (d) => d.id === dishToHandle.id
      );

      if (newQuantity <= 0) {
        if (existingDishIndex !== -1) {
          setSelectedChoices((prevChoices) => {
            const nextChoices = prevChoices.filter(
              (sc) => sc.dishId !== dishToHandle.id
            );

            return nextChoices;
          });

          return prevDishes.filter((d) => d.id !== dishToHandle.id);
        }

        return prevDishes;
      }

      if (existingDishIndex !== -1) {
        const updatedDishes = [...prevDishes];

        updatedDishes[existingDishIndex] = {
          ...prevDishes[existingDishIndex],
          ...dishToHandle,
          quantity: newQuantity,
        };

        return updatedDishes;
      } else {
        return [...prevDishes, { ...dishToHandle, quantity: newQuantity }];
      }
    });
  }

  function dishIsAlreadySelected(dish: Dish) {
    return selectedDishes.some((d) => d?.id === dish.id);
  }

  function selectedDish(dish: Dish) {
    return selectedDishes.find((d) => d?.id === dish.id);
  }

  function selectedChoice(choice: Choice) {
    return selectedChoices.find((c) => c?.id === choice.id);
  }

  function addFirstDish(dish: Dish) {
    if (!dishIsAlreadySelected(dish)) {
      handleDish(dish, 1);
    }
  }

  function upsertChoice(choice: Choice, quantity: number, dish: Dish) {
    addFirstDish(dish);

    setSelectedChoices((prevChoices) => {
      const existingChoiceIndex = prevChoices.findIndex(
        (sc) => sc.id === choice.id
      );

      if (quantity <= 0) {
        if (existingChoiceIndex !== -1)
          return prevChoices.filter((sc) => sc.id !== choice.id);

        return prevChoices;
      }

      if (existingChoiceIndex !== -1) {
        const updatedChoices = [...prevChoices];

        updatedChoices[existingChoiceIndex] = {
          ...updatedChoices[existingChoiceIndex],
          quantity,
        };

        return updatedChoices;
      } else {
        return [...prevChoices, { ...choice, quantity }];
      }
    });
  }

  function selectRadioChoice(choice: Choice, dish: Dish) {
    addFirstDish(dish);

    setSelectedChoices((prevChoices) => {
      const filteredChoices = prevChoices.filter(
        (sc) => sc.optionId !== choice.optionId
      );

      return [...filteredChoices, { ...choice, quantity: 1 }];
    });
  }

  function toggleCheckboxChoice(
    choice: SelectedChoice,
    dish: Dish,
    option: Option
  ) {
    if (optionLimitReached(option) && !choice.quantity) return;

    addFirstDish(dish);

    setSelectedChoices((prevChoices) => {
      const existingChoiceIndex = prevChoices.findIndex(
        (prevChoice) => prevChoice.id === choice.id
      );

      if (existingChoiceIndex !== -1) {
        return prevChoices.filter(
          (prevChoice, index) => index !== existingChoiceIndex
        );
      } else {
        return [...prevChoices, { ...choice, quantity: 1 }];
      }
    });
  }

  function getChoiceQuantity(choiceId: number): number {
    const choice = selectedChoices.find((sc) => sc.id === choiceId);

    return choice ? choice.quantity : 0;
  }

  function optionLimitReached(option: Option) {
    const limit = option.limit || option.max;

    if (!limit) return false;

    const totalQuantityForOption = selectedChoices
      .filter((sc) => sc.optionId === option.id)
      .reduce((sum, sc) => sum + sc.quantity, 0);

    return totalQuantityForOption >= limit;
  }

  function getChoicePrice(choice: SelectedChoice) {
    return (choice.additionalPrice || choice.price || 0) * choice.quantity;
  }

  function getDishPrice(dish?: SelectedDish) {
    if (!dish) return 0;

    const dishPrice = dish.price * dish.quantity;

    const choicePrices = selectedChoices
      .filter((sc) => sc.dishId === dish.id && (sc.additionalPrice || sc.price))
      .map((sc) => getChoicePrice(sc));

    return dishPrice + choicePrices.reduce((sum, price) => sum + price, 0);
  }

  function getTotalPrice() {
    const dishPrices = selectedDishes.map((d) => getDishPrice(d));

    return dishPrices.reduce((sum, price) => sum + price, 0);
  }

  return {
    selectedDishes,
    selectedChoices,
    handleDish,
    dishIsAlreadySelected,
    selectedDish,
    selectedChoice,
    addFirstDish,
    upsertChoice,
    selectRadioChoice,
    toggleCheckboxChoice,
    getChoiceQuantity,
    optionLimitReached,
    getDishPrice,
    getTotalPrice,
  };
}
