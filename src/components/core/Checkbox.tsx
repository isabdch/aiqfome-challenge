import CheckIcon from "@/assets/icons/check.svg";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      disabled={disabled}
      aria-checked={checked}
      aria-label={label}
      className="flex items-center gap-4xs"
      onClick={() => {
        onChange(!checked);
      }}
    >
      <div className="p-4xs pointer-events-none">
        <div
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
          {checked && <CheckIcon aria-hidden="true" />}
        </div>
      </div>

      <span className="text-label cursor-pointer">{label}</span>
    </button>
  );
}
