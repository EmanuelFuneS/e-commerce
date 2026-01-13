import { getBrands } from "src/actions/brand.actions";
import { getCategories } from "src/actions/category.actions";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Brand, Category } from "../types";
import { ProductHelper } from "../utils/productHelper";

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
    const result = current?.map((cat: Category) => ({
      id: cat.id,
      name: cat.name,
    }));
    if (current && current?.length > 0) {
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
    const result = current?.map((brand: Brand) => ({
      id: brand.id,
      name: brand.name,
    }));

    if (current && current?.length > 0) {
      set({ brands: result, isInitialized: true });
    }
  },
}));

interface BuildComponent {
  categoryName: string;
  componentId: string;
  price: number;
}
interface PCBuilderState {
  builderState: BuildComponent[];
  totalPrice: number;
  setComponent: (cat: string, id: string, price: number) => void;
  replaceComponent: (oldId: string, newId: string, newPrice: number) => void;
  removeComponent: (id: string) => void;
  clearAll: () => void;
  getComponentByShortId: (shortId: string) => string | undefined;
}

export const useBuilderStore = create<PCBuilderState>()(
  persist(
    (set, get) => ({
      builderState: [],
      totalPrice: 0,
      setComponent: (cat: string, id: string, price: number) =>
        set((state) => {
          console.warn("🔍 Debug:", {
            price,
            typeOfPrice: typeof price,
            currentTotal: state.totalPrice,
            typeOfTotal: typeof state.totalPrice,
            suma: state.totalPrice + price,
          });
          const newComponent = {
            categoryName: cat,
            componentId: id,
            price: price,
          };

          const exists = state.builderState.some(
            (component) => component.componentId === id
          );
          if (exists) {
            return state;
          }

          return {
            builderState: [...state.builderState, newComponent],
            totalPrice: ProductHelper.roundPrice(state.totalPrice + price),
          };
        }),
      replaceComponent: (oldId: string, newId: string, newPrice: number) => {
        set((state) => {
          const oldComponent = state.builderState.find((component) => {
            return component.componentId === oldId;
          });

          if (!oldComponent) {
            return state;
          }

          const priceDiff = newPrice - oldComponent.price;

          return {
            builderState: state.builderState.map((build) =>
              build.componentId === oldId
                ? { ...build, componentId: newId }
                : build
            ),
            totalPrice: ProductHelper.roundPrice(state.totalPrice + priceDiff),
          };
        });
      },
      removeComponent: (id: string) =>
        set((state) => {
          const oldComponent = state.builderState.find((component) => {
            return component.componentId === id;
          });

          if (!oldComponent) {
            return state;
          }

          const newTotal = state.totalPrice - oldComponent.price;

          return {
            builderState: state.builderState.filter(
              (buildStored) => buildStored.componentId !== id
            ),
            totalPrice: Math.abs(newTotal) < 0.01 ? 0 : newTotal,
          };
        }),
      clearAll: () => set(() => ({ builderState: [], totalPrice: 0 })),
      getComponentByShortId: (shortId: string) => {
        const state = get();
        return state.builderState.find(
          (build) =>
            build.componentId.slice(-8).toLowerCase() === shortId.toLowerCase()
        )?.componentId;
      },
    }),
    {
      name: "builder-store",
    }
  )
);
