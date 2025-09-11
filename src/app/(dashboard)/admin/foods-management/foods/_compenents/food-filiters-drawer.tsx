"use client";

import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  foodFilterDefaultValues,
  foodFilterSchema,
  FoodFilterSchemaType,
} from "../_types/foodFilterSchema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFoodsStore } from "../_libs/use-food-store";
import { useEffect, useMemo } from "react";
import equal from "fast-deep-equal";
import { useDebounce } from "@/lib/use-deboundce";
import { useGetCategories } from "../../categories/_services/use-category-queries";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ControlledInput } from "@/components/ui/controlled-input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { ControlledSelect } from "@/components/ui/controlled-select";
import { ControlledSlider } from "@/components/ui/controlled-silders";

const FoodFiltersDrawer = () => {
  const form = useForm<FoodFilterSchemaType>({
    defaultValues: foodFilterDefaultValues,
    resolver: zodResolver(foodFilterSchema),
  });

  const {
    updateFoodFilters,
    foodFiltersDrawerOpen,
    updateFoodFiltersDrawerOpen,
    updateFoodFiltersSearchTerm,
    foodFilters,
  } = useFoodsStore();

  const areFiltersModified = useMemo(
    () => !equal(foodFilters, foodFilterDefaultValues),
    [foodFilters]
  );

  const searchTerm = useWatch({ control: form.control, name: "searchTerm" });
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    updateFoodFiltersSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateFoodFiltersSearchTerm]);

  const categoriesQuery = useGetCategories();

  useEffect(() => {
    if (!foodFiltersDrawerOpen) {
      form.reset(foodFilterDefaultValues);
    }
  }, [foodFilters, foodFiltersDrawerOpen, form]);

  const onSubmit: SubmitHandler<FoodFilterSchemaType> = (data) => {
    updateFoodFilters(data);
    updateFoodFiltersDrawerOpen(false);
  };

  return (
    <Drawer
      open={foodFiltersDrawerOpen}
      onOpenChange={updateFoodFiltersDrawerOpen}
      direction="right"
      handleOnly
    >
      <FormProvider {...form}>
        <div className="flex gap-2">
          <ControlledInput<FoodFilterSchemaType>
            name="searchTerm"
            placeholder="Quick Search"
            containerClassName="max-w-48"
          />
          <DrawerTrigger asChild>
            <Button variant="outline" badge={areFiltersModified}>
              <FilterIcon />
              Filters
            </Button>
          </DrawerTrigger>
        </div>

        <form>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>
                Customize your search criteria
              </DrawerDescription>
            </DrawerHeader>
            <div className="sapce-y-2 p-4">
              <div className="flex flex-wrap gap-2">
                <ControlledSelect<FoodFilterSchemaType>
                  name="categoryId"
                  label="Category"
                  options={categoriesQuery.data?.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />

                <ControlledSelect<FoodFilterSchemaType>
                  name="sortBy"
                  label="Sort By"
                  options={[
                    {
                      value: "name",
                      label: "Name",
                    },
                    {
                      value: "calories",
                      label: "Calories",
                    },
                    {
                      value: "protein",
                      label: "Protein",
                    },
                    {
                      value: "fat",
                      label: "Fat",
                    },
                    {
                      value: "carbohydrates",
                      label: "Carbohydrates",
                    },
                  ]}
                />

                <ControlledSelect<FoodFilterSchemaType>
                  name="sortOrder"
                  label="Sort Order"
                  options={[
                    { value: "asc", label: "Ascending" },
                    { value: "desc", label: "Descending" },
                  ]}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <ControlledSlider<FoodFilterSchemaType>
                  name="caloriesRange"
                  label="Calories"
                  min={0}
                  max={9999}
                />
                <ControlledSlider<FoodFilterSchemaType>
                  name="proteinRange"
                  label="Protein"
                  min={0}
                  max={9999}
                />
              </div>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset(foodFilterDefaultValues)}
              >
                Reset
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Apply Filters
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export { FoodFiltersDrawer };
