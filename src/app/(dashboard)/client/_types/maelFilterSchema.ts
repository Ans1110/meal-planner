import z from "zod";

const mealFilterSchema = z.object({
  dateTime: z.coerce.date(),
});

type MealFilterSchemaType = z.infer<typeof mealFilterSchema>;

const mealFilterDefaultValues: MealFilterSchemaType = {
  dateTime: new Date(),
};

export { mealFilterSchema, type MealFilterSchemaType, mealFilterDefaultValues };
