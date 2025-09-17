import { create } from "zustand";
import { getCategories } from "../actions";

export interface Category {
  id: string;
  name: string;
}

export const useCategoriesStore = create<{
  categories: Category[];
  isInitialized: boolean;
  initializeCategories: () => Promise<void>;
}>((set, get) => ({
  categories: [],
  isInitialized: false,
  initializeCategories: async () => {
    const { isInitialized } = get();

    if (isInitialized) return;

    const current = await getCategories();

    if (current?.success && current.data.length > 0) {
      set({ categories: current.data, isInitialized: true });
    }
  },
}));
