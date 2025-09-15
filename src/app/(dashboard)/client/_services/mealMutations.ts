"use server";

import { executeAction } from "@/lib/executeAction";
import { mealSchema, MealSchemaType } from "../_types/mealSchema";
import db from "@/lib/db";
import { toNumberSafe } from "@/lib/utils";

const createMeal = async (data: MealSchemaType) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = mealSchema.parse(data);

      const meal = await db.meal.create({
        data: {
          userId: toNumberSafe(validatedData.userId),
          dateTime: validatedData.dateTime,
        },
      });

      await Promise.all(
        validatedData.mealFoods.map(async (food) => {
          await db.mealFood.create({
            data: {
              mealId: meal.id,
              foodId: toNumberSafe(food.foodId),
              servingUnitId: toNumberSafe(food.servingUnitId),
              amount: toNumberSafe(food.amount),
            },
          });
        })
      );
    },
  });
};

const updateMeal = async (data: MealSchemaType) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = mealSchema.parse(data);

      if (validatedData.action === "update") {
        await db.meal.update({
          where: { id: validatedData.id },
          data: {
            dateTime: validatedData.dateTime,
          },
        });

        await db.mealFood.deleteMany({
          where: { mealId: validatedData.id },
        });

        await Promise.all(
          validatedData.mealFoods.map(async (food) => {
            await db.mealFood.create({
              data: {
                mealId: validatedData.id,
                foodId: toNumberSafe(food.foodId),
                servingUnitId: toNumberSafe(food.servingUnitId),
                amount: toNumberSafe(food.amount),
              },
            });
          })
        );
      }
    },
  });
};

const deleteMeal = async (id: number) => {
  await executeAction({
    actionFn: async () => {
      await db.mealFood.deleteMany({
        where: { mealId: id },
      });

      await db.meal.delete({
        where: { id },
      });
    },
  });
};

export { createMeal, updateMeal, deleteMeal };
