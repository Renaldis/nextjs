import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  count: number;
  inc: () => void;
};

const dataStore = create<Store>()(
  persist(
    (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "data-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { dataStore };
