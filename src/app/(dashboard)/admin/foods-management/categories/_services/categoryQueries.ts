"use server";

import db from "@/lib/db";
import { CategorySchemaType } from "../_types/categorySchema";

const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

const getCategory = async (id: number): Promise<CategorySchemaType> => {
  const res = await db.category.findFirst({
    where: { id },
  });
  return {
    action: "update",
    name: res?.name ?? "",
    id,
  };
};

export { getCategories, getCategory };
