import { useQuery } from "@tanstack/react-query";
import { useMealStore } from "../_lib/use-meal-store";
import { getMeal, getMeals } from "./mealQueriers";

const useMeals = () => {
  const { mealFilters } = useMealStore();

  return useQuery({
    queryKey: ["meals", mealFilters],
    queryFn: () => getMeals(mealFilters),
  });
};

const useMeal = () => {
  const { selectedMealId } = useMealStore();

  return useQuery({
    queryKey: ["meal", { selectedMealId }],
    queryFn: () => getMeal(selectedMealId!),
    enabled: !!selectedMealId,
  });
};

export { useMeals, useMeal };
