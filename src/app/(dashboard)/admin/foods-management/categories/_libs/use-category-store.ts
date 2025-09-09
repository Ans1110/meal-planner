import { createStore } from "@/lib/createStore";

type StateType = {
  selectedCategoryId: number | null;
  categoryDialogOpen: boolean;
};

type ActionsType = {
  updateSelectedCategoryId: (id: StateType["selectedCategoryId"]) => void;
  updateCategoryDialogOpen: (is: StateType["categoryDialogOpen"]) => void;
};

type StoreType = StateType & ActionsType;

const useCategoriesStore = createStore<StoreType>(
  (set) => ({
    selectedCategoryId: null,
    updateSelectedCategoryId: (id) =>
      set((state) => {
        state.selectedCategoryId = id;
      }),
    categoryDialogOpen: false,
    updateCategoryDialogOpen: (is) =>
      set((state) => {
        state.categoryDialogOpen = is;
      }),
  }),
  {
    name: "categories-store",
  }
);

export { useCategoriesStore };
