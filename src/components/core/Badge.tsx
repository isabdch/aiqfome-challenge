type BadgeProps = {
  text: string;
  variant?: "solid" | "background";
};

export default function Badge({ text, variant = "solid" }: BadgeProps) {
  const BADGE_STYLE_VARIANTS = {
    solid: "bg-neutral-700 text-neutral-0",
    background: "bg-teal-50 text-teal-600",
  };

  return (
    <div
      className={`w-fit py-6xs px-4xs rounded-sm flex items-center justify-center ${BADGE_STYLE_VARIANTS[variant]}`}
    >
      <p className="text-center text-xs font-bold">{text}</p>
    </div>
  );
}
