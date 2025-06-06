import { ChangeEvent, InputHTMLAttributes } from "react";

import SearchIcon from "@/assets/icons/search.svg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "search";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  onChange,
  ...props
}: InputProps) {
  return (
    <div className="bg-neutral-0 flex items-center gap-sm py-sm px-3sm rounded-md border border-decorative-dividers-gray">
      {type === "search" && <SearchIcon aria-hidden="true" />}
      <input
        type={type}
        {...props}
        onChange={onChange}
        className="flex-1 text-sm font-semibold outline-neutral-999 placeholder:text-text-light placeholder:text-sm placeholder:font-semibold placeholder:opacity-70"
      />
    </div>
  );
}
