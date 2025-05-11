import type { Category } from "@/types/categories";

import HasDiscountIcon from "@/assets/icons/discount.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";

type RestaurantCategoryHeaderProps = {
  isOpen: boolean;
  category: Category;
  hasDiscount?: boolean;
};

export default function RestaurantCategoryHeader({
  isOpen,
  category,
  hasDiscount = false,
}: RestaurantCategoryHeaderProps) {
  return (
    <div className="w-full flex items-center gap-sm cursor-pointer">
      <div className=" flex flex-col flex-1 gap-4xs">
        <h2 className="flex items-center gap-4xs text-md font-bold text-neutral-900">
          {category.name}
          {hasDiscount && <HasDiscountIcon />}
        </h2>

        {category.description && (
          <p className="text-xs text-left text-neutral-500 font-semibold">
            {category.description}
          </p>
        )}
      </div>

      <ChevronDownIcon
        className={`${isOpen ? "rotate-180" : ""} transition duration-300`}
      />
    </div>
  );
}
