type TextareaProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function Textarea({
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-6xl py-2sm px-3sm border border-neutral-200 rounded-sm outline-neutral-999 text-sm font-semibold placeholder:text-neutral-500 placeholder:text-sm placeholder:font-semibold"
    />
  );
}
