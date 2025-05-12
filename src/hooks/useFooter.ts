import { useState, useEffect, useCallback } from "react";

import { useRouter, usePathname } from "next/navigation";

import { useOrderContext } from "@/contexts/OrderContext";

type UseFooterProps = {
  restaurantIdFromParams?: string | string[];
  dishIdFromParams?: string | string[];
};

type UseFooterReturn = {
  showButton: boolean;
  isButtonEnabled: boolean;
  currentDishId: number | null;
  handleNavigate: () => void;
  showTicketFooter: boolean;
};

export function useFooter({
  restaurantIdFromParams,
  dishIdFromParams,
}: UseFooterProps): UseFooterReturn {
  const router = useRouter();
  const pathname = usePathname();

  const { selectedDishes, checkDishRequirements, selectedChoices } =
    useOrderContext();

  const [showButton, setShowButton] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showTicketFooter, setShowTicketFooter] = useState(false);

  const dishIdAsString = Array.isArray(dishIdFromParams)
    ? dishIdFromParams[0]
    : dishIdFromParams;

  const restaurantIdAsString = Array.isArray(restaurantIdFromParams)
    ? restaurantIdFromParams[0]
    : restaurantIdFromParams;

  const currentDishId = dishIdAsString ? Number(dishIdAsString) : null;
  const currentRestaurantId = restaurantIdAsString
    ? Number(restaurantIdAsString)
    : null;

  useEffect(() => {
    if (pathname.includes("ticket")) {
      setShowTicketFooter(true);
    } else {
      setShowTicketFooter(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (currentDishId !== null) {
      const isDishActuallySelected = selectedDishes.some(
        (d) => d.id === currentDishId
      );

      setShowButton(isDishActuallySelected);
    } else {
      setShowButton(false);
    }
  }, [currentDishId, selectedDishes]);

  useEffect(() => {
    let isActive = true;

    async function verifyRequirements() {
      if (showButton && currentDishId !== null) {
        try {
          const met = await checkDishRequirements(currentDishId);

          if (isActive) {
            setIsButtonEnabled(met);
          }
        } catch {
          if (isActive) {
            setIsButtonEnabled(false);
          }
        }
      } else {
        if (isActive) {
          setIsButtonEnabled(false);
        }
      }
    }

    verifyRequirements();

    return () => {
      isActive = false;
    };
  }, [showButton, currentDishId, checkDishRequirements, selectedChoices]);

  const handleNavigate = useCallback(() => {
    if (currentDishId && currentRestaurantId) {
      router.push(`/restaurants/${currentRestaurantId}/ticket`);
    }
  }, [router, currentDishId, currentRestaurantId]);

  return {
    showButton,
    showTicketFooter,
    isButtonEnabled,
    currentDishId,
    handleNavigate,
  };
}
