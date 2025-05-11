import {
  COUNTER_TEXT_SIZE_VARIANTS,
  COUNTER_BUTTON_SIZE_VARIANTS,
} from "@/constants/styles";

import PlusIcon from "@/assets/icons/plus.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import MinusGrayIcon from "@/assets/icons/minus-gray.svg";

type CounterProps = {
  value: number;
  label?: string;
  trash?: boolean;
  size?: "small" | "large";
  onChange: (value: number) => void;
};

export default function Counter({
  value,
  label,
  trash = false,
  size = "small",
  onChange,
}: CounterProps) {
  const SIZE_PROPS = {
    width: COUNTER_BUTTON_SIZE_VARIANTS[size],
    height: COUNTER_BUTTON_SIZE_VARIANTS[size],
  };

  return (
    <div className="flex items-center gap-4xs">
      <button
        onClick={() => onChange(trash ? 0 : value - 1)}
        className="active:opacity-70"
      >
        {trash && value > 0 ? (
          <TrashIcon viewBox="0 0 32 33" {...SIZE_PROPS} />
        ) : value > 0 ? (
          <MinusIcon viewBox="0 0 24 24" {...SIZE_PROPS} />
        ) : (
          <MinusGrayIcon viewBox="0 0 24 24" {...SIZE_PROPS} />
        )}
      </button>

      <div
        className={`flex items-center justify-center w-xl font-bold text-neutral-700 ${COUNTER_TEXT_SIZE_VARIANTS[size]}`}
      >
        {value}
      </div>

      <button onClick={() => onChange(value + 1)} className="active:opacity-70">
        <PlusIcon viewBox="0 0 32 33" {...SIZE_PROPS} />
      </button>

      {label && (
        <span className="text-label ml-4xs font-semibold">{label}</span>
      )}
    </div>
  );
}
