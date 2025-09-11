"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchemaType,
} from "../_types/foodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFood } from "../_services/use-food-queries";
import { useGetCategories } from "../../categories/_services/use-category-queries";
import { useCreateFood, useUpdateFood } from "../_services/use-food-mutations";
import { useFoodsStore } from "../_libs/use-food-store";
import { useCategoriesStore } from "../../categories/_libs/use-category-store";
import { useServingUnitsStore } from "../../serving-units/_libs/useServingUnitsStore";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ControlledInput } from "@/components/ui/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled-select";
import CategoryFormDialog from "@/app/(dashboard)/_components/category-form-dialog";
import { SpecifyFoodServingUnits } from "./specitfy-food-serving-units";

const FoodFormDialog = () => {
  const form = useForm<FoodSchemaType>({
    defaultValues: foodDefaultValues,
    resolver: zodResolver(foodSchema),
  });

  const foodQuery = useFood();
  const categoryQuery = useGetCategories();

  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const isPending =
    createFoodMutation.isPending || updateFoodMutation.isPending;

  const {
    selectedFoodId,
    updateFoodDialogOpen,
    updateSelectedFoodId,
    foodDialogOpen,
  } = useFoodsStore();

  const { categoryDialogOpen } = useCategoriesStore();
  const { servingUnitDialogOpen } = useServingUnitsStore();

  useEffect(() => {
    if (!!selectedFoodId && foodQuery.data) {
      form.reset(foodQuery.data);
    }
  }, [selectedFoodId, form, foodQuery.data]);

  const handleDialogOpenChange = (isOpen: boolean) => {
    updateFoodDialogOpen(isOpen);

    if (!isOpen) {
      updateSelectedFoodId(null);
      form.reset(foodDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const disableSubmit = servingUnitDialogOpen || categoryDialogOpen;

  const onSubmit: SubmitHandler<FoodSchemaType> = (data) => {
    if (data.action === "create") {
      createFoodMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
    <Dialog open={foodDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2">New Food</Plus>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedFoodId ? "Edit Food" : "Create a New Food"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={disableSubmit ? undefined : form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <ControlledInput<FoodSchemaType>
                  name="name"
                  label="Name"
                  placeholder="Enter food name"
                />
              </div>

              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchemaType>
                  name="categoryId"
                  label="Category"
                  options={categoryQuery.data?.map((category) => ({
                    value: category.id.toString(),
                    label: category.name,
                  }))}
                />
                <CategoryFormDialog smallTrigger />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="calories"
                  label="Calories"
                  placeholder="kcal"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="protein"
                  label="Protein"
                  placeholder="grams"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="carbohydrates"
                  label="Carbohydrates"
                  placeholder="grams"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="fat"
                  label="Fat"
                  placeholder="grams"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="sugars"
                  label="Sugars"
                  placeholder="grams"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<FoodSchemaType>
                  name="fiber"
                  label="Fiber"
                  placeholder="grams"
                  type="number"
                />
              </div>

              <div className="col-span-2">
                <SpecifyFoodServingUnits />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedFoodId ? "Edit" : "Create"} Food
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { FoodFormDialog };
