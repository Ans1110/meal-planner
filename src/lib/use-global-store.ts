import { createStore } from "./createStore";

type AlertConfigType = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type StateType = {
  alertOpen: boolean;
  alertConfig: AlertConfigType | null;
};

type ActionsType = {
  updateAlertOpen: (is: StateType["alertOpen"]) => void;
  showAlert: (config: AlertConfigType) => void;
};

type StoreType = StateType & ActionsType;

const useGlobalStore = createStore<StoreType>(
  (set) => ({
    alertOpen: false,
    alertConfig: null,
    updateAlertOpen: (isOpen) =>
      set((state) => {
        state.alertOpen = isOpen;
        if (!isOpen) state.alertConfig = null;
      }),
    showAlert: (config) =>
      set((state) => {
        state.alertConfig = config;
        state.alertOpen = true;
      }),
  }),
  {
    name: "global-store",
    excludeFromPersist: ["alertOpen"],
  }
);

const alert = (config: AlertConfigType) => {
  useGlobalStore.getState().showAlert(config);
};

export { useGlobalStore, alert };
