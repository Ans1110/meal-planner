import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "./categoryQueries";
import { useCategoriesStore } from "../_libs/use-category-store";

const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useGetCategory = () => {
  const { selectedCategoryId } = useCategoriesStore();
  return useQuery({
    queryKey: ["category", { selectedCategoryId }],
    queryFn: () => getCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};

export { useGetCategories, useGetCategory };
