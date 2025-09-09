"use client";

import { useGetCategories } from "../_services/use-category-queries";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";

const CategoryCards = () => {
  const categories = useGetCategories();
  const deleteCategory = useDeleteCategory();
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {categories.data?.map((item) => (
        <div
          className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
          key={item.id}
        >
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                updateSelectedCategoryId(item.id);
                updateCategoryDialogOpen(true);
              }}
            >
              <Edit />
            </Button>
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                alert({
                  onConfirm: () => deleteCategory.mutate(item.id),
                });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
export { CategoryCards };
