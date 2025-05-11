import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "color";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  size = "large",
  fullWidth = false,
  onClick,
  ...props
}: ButtonProps) {
  const buttonVariants = {
    primary: "bg-brand text-neutral-0 hover:bg-purple-700 active:bg-purple-700",
    secondary:
      "bg-neutral-500 text-neutral-0 hover:bg-neutral-600 active:bg-neutral-600",
    color: "text-teal-400 hover:text-teal-500 active:text-teal-500",
  };

  const buttonSizes = {
    small: "py-2xs px-4xs text-xs",
    medium: "py-2sm px-lg text-sm",
    large: "py-3sm px-md text-md",
  };

  return (
    <button
      {...props}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer gap-4xs font-bold rounded-md transition duration-200 ${
        buttonVariants[variant]
      } ${buttonSizes[size]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}
