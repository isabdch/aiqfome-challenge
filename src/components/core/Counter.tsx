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

  const labelText = label || "Quantidade";

  return (
    <div
      role="group"
      aria-label={labelText}
      className="flex items-center gap-4xs"
    >
      <button
        type="button"
        onClick={() => onChange(trash ? 0 : value - 1)}
        className="active:opacity-70"
        aria-label={trash && value > 0 ? "Remover item" : "Diminuir quantidade"}
        disabled={value <= 0}
      >
        {trash && value > 0 ? (
          <TrashIcon viewBox="0 0 32 33" {...SIZE_PROPS} aria-hidden="true" />
        ) : value > 0 ? (
          <MinusIcon viewBox="0 0 24 24" {...SIZE_PROPS} aria-hidden="true" />
        ) : (
          <MinusGrayIcon
            {...SIZE_PROPS}
            viewBox="0 0 24 24"
            aria-hidden="true"
          />
        )}
      </button>

      <div
        role="status"
        aria-label={`${labelText}: ${value}`}
        className={`flex items-center justify-center w-xl font-bold text-neutral-700 ${COUNTER_TEXT_SIZE_VARIANTS[size]}`}
      >
        {value}
      </div>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="active:opacity-70"
        aria-label="Aumentar quantidade"
      >
        <PlusIcon viewBox="0 0 32 33" {...SIZE_PROPS} aria-hidden="true" />
      </button>

      {label && (
        <span className="text-label ml-4xs font-semibold">{label}</span>
      )}
    </div>
  );
}
