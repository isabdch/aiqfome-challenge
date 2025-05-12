import { formatDishOptionLabel } from "@/utils/dish";

import Badge from "@/components/core/Badge";
import OptionChoices from "@/components/option/OptionChoices";

import type { Dish } from "@/types/dishes";
import type { Option } from "@/types/options";

type DishOptionProps = {
  dish: Dish;
  option: Option;
};

export default function DishOption({ dish, option }: DishOptionProps) {
  return (
    <section className="p-md border-b-4 border-neutral-100 flex flex-col gap-md">
      <div className="flex items-center justify-between gap-sm">
        <div className="flex flex-col gap-2xs">
          <h3 className="text-md font-bold text-neutral-900">{option.name}</h3>

          <p className="text-xs-bold-neutral-500">
            escolha {formatDishOptionLabel(option)}
          </p>
        </div>

        {option.required && <Badge text="obrigatório" />}
      </div>

      <div
        className="flex flex-col gap-3sm"
        role={option.type === "radio" ? "radiogroup" : "group"}
        aria-required={option.required}
      >
        {option.choices.map((choice) => (
          <OptionChoices
            dish={dish}
            key={choice.id}
            choice={choice}
            option={option}
            type={option.type}
          />
        ))}
      </div>
    </section>
  );
}
