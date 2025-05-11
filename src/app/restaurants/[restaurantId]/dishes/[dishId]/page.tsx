import { getDishWithDetails } from "@/lib/services/dataService";

import Banner from "@/components/core/Banner";
import DishHeader from "@/components/dish/DishHeader";
import DishOption from "@/components/dish/DishOption";
import DishQuantity from "@/components/dish/DishQuantity";
import DishObservations from "@/components/dish/DishObservations";

type MenuPageProps = {
  params: {
    dishId: string;
  };
};

export default async function MenuPage({ params }: MenuPageProps) {
  const { dishId } = await params;

  const ID = Number(dishId);

  const dish = await getDishWithDetails(ID);

  if (!dish) return <div>Prato não encontrado</div>;

  return (
    <div>
      <Banner image={dish.image || "/images/dish.webp"} height="md" />

      <div className="max-container-md">
        <DishHeader dish={dish} />
        <DishQuantity dish={dish} />

        <div>
          {dish.options.map((option) => (
            <DishOption key={option.id} option={option} dish={dish} />
          ))}
        </div>

        <DishObservations />
      </div>
    </div>
  );
}
