import CheckIcon from "@/assets/icons/check.svg";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
};

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
}: CheckboxProps) {
  const componentId =
    id || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex items-center gap-4xs">
      <div className="p-4xs">
        <button
          type="button"
          id={componentId}
          role="checkbox"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`w-md h-md border rounded-sm
                    transition duration-150
                    flex items-center justify-center cursor-pointer 
                    focus:outline-none focus:ring-2 focus:ring-brand focus:ring-opacity-50 
                    ${
                      checked
                        ? "bg-brand border-brand"
                        : "bg-transparent border-neutral-400"
                    }`}
        >
          {checked && <CheckIcon />}
        </button>
      </div>

      <span
        id={`${componentId}-label`}
        className="text-label cursor-pointer"
        onClick={() => onChange(!checked)}
      >
        {label}
      </span>
    </div>
  );
}
