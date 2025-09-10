import { patterns } from "@/lib/constants";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";

const foodSchema = z.intersection(
  z.object({
    name: requiredStringSchema,
    calories: regexSchema(patterns.zeroTo9999),
    protein: regexSchema(patterns.zeroTo9999),
    fat: regexSchema(patterns.zeroTo9999),
    carbohydrates: regexSchema(patterns.zeroTo9999),
    sugars: regexSchema(patterns.zeroTo9999),
    fiber: regexSchema(patterns.zeroTo9999),
    categoryId: requiredStringSchema,
    foodServingUnits: z.array(
      z.object({
        foodServingUnitId: requiredStringSchema,
        grams: regexSchema(patterns.zeroTo9999),
      })
    ),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number() }),
  ])
);

type FoodSchemaType = z.infer<typeof foodSchema>;

const foodDefaultValues: FoodSchemaType = {
  action: "create",
  name: "",
  calories: "",
  protein: "",
  fat: "",
  carbohydrates: "",
  sugars: "",
  fiber: "",
  categoryId: "",
  foodServingUnits: [],
};

export { foodSchema, type FoodSchemaType, foodDefaultValues };
