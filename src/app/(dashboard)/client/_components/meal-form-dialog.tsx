"use client";
import { Session } from "next-auth";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  mealDefaultValues,
  mealSchema,
  MealSchemaType,
} from "../_types/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMealStore } from "../_lib/use-meal-store";
import { useMeal } from "../_services/use-meal-queries";
import { useCreateMeal, useUpdateMeal } from "../_services/use-meal-mutations";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ControlledDatePicker } from "@/components/ui/controlled-date-picker";
import { Plus } from "lucide-react";
import { SpecifyMealFoods } from "./specify-meal-foods";

type MealFormDialogProps = {
  smallTrigger?: boolean;
  session?: Session;
};

const MealFormDialog = ({ smallTrigger, session }: MealFormDialogProps) => {
  const form = useForm<MealSchemaType>({
    defaultValues: mealDefaultValues,
    resolver: zodResolver(mealSchema),
  });

  const userId = useWatch({ control: form.control, name: "userId" });

  const {
    selectedMealId,
    updateMealDialogOpen,
    updateSelectedMealId,
    mealDialogOpen,
  } = useMealStore();

  const mealQuery = useMeal();
  const updateMealMutation = useUpdateMeal();
  const createMealMutation = useCreateMeal();

  useEffect(() => {
    if (!!selectedMealId && mealQuery.data) {
      form.reset(mealQuery.data);
    }
  }, [selectedMealId, mealQuery.data, form]);

  useEffect(() => {
    if (!userId && session?.user?.id) {
      form.setValue("userId", session.user.id);
    }
  }, [userId, session?.user?.id, form]);

  const handleDialogOpenChange = (isOpen: boolean) => {
    updateMealDialogOpen(isOpen);

    if (!isOpen) {
      updateSelectedMealId(null);
      form.reset(mealDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<MealSchemaType> = (data) => {
    if (data.action === "create") {
      createMealMutation.mutate(data, {
        onSuccess: handleSuccess,
        onError: (error) => {
          console.error("Error creating meal:", error);
        },
      });
    } else {
      updateMealMutation.mutate(data, {
        onSuccess: handleSuccess,
        onError: (error) => {
          console.error("Error updating meal:", error);
        },
      });
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);

    // Show user-friendly error messages
    if (errors.mealFoods) {
      toast.error("Please add at least one food item to the meal");
    } else if (errors.userId) {
      toast.error("User ID is required");
    } else if (errors.dateTime) {
      toast.error("Please select a valid date and time");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const isPending =
    createMealMutation.isPending || updateMealMutation.isPending;

  return (
    <Dialog open={mealDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Meal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedMealId ? "Edit Meal" : "Create a New Meal"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SpecifyMealFoods />
              </div>
              <div className="col-span-2">
                <ControlledDatePicker<MealSchemaType> name="dateTime" />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {selectedMealId ? "Edit" : "Create"} Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { MealFormDialog };
