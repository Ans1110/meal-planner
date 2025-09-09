"use server";

import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { CategorySchemaType } from "../_types/categorySchema";

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: async () =>
      db.category.delete({
        where: { id },
      }),
  });
};

const createCategory = async (data: CategorySchemaType) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchemaType) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { deleteCategory, createCategory, updateCategory };
