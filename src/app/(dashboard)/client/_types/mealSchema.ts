import { patterns } from "@/lib/constants";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";

const mealSchema = z.intersection(
  z.object({
    userId: requiredStringSchema,
    dateTime: z.date(),
    mealFoods: z
      .array(
        z.object({
          foodId: requiredStringSchema,
          servingUnitId: requiredStringSchema,
          amount: regexSchema(patterns.zeroTo9999),
        })
      )
      .min(1, "At least one food item is required"),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number() }),
  ])
);

type MealSchemaType = z.infer<typeof mealSchema>;

const mealDefaultValues: MealSchemaType = {
  action: "create",
  userId: "",
  dateTime: new Date(),
  mealFoods: [],
};

export { mealSchema, type MealSchemaType, mealDefaultValues };
