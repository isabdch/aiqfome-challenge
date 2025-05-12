import { useState, useEffect, useCallback } from "react";

import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/localStorage";

import type { Dish, SelectedDish } from "@/types/dishes";
import type { Choice, SelectedChoice } from "@/types/choices";
import { type Option, ItemOptionType } from "@/types/options";

export type UseOrderReturn = {
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
  checkDishRequirements: (dishId: number) => boolean;
  getSelectedDishesWithChoices: () => SelectedDish[];
  handleDishObservations: (dish: Dish, observations: string) => void;
};

const SELECTED_DISHES_KEY = "selectedDishes";
const SELECTED_CHOICES_KEY = "selectedChoices";

export function useOrder(): UseOrderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(SELECTED_DISHES_KEY, selectedDishes);
    }
  }, [selectedDishes, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(SELECTED_CHOICES_KEY, selectedChoices);
    }
  }, [selectedChoices, isLoading]);

  const dishIsAlreadySelected = useCallback(
    (dish: Dish): boolean => {
      return selectedDishes.some((d) => d?.id === dish.id);
    },
    [selectedDishes]
  );

  const selectedDish = useCallback(
    (dish: Dish): SelectedDish | undefined => {
      return selectedDishes.find((d) => d?.id === dish.id);
    },
    [selectedDishes]
  );

  const selectedChoice = useCallback(
    (choice: Choice): SelectedChoice | undefined => {
      return selectedChoices.find((c) => c?.id === choice.id);
    },
    [selectedChoices]
  );

  const getChoiceQuantity = useCallback(
    (choiceId: number): number => {
      const choice = selectedChoices.find((sc) => sc.id === choiceId);

      return choice ? choice.quantity : 0;
    },
    [selectedChoices]
  );

  const optionLimitReached = useCallback(
    (option: Option): boolean => {
      const limit = option.limit || option.max;

      if (!limit) return false;

      const totalQuantityForOption = selectedChoices
        .filter((sc) => sc.optionId === option.id)
        .reduce((sum, sc) => sum + sc.quantity, 0);

      return totalQuantityForOption >= limit;
    },
    [selectedChoices]
  );

  const handleDish = useCallback(
    (dishToHandle: Dish, newQuantity: number): void => {
      if (
        selectedDishes.length &&
        selectedDishes[0].restaurantId !== dishToHandle.restaurantId
      ) {
        setSelectedDishes([]);
        setSelectedChoices([]);
      }

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
          return [
            ...prevDishes,
            { ...dishToHandle, quantity: newQuantity, observations: "" },
          ];
        }
      });
    },
    [selectedDishes]
  );

  const addFirstDish = useCallback(
    (dish: Dish): void => {
      if (!dishIsAlreadySelected(dish)) {
        handleDish(dish, 1);
      }
    },
    [handleDish, dishIsAlreadySelected]
  );

  const handleDishObservations = useCallback(
    (dish: Dish, observations: string): void => {
      setSelectedDishes((prevDishes) => {
        const existingDishIndex = prevDishes.findIndex((d) => d.id === dish.id);

        if (existingDishIndex !== -1) {
          const updatedDishes = prevDishes.map((item, index) => {
            if (index === existingDishIndex) {
              return {
                ...item,
                observations: observations,
              };
            }

            return item;
          });

          return updatedDishes;
        } else {
          return [
            ...prevDishes,
            { ...dish, quantity: 1, observations: observations },
          ];
        }
      });
    },
    []
  );

  const upsertChoice = useCallback(
    (choice: Choice, quantity: number, dish: Dish): void => {
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
    },
    [addFirstDish]
  );

  const selectRadioChoice = useCallback(
    (choice: Choice, dish: Dish): void => {
      addFirstDish(dish);

      setSelectedChoices((prevChoices) => {
        const filteredChoices = prevChoices.filter(
          (sc) => sc.optionId !== choice.optionId
        );

        return [...filteredChoices, { ...choice, quantity: 1 }];
      });
    },
    [addFirstDish]
  );

  const toggleCheckboxChoice = useCallback(
    (
      choice: SelectedChoice,
      dish: Dish,
      option: Option
    ): void => {
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
    },
    [addFirstDish, optionLimitReached]
  );

  const checkDishRequirements = useCallback(
    (dishId: number): boolean => {
      if (!dishId) return false;

      const dish = selectedDishes.find((d) => d.id === dishId);

      if (!dish) return false;

      for (const option of dish.options) {
        if (option.required) {
          const choicesForThisOption = selectedChoices.filter(
            (sc) => sc.optionId === option.id && sc.dishId === dishId
          );

          const totalQuantitySelectedForOption = choicesForThisOption.reduce(
            (sum, sc) => sum + sc.quantity,
            0
          );

          if (option.type === ItemOptionType.RADIO) {
            if (choicesForThisOption.length === 0) return false;
          } else {
            const effectiveMin = option.min ?? 1;

            if (effectiveMin > 0 && totalQuantitySelectedForOption < effectiveMin)
              return false;
          }
        }
      }

      return true;
    },
    [selectedDishes, selectedChoices]
  );

  const getDishPrice = useCallback(
    (dish?: SelectedDish): number => {
      if (!dish) return 0;

      let calculatedDishBasePrice: number;

      const basePriceDefiningChoice = selectedChoices.find(
        (sc) => sc.dishId === dish.id && sc.basePrice === true
      );

      if (basePriceDefiningChoice) {
        calculatedDishBasePrice =
          (basePriceDefiningChoice.price || 0) * dish.quantity;
      } else {
        calculatedDishBasePrice = dish.price * dish.quantity;
      }

      const additionalChoicesTotalPrice = selectedChoices
        .filter(
          (sc) =>
            sc.dishId === dish.id &&
            !sc.basePrice &&
            sc.additionalPrice &&
            sc.additionalPrice > 0
        )
        .reduce((sum, sc) => {
          return sum + (sc.additionalPrice || 0) * sc.quantity;
        }, 0);

      return calculatedDishBasePrice + additionalChoicesTotalPrice;
    },
    [selectedChoices]
  );

  const getTotalPrice = useCallback((): number => {
    const dishPrices = selectedDishes.map((d) => getDishPrice(d));

    return dishPrices.reduce((sum, price) => sum + price, 0);
  }, [selectedDishes, getDishPrice]);

  const getSelectedDishesWithChoices = useCallback((): SelectedDish[] => {
    return selectedDishes.map((dish) => {
      const optionsWithSelectedChoices = dish.options
        .map((option) => {
          const choicesForThisOptionAndDish: SelectedChoice[] =
            selectedChoices.filter(
              (sc) => sc.optionId === option.id && sc.dishId === dish.id
            );

          if (choicesForThisOptionAndDish.length > 0) {
            return {
              ...option,
              choices: choicesForThisOptionAndDish,
            };
          }

          return;
        })
        .filter(
          (
            opt
          ): opt is Omit<Option, "choices"> & { choices: SelectedChoice[] } =>
            opt !== undefined
        );

      return {
        ...dish,
        options: optionsWithSelectedChoices as Option[],
      };
    });
  }, [selectedDishes, selectedChoices]);

  return {
    selectedDishes,
    selectedChoices,
    handleDish,
    dishIsAlreadySelected,
    addFirstDish,
    selectedDish,
    selectedChoice,
    upsertChoice,
    selectRadioChoice,
    toggleCheckboxChoice,
    getChoiceQuantity,
    optionLimitReached,
    getDishPrice,
    getTotalPrice,
    checkDishRequirements,
    getSelectedDishesWithChoices,
    handleDishObservations,
  };
}
