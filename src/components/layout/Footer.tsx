"use client";

import React, { Suspense, lazy } from "react";

import { useParams } from "next/navigation";

import { useFooter } from "@/hooks/useFooter";

const Button = lazy(() => import("@/components/ui/Button"));
const TicketFooter = lazy(() => import("@/components/ticket/TicketFooter"));

export default function Footer() {
  const params = useParams();

  const { showButton, isButtonEnabled, showTicketFooter, handleNavigate } =
    useFooter({
      dishIdFromParams: params.dishId,
      restaurantIdFromParams: params.restaurantId,
    });

  return (
    <>
      {showTicketFooter ? (
        <Suspense fallback={<div className="ticket-footer">Carregando...</div>}>
          <TicketFooter />
        </Suspense>
      ) : (
        <footer className="bg-neutral-100 py-lg px-md">
          <div className="max-container-md flex flex-col gap-sm justify-center items-center">
            <p className="text-sm text-bold-purple-center">
              feito com <span aria-label="amor">💜</span> em maringá-PR
            </p>

            {showButton ? (
              <Button
                fullWidth
                disabled={!isButtonEnabled}
                onClick={handleNavigate}
                aria-label={
                  !isButtonEnabled ? "Ver ticket desabilitado" : "Ver ticket"
                }
              >
                ver ticket
              </Button>
            ) : (
              <p className="text-md text-bold-purple-center">
                aiqfome.com © 2007-2023 aiqfome LTDA. CNPJ: 09.186.786/0001-58
              </p>
            )}
          </div>
        </footer>
      )}
    </>
  );
}
