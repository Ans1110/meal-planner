"use server";

import { auth } from "@/lib/auth";
import {
  mealFilterSchema,
  MealFilterSchemaType,
} from "../_types/maelFilterSchema";
import { Prisma } from "$/generated/prisma";
import db from "@/lib/db";
import { MealSchemaType } from "../_types/mealSchema";
import { toStringSafe } from "@/lib/utils";

const getMeals = async (filters: MealFilterSchemaType) => {
  const validatedFilters = mealFilterSchema.parse(filters);

  const session = await auth();

  const { dateTime } = validatedFilters || {};

  const where: Prisma.MealWhereInput = {};

  if (dateTime !== undefined) {
    const startTime = new Date(dateTime);
    startTime.setHours(0, 0, 0, 0);

    const endTime = new Date(dateTime);
    endTime.setHours(23, 59, 59, 999);

    where.dateTime = {
      gte: startTime,
      lte: endTime,
    };

    if (session?.user?.id) {
      where.userId = {
        equals: +session.user.id,
      };
    }

    const data = await db.meal.findMany({
      where,
      orderBy: { dateTime: "desc" },
      include: {
        MealFood: {
          include: {
            food: true,
            servingUnit: true,
          },
        },
      },
    });

    return data;
  }
};

const getMeal = async (id: number): Promise<MealSchemaType | null> => {
  const res = await db.meal.findFirst({
    where: { id },
    include: {
      MealFood: true,
    },
  });

  if (!res) return null;

  return {
    action: "update" as const,
    id,
    dateTime: res.dateTime,
    userId: toStringSafe(res.userId),
    mealFoods:
      res.MealFood.map((item) => ({
        foodId: toStringSafe(item.foodId),
        servingUnitId: toStringSafe(item.servingUnitId),
        amount: toStringSafe(item.amount),
      })) ?? [],
  };
};

export { getMeals, getMeal };
