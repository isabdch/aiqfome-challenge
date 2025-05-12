"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useOrder, type UseOrderReturn } from "@/hooks/useOrder";

const OrderContext = createContext<UseOrderReturn | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const order = useOrder();

  return (
    <OrderContext.Provider value={order}>{children}</OrderContext.Provider>
  );
}

export function useOrderContext(): UseOrderReturn {
  const context = useContext(OrderContext);

  if (context === undefined) {
    throw new Error(
      "useOrderContext deve ser usado dentro de um OrderProvider"
    );
  }

  return context;
}
