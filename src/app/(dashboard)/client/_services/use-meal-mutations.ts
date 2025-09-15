import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealSchemaType } from "../_types/mealSchema";
import { createMeal, deleteMeal, updateMeal } from "./mealMutations";
import { toast } from "sonner";

const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchemaType) => {
      await createMeal(data);
    },
    onSuccess: () => {
      toast.success("Meal created successfully");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useUpdateMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MealSchemaType) => {
      await updateMeal(data);
    },
    onSuccess: () => {
      toast.success("Meal updated successfully");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteMeal(id);
    },
    onSuccess: () => {
      toast.success("Meal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

export { useCreateMeal, useUpdateMeal, useDeleteMeal };
