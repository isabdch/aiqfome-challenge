"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import type { Dispatch, ReactNode, SetStateAction } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParams.get("s") || "";
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("s", searchTerm);
    } else {
      params.delete("s");
    }

    const newUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    router.replace(newUrl, { scroll: false });
  }, [searchTerm, pathname, router, searchParams]);

  const contextValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
    }),
    [searchTerm]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
