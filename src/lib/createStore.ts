import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], [], T>,
  config?: ConfigType<T>
) => {
  const { name, storage, skipPersist, excludeFromPersist } = config || {};
  const immerStore = immer(storeCreator);
  if (skipPersist) {
    return create(immerStore);
  }

  return create(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist?.includes(key as keyof T)
          )
        ),
    })
  );
};

export default createStore;
export { createStore };
