"use client";

import Textarea from "@/components/core/Textarea";

export default function DishObservations() {
  return (
    <div className="pt-md px-md pb-8xl">
      <Textarea
        placeholder={`alguma observação do item? • opcional
ex: tirar algum ingrediente, ponto do prato`}
        value=""
        onChange={() => {}}
      />
    </div>
  );
}
