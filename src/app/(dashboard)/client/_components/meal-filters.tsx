"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  mealFilterDefaultValues,
  mealFilterSchema,
  MealFilterSchemaType,
} from "../_types/maelFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMealStore } from "../_lib/use-meal-store";
import { ControlledDatePicker } from "@/components/ui/controlled-date-picker";
import { Button } from "@/components/ui/button";

const MealFilters = () => {
  const form = useForm<MealFilterSchemaType>({
    defaultValues: mealFilterDefaultValues,
    resolver: zodResolver(mealFilterSchema),
  });

  const { updateMealFilters } = useMealStore();

  const onSubmit: SubmitHandler<MealFilterSchemaType> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex itmescenter gap-3"
      >
        <ControlledDatePicker<MealFilterSchemaType>
          name="dateTime"
          label="Filter by date"
        />
        <Button size="sm" type="submit">
          Apply
        </Button>
      </form>
    </FormProvider>
  );
};

export { MealFilters };
