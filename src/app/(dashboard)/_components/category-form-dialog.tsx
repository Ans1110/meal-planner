"use client";

import {
  categoryDefaultValues,
  categorySchema,
  CategorySchemaType,
} from "../admin/foods-management/categories/_types/categorySchema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoriesStore } from "../admin/foods-management/categories/_libs/use-category-store";
import { useGetCategory } from "../admin/foods-management/categories/_services/use-category-queries";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../admin/foods-management/categories/_services/use-category-mutations";
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
import { useEffect } from "react";

type CategoryFormDialogProps = {
  smallTrigger?: boolean;
};

const CategoryFormDialog = ({ smallTrigger }: CategoryFormDialogProps) => {
  const form = useForm<CategorySchemaType>({
    defaultValues: categoryDefaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {
    selectedCategoryId,
    updateCategoryDialogOpen,
    updateSelectedCategoryId,
    categoryDialogOpen,
  } = useCategoriesStore();

  const categoryQuery = useGetCategory();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const isPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  useEffect(() => {
    if (selectedCategoryId && categoryQuery.data) {
      form.reset(categoryQuery.data);
    }
  }, [selectedCategoryId, categoryQuery.data, form]);

  const handleDialogOpenChange = (isOpen: boolean) => {
    updateCategoryDialogOpen(isOpen);

    if (!isOpen) {
      updateSelectedCategoryId(null);
      form.reset(categoryDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<CategorySchemaType> = (data) => {
    if (data.action === "create") {
      createCategoryMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateCategoryMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    }
  };

  return (
    <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedCategoryId ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <ControlledInput<CategorySchemaType>
              name="name"
              label="Name"
              placeholder="Enter category name"
            />
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedCategoryId ? "Edit" : "Create"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
export { CategoryFormDialog };
