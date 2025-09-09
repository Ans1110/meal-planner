import z from "zod";

const categorySchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({
      action: z.literal("create"),
    }),
    z.object({
      action: z.literal("update"),
      id: z.number().min(1),
    }),
  ])
);

type CategorySchemaType = z.infer<typeof categorySchema>;

const categoryDefaultValues: CategorySchemaType = {
  action: "create",
  name: "",
};

export { categorySchema, categoryDefaultValues, type CategorySchemaType };
