import { create } from "zustand";
import { getBrands, getCategories } from "../actions";
import { Brand, Category } from "../types";

export interface StoreCategory {
  id: string;
  name: string;
}

export interface StoreBrand {
  id: string;
  name: string;
}

export const useCategoriesStore = create<{
  categories: StoreCategory[];
  isInitialized: boolean;
  initializeCategories: () => Promise<void>;
}>((set, get) => ({
  categories: [],
  isInitialized: false,
  initializeCategories: async () => {
    const { isInitialized } = get();

    if (isInitialized) return;

    const current = await getCategories();

    const result = current?.data.map((cat: Category) => ({
      id: cat.id,
      name: cat.name,
    }));

    if (current?.success && current.data.length > 0) {
      set({ categories: result, isInitialized: true });
    }
  },
}));

export const useBrandsStore = create<{
  brands: StoreBrand[];
  initializeBrands: () => Promise<void>;
  isInitialized: boolean;
}>((set, get) => ({
  brands: [],
  isInitialized: false,
  initializeBrands: async () => {
    const { isInitialized } = get();

    if (isInitialized) return;

    const current = await getBrands();

    const result = current?.data.map((brand: Brand) => ({
      id: brand.id,
      name: brand.name,
    }));

    if (current?.success && current.data.length > 0) {
      set({ brands: result, isInitialized: true });
    }
  },
}));
