import ChevronRightIcon from "@/assets/icons/chevron-right.svg";

type ArrowIconProps = {
  size?: number;
};

export default function ArrowIcon({ size = 9 }: ArrowIconProps) {
  return (
    <ChevronRightIcon
      width={size}
      height={size}
      viewBox="0 0 16 17"
      aria-hidden="true"
    />
  );
}
