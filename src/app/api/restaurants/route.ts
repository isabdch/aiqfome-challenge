import { NextResponse } from "next/server";

import { getRestaurants } from "@/lib/services/dataService";

export async function GET() {
  try {
    const restaurants = await getRestaurants();

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);

    return NextResponse.json(
      { message: "Error fetching restaurants" },
      { status: 500 }
    );
  }
}
