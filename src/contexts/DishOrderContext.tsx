"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useDishOrder, type UseDishOrderReturn } from "@/hooks/useDishOrder";

const DishOrderContext = createContext<UseDishOrderReturn | undefined>(
  undefined
);

export function DishOrderProvider({ children }: { children: ReactNode }) {
  const dishOrder = useDishOrder();

  return (
    <DishOrderContext.Provider value={dishOrder}>
      {children}
    </DishOrderContext.Provider>
  );
}

export function useDishOrderContext(): UseDishOrderReturn {
  const context = useContext(DishOrderContext);

  if (context === undefined) {
    throw new Error(
      "useDishOrderContext deve ser usado dentro de um DishOrderProvider"
    );
  }

  return context;
}
