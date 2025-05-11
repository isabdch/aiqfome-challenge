type TicketDishObservationsProps = {
  observations: string;
};

export default function TicketDishObservations({
  observations,
}: TicketDishObservationsProps) {
  return (
    <div className="flex gap-4xs p-6xs rounded-sm bg-neutral-50 text-xs text-neutral-700">
      <span className="font-bold">observação:</span>
      <p className="font-semibold">{observations}</p>
    </div>
  );
}
