import { patterns } from "@/lib/constants";
import { regexSchema } from "@/lib/zodSchemas";
import z from "zod";

const foodFilterSchema = z.object({
  searchTerm: z.string(),
  caloriesRange: z.tuple([
    regexSchema(patterns.zeroTo9999),
    regexSchema(patterns.zeroTo9999),
  ]),
  proteinRange: z.tuple([
    regexSchema(patterns.zeroTo9999),
    regexSchema(patterns.zeroTo9999),
  ]),
  categoryId: z.string(),
  sortBy: z
    .enum(["name", "calories", "protein", "fat", "carbohydrates"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number(),
  pageSize: z.number().max(100),
});

type FoodFilterSchemaType = z.infer<typeof foodFilterSchema>;

const foodFilterDefaultValues: FoodFilterSchemaType = {
  searchTerm: "",
  caloriesRange: ["0", "9999"],
  proteinRange: ["0", "9999"],
  categoryId: "",
  sortBy: "name",
  sortOrder: "desc",
  page: 1,
  pageSize: 12,
};

export { foodFilterSchema, type FoodFilterSchemaType, foodFilterDefaultValues };
