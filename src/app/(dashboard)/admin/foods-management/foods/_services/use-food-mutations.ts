import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodSchemaType } from "../_types/foodSchema";
import { createFood, deleteFood, updateFood } from "./foodMutations";
import { toast } from "sonner";

const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FoodSchemaType) => {
      await createFood(data);
    },
    onSuccess: () => {
      toast.success("Food created successfully");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

const useUpdateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FoodSchemaType) => {
      await updateFood(data);
    },
    onSuccess: () => {
      toast.success("Food updated successfully");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteFood(id);
    },
    onSuccess: () => {
      toast.success("Food deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

export { useCreateFood, useUpdateFood, useDeleteFood };
