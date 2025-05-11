"use client";

import { useDishOrderContext } from "@/contexts/DishOrderContext";

import type { Dish } from "@/types/dishes";
import type { Choice } from "@/types/choices";
import type { Option } from "@/types/options";
import type { ItemOptionType } from "@/types/options";

import Radio from "@/components/core/Radio";
import Counter from "@/components/core/Counter";
import Checkbox from "@/components/core/Checkbox";
import PriceTag from "@/components/core/PriceTag";

import DiscountIcon from "@/assets/icons/discount.svg";

type OptionChoicesProps = {
  dish: Dish;
  choice: Choice;
  option: Option;
  type: ItemOptionType;
};

export default function OptionChoices({
  dish,
  type,
  choice,
  option,
}: OptionChoicesProps) {
  const {
    selectRadioChoice,
    toggleCheckboxChoice,
    upsertChoice,
    getChoiceQuantity,
    optionLimitReached,
    selectedChoice,
  } = useDishOrderContext();

  const CHOICE_PRICE = choice.price || choice.additionalPrice;

  const CHOICE_QTY = getChoiceQuantity(choice.id);

  return (
    <div className="flex items-center justify-between gap-md">
      {type === "radio" && (
        <Radio
          name={`radio-option-${choice.optionId}`}
          icon={choice.originalPrice && <DiscountIcon />}
          label={choice.name}
          checked={CHOICE_QTY > 0}
          onChange={() => selectRadioChoice(choice, dish)}
        />
      )}

      {type === "number" && (
        <Counter
          label={choice.name}
          value={CHOICE_QTY}
          onChange={(newQuantity) => upsertChoice(choice, newQuantity, dish)}
        />
      )}

      {type === "checkbox" && (
        <Checkbox
          label={choice.name}
          checked={CHOICE_QTY > 0}
          onChange={() =>
            toggleCheckboxChoice(
              selectedChoice(choice) || { ...choice, quantity: 1 },
              dish,
              option
            )
          }
          disabled={optionLimitReached(option) && CHOICE_QTY < 1}
        />
      )}

      {CHOICE_PRICE && (
        <PriceTag
          price={CHOICE_PRICE}
          discountPosition="left"
          additional={!!choice.additionalPrice}
          originalPrice={choice.originalPrice}
        />
      )}
    </div>
  );
}
