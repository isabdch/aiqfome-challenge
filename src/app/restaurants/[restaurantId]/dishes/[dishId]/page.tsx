import { Metadata } from "next";

import { getDishWithDetails } from "@/lib/services/dataService";
import { generatePageMetadata, generateNotFoundMetadata } from "@/lib/metadata";

import Banner from "@/components/ui/Banner";
import DishHeader from "@/components/dish/DishHeader";
import DishOption from "@/components/dish/DishOption";
import DishQuantity from "@/components/dish/DishQuantity";
import DishObservations from "@/components/dish/DishObservations";

type MenuPageProps = {
  params: {
    dishId: string;
    restaurantId: string;
  };
};

export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { dishId } = params;

  const ID = Number(dishId);

  const dish = await getDishWithDetails(ID);

  if (!dish) return generateNotFoundMetadata("Prato");

  return generatePageMetadata(
    dish.name,
    `${dish.name} - ${dish.description || "Peça agora mesmo!"}`
  );
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { dishId } = await params;

  const ID = Number(dishId);

  const dish = await getDishWithDetails(ID);

  if (!dish)
    return (
      <section>
        <h1 className="p-md text-label text-center">Prato não encontrado</h1>
      </section>
    );

  return (
    <article>
      <Banner
        height="md"
        image={dish.image || "/images/dish.webp"}
        alt={`Imagem do prato ${dish.name}`}
      />

      <div className="max-container-md">
        <DishHeader dish={dish} />
        <DishQuantity dish={dish} />

        <section aria-label="Opções do prato">
          {dish.options.map((option) => (
            <DishOption key={option.id} option={option} dish={dish} />
          ))}
        </section>

        <DishObservations dish={dish} />
      </div>
    </article>
  );
}
