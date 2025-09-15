import { createStore } from "@/lib/createStore";
import {
  mealFilterDefaultValues,
  MealFilterSchemaType,
} from "../_types/maelFilterSchema";

type StateType = {
  selectedMealId: number | null;
  mealDialogOpen: boolean;
  mealFilters: MealFilterSchemaType;
};

type ActionsType = {
  updateSelectedMealId: (id: StateType["selectedMealId"]) => void;
  updateMealDialogOpen: (is: StateType["mealDialogOpen"]) => void;
  updateMealFilters: (filters: StateType["mealFilters"]) => void;
};

type StoreType = StateType & ActionsType;

const useMealStore = createStore<StoreType>(
  (set) => ({
    selectedMealId: null,
    updateSelectedMealId: (id) =>
      set((state) => {
        state.selectedMealId = id;
      }),
    mealDialogOpen: false,
    updateMealDialogOpen: (is) =>
      set((state) => {
        state.mealDialogOpen = is;
      }),
    mealFilters: mealFilterDefaultValues,
    updateMealFilters: (filters) =>
      set((state) => {
        state.mealFilters = filters;
      }),
  }),
  {
    name: "meal-store",
  }
);

export { useMealStore };
