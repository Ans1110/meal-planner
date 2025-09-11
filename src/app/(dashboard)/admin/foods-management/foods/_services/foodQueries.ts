"use server";
import { Prisma } from "$/generated/prisma";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import {
  foodFilterSchema,
  FoodFilterSchemaType,
} from "../_types/foodFilterSchema.";
import db from "@/lib/db";
import { FoodSchemaType } from "../_types/foodSchema";
import { toStringSafe } from "@/lib/utils";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: {
    FoodServingUnit: true;
  };
}>;

const getFoods = async (
  filters: FoodFilterSchemaType
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const validatedFilters = foodFilterSchema.parse(filters);
  const {
    searchTerm,
    caloriesRange,
    proteinRange,
    categoryId,
    sortBy = "name",
    sortOrder,
    page,
    pageSize,
  } = validatedFilters;

  const where: Prisma.FoodWhereInput = {};

  if (searchTerm) {
    where.name = {
      contains: searchTerm,
    };
  }

  const [minCalories, maxCalories] = caloriesRange;
  const numericMinCalories =
    minCalories === "" ? undefined : Number(minCalories);
  const numericMaxCalories =
    maxCalories === "" ? undefined : Number(maxCalories);

  if (numericMaxCalories !== undefined || numericMinCalories !== undefined) {
    where.calories = {};
    if (numericMaxCalories !== undefined)
      where.calories.lte = numericMaxCalories;
    if (numericMinCalories !== undefined)
      where.calories.gte = numericMinCalories;
  }

  const [minProtein, maxProtein] = proteinRange;
  const numericMinProtein = minProtein === "" ? undefined : Number(minProtein);
  const numericMaxProtein = maxProtein === "" ? undefined : Number(maxProtein);

  if (numericMaxProtein !== undefined || numericMinProtein !== undefined) {
    where.protein = {};
    if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
    if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
  }

  const numericCategoryId = categoryId ? Number(categoryId) : undefined;
  if (numericCategoryId !== undefined && numericCategoryId !== 0) {
    where.category = {
      id: numericCategoryId,
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    db.food.count({ where }),
    db.food.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
      include: {
        FoodServingUnit: true,
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

const getFood = async (id: number): Promise<FoodSchemaType | null> => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      FoodServingUnit: true,
    },
  });

  if (!res) return null;

  return {
    action: "update",
    id,
    name: res.name,
    fat: toStringSafe(res.fat),
    carbohydrates: toStringSafe(res.carbs),
    sugars: toStringSafe(res.sugars),
    fiber: toStringSafe(res.fiber),
    foodServingUnits: res.FoodServingUnit.map((fsu) => ({
      foodServingUnitId: toStringSafe(fsu.servingUnitId),
      grams: toStringSafe(fsu.grams),
    })),
    protein: toStringSafe(res.protein),
    calories: toStringSafe(res.calories),
    categoryId: toStringSafe(res.categoryId),
  };
};

export { getFoods, getFood };
