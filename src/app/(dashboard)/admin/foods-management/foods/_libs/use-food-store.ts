import createStore from "@/lib/createStore";
import {
  foodFilterDefaultValues,
  FoodFilterSchemaType,
} from "../_types/foodFilterSchema.";

type StateType = {
  selectedFoodId: number | null;
  foodDialogOpen: boolean;
  foodFilters: FoodFilterSchemaType;
  foodFiltersDrawerOpen: boolean;
};

type ActionsType = {
  updateSelectedFoodId: (id: StateType["selectedFoodId"]) => void;
  updateFoodDialogOpen: (is: StateType["foodDialogOpen"]) => void;
  updateFoodFilters: (filters: StateType["foodFilters"]) => void;
  updateFoodFiltersDrawerOpen: (is: StateType["foodFiltersDrawerOpen"]) => void;
  updateFoodFiltersPage: (action: "next" | "prev" | number) => void;
  updateFoodFiltersSearchTerm: (
    str: StateType["foodFilters"]["searchTerm"]
  ) => void;
};

type StoreType = StateType & ActionsType;

const useFoodsStore = createStore<StoreType>(
  (set) => ({
    selectedFoodId: null,
    updateSelectedFoodId: (id) =>
      set((state) => {
        state.selectedFoodId = id;
      }),
    foodDialogOpen: false,
    updateFoodDialogOpen: (is) =>
      set((state) => {
        state.foodDialogOpen = is;
      }),
    foodFilters: foodFilterDefaultValues,
    updateFoodFilters: (filters) =>
      set((state) => {
        state.foodFilters = filters;
      }),
    foodFiltersDrawerOpen: false,
    updateFoodFiltersDrawerOpen: (is) =>
      set((state) => {
        state.foodFiltersDrawerOpen = is;
      }),
    updateFoodFiltersPage: (action) =>
      set((state) => {
        const currentPage = state.foodFilters.page;
        let newPage = currentPage;

        if (action === "next") {
          newPage = currentPage + 1;
        } else if (action === "prev") {
          newPage = Math.max(currentPage - 1, 1);
        } else if (typeof action === "number") {
          newPage = action;
        }

        return {
          foodFilters: {
            ...state.foodFilters,
            page: newPage,
          },
        };
      }),
    updateFoodFiltersSearchTerm: (searchTerm) =>
      set((state) => {
        state.foodFilters.searchTerm = searchTerm;
      }),
  }),
  {
    name: "foods-store",
    excludeFromPersist: ["foodFilters"],
  }
);

export { useFoodsStore };
