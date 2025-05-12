import { TAG_ICONS } from "@/constants/tags";

import type { Dish } from "@/types/dishes";

type CategoryTagProps = {
  dish: Dish;
};

export default function CategoryTag({ dish }: CategoryTagProps) {
  return (
    <div className="flex items-center gap-4xs" aria-label="Tags do prato">
      {dish.tags.map((tag) => {
        const Icon = TAG_ICONS[tag.type];

        return <Icon key={tag.type} aria-label={tag.type} title={tag.type} />;
      })}
    </div>
  );
}
