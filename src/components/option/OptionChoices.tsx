"use client";

import type { Choice } from "@/types/choices";
import type { ItemOptionType } from "@/types/options";

import Radio from "@/components/core/Radio";
import Counter from "@/components/core/Counter";
import Checkbox from "@/components/core/Checkbox";
import PriceTag from "@/components/core/PriceTag";

import DiscountIcon from "@/assets/icons/discount.svg";

type OptionChoicesProps = {
  type: ItemOptionType;
  choice: Choice;
};

export default function OptionChoices({ type, choice }: OptionChoicesProps) {
  const CHOICE_PRICE = choice.price || choice.additionalPrice;

  return (
    <div className="flex items-center justify-between gap-md">
      {type === "radio" && (
        <Radio
          icon={choice.originalPrice && <DiscountIcon />}
          label={choice.name}
          checked={false}
        />
      )}

      {type === "number" && <Counter label={choice.name} value={0} />}

      {type === "checkbox" && <Checkbox label={choice.name} checked={false} />}

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
