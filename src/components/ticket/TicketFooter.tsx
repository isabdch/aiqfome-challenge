import { useDishOrderContext } from "@/contexts/DishOrderContext";

import { formatCurrency } from "@/utils/currency";

import Button from "@/components/core/Button";

export default function TicketFooter() {
  const { getTotalPrice } = useDishOrderContext();

  const totalPrice = getTotalPrice();

  return (
    <footer className="bg-neutral-0 shadow-footer rounded-t-lg py-md px-xl sticky bottom-0">
      <div className="max-container-md flex justify-between items-center gap-2lg">
        <div className="flex flex-col gap-2xs">
          <p className="text-sm text-neutral-900 font-bold">subtotal</p>
          <p className="text-lg font-extrabold text-brand">
            {formatCurrency(totalPrice)}
          </p>
        </div>

        <Button fullWidth aria-label="Ir para página de pagamento">
          ir para pagamento
        </Button>
      </div>
    </footer>
  );
}
