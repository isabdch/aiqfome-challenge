import { useMemo } from "react";

import type { Option } from "@/types/options";
import type { SelectedChoice } from "@/types/choices";

import PriceTag from "@/components/core/PriceTag";

type TicketDishOptionsProps = {
  options: Option[];
};

export default function TicketDishOptions({ options }: TicketDishOptionsProps) {
  const optionsWithChoices = useMemo(() => {
    return options.filter((option) => option.choices.length > 0);
  }, [options]);

  return (
    <ul className="px-md flex flex-col gap-6xs list-disc text-text-light">
      {optionsWithChoices.map((option) => (
        <li key={option.id} className="leading-4">
          <div className="flex flex-col gap-2xs">
            <p className="text-xs font-bold">{option.name}</p>

            <div className="flex flex-col gap-2xs">
              {option.choices.map((choice) => (
                <div
                  className="text-xs font-semibold flex items-center justify-between gap-3sm"
                  key={choice.id}
                >
                  {(choice as SelectedChoice).quantity > 1 &&
                    (choice as SelectedChoice).quantity}{" "}
                  {choice.name}
                  {choice.additionalPrice && (
                    <PriceTag
                      size="sm"
                      additional
                      price={
                        choice.additionalPrice *
                        (choice as SelectedChoice).quantity
                      }
                      color="secondary"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
