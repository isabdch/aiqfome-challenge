import { useState, useCallback, useEffect, useRef } from "react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import type { Category } from "@/types/categories";

type UseCategoriesStatesReturn = {
  openStates: Record<number, boolean>;
  toggleCategory: (categoryId: number) => void;
};

export function useCategoriesStates(
  categories: Category[]
): UseCategoriesStatesReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [openStates, setOpenStates] = useState<Record<number, boolean>>(() => {
    const openParam = searchParams.get("open");

    if (!openParam) {
      const firstCategoryId = categories[0]?.id;

      return firstCategoryId ? { [firstCategoryId]: true } : {};
    }

    try {
      const openNames = openParam.split(",").map(decodeURIComponent);
      const openIds = categories
        .filter((category) => openNames.includes(category.name))
        .map((category) => category.id);

      return openIds.reduce((acc, id) => ({ ...acc, [id]: true }), {});
    } catch (error) {
      console.error("Error decoding 'open' URL parameters:", error);

      return {};
    }
  });

  const updateUrl = useCallback(
    (newStates: Record<number, boolean>) => {
      const openIds = Object.entries(newStates)
        .filter(([, isOpen]) => isOpen)
        .map(([id]) => Number(id));

      const openNames = categories
        .filter((category) => openIds.includes(category.id))
        .map((category) => category.name);

      const params = new URLSearchParams(searchParams.toString());

      if (openNames.length > 0) {
        params.set("open", openNames.map(encodeURIComponent).join(","));
      } else {
        params.delete("open");
      }

      const newUrl = `${pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams, categories]
  );

  const toggleCategory = useCallback(
    (categoryId: number) => {
      setOpenStates((prevStates) => {
        const newStates = {
          ...prevStates,
          [categoryId]: !prevStates[categoryId],
        };

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => updateUrl(newStates), 0);

        return newStates;
      });
    },
    [updateUrl]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    openStates,
    toggleCategory,
  };
}
