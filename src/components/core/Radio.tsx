type RadioProps = {
  label: string;
  name: string;
  checked: boolean;
  icon?: React.ReactNode;
  onChange: (checked: boolean) => void;
};

export default function Radio({
  label,
  name,
  icon,
  checked,
  onChange,
}: RadioProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!checked) {
      onChange(true);
    }
  };

  return (
    <button
      name={name}
      role="radio"
      type="button"
      aria-checked={checked}
      aria-labelledby={label}
      onClick={handleClick}
      className="flex items-center gap-4xs"
    >
      <div className="p-4xs">
        <div
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
        </div>
      </div>

      {icon && <span className="flex items-center">{icon}</span>}

      <span className="text-label cursor-pointer">{label}</span>
    </button>
  );
}
