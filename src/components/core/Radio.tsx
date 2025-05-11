type RadioProps = {
  label: string;
  name: string;
  checked: boolean;
  id?: string;
  icon?: React.ReactNode;
  onChange: (checked: boolean) => void;
};

export default function Radio({
  label,
  name,
  id,
  icon,
  checked,
  onChange,
}: RadioProps) {
  const componentId =
    id || `radio-${name}-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const labelId = `${componentId}-label`;

  const handleClick = () => {
    if (!checked) {
      onChange(true);
    }
  };

  return (
    <div className="flex items-center gap-4xs">
      <div className="p-4xs">
        <button
          name={name}
          role="radio"
          type="button"
          id={componentId}
          aria-checked={checked}
          aria-labelledby={labelId}
          onClick={handleClick}
          className={`w-md h-md border rounded-full 
                    transition duration-150
                    flex items-center justify-center cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-brand focus:ring-opacity-50 
                    ${
                      checked
                        ? "bg-brand border-brand"
                        : "bg-transparent border-neutral-400"
                    }`}
        >
          {checked && (
            <span className="w-icon-xs h-icon-xs bg-white rounded-full" />
          )}
        </button>
      </div>

      {icon && <span className="flex items-center">{icon}</span>}

      <span
        id={labelId}
        onClick={handleClick}
        className="text-label cursor-pointer"
      >
        {label}
      </span>
    </div>
  );
}
