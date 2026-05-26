import { getBrands } from "src/actions/brand.actions";
import { getCategories } from "src/actions/category.actions";
import { getProducts } from "src/actions/product.actions";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Brand, Category, Product } from "../types";
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
  initializeCategories: () => Promise<void>;
  isInitialized: boolean;
}>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "categories",
    },
  ),
);

export const useBrandsStore = create<{
  brands: StoreBrand[];
  initializeBrands: () => Promise<void>;
  isInitialized: boolean;
}>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "brands",
    },
  ),
);

interface PCBuilderState {
  builderState: Product[];
  totalPrice: number;
  setComponent: (product: Product) => void;
  replaceComponent: (oldId: string, newProduct: Product) => void;
  removeComponent: (id: string) => void;
  clearAll: () => void;
  getComponentByShortId: (shortId: string) => string | undefined;
  transferToCart: () => void;
}

export const useBuilderStore = create<PCBuilderState>()(
  persist(
    (set, get) => ({
      builderState: [],
      totalPrice: 0,
      setComponent: (product: Product) =>
        set((state) => {
          const exists = state.builderState.some(
            (component) => component.id === product.id,
          );
          if (exists) {
            return state;
          }

          return {
            builderState: [...state.builderState, product],
            totalPrice: ProductHelper.roundPrice(
              state.totalPrice + Number(product.price),
            ),
          };
        }),
      replaceComponent: (oldId: string, newProduct: Product) => {
        set((state) => {
          const oldComponent = state.builderState.find((component) => {
            return component.id === oldId;
          });

          if (!oldComponent) {
            return state;
          }

          const priceDiff =
            Number(newProduct.price) - Number(oldComponent.price);

          return {
            builderState: state.builderState.map((build) =>
              build.id === oldId ? newProduct : build,
            ),
            totalPrice: ProductHelper.roundPrice(state.totalPrice + priceDiff),
          };
        });
      },
      removeComponent: (id: string) =>
        set((state) => {
          const componentToRemove = state.builderState.find((component) => {
            return component.id === id;
          });

          if (!componentToRemove) {
            return state;
          }

          const newTotal = state.totalPrice - Number(componentToRemove.price);

          return {
            builderState: state.builderState.filter(
              (buildStored) => buildStored.id !== id,
            ),
            totalPrice: Math.abs(newTotal) < 0.01 ? 0 : newTotal,
          };
        }),
      clearAll: () => set(() => ({ builderState: [], totalPrice: 0 })),
      getComponentByShortId: (shortId: string) => {
        const state = get();
        return state.builderState.find(
          (build) => build.id.slice(-8).toLowerCase() === shortId.toLowerCase(),
        )?.id;
      },
      transferToCart: () => {
        const { builderState, clearAll } = get();
        const { addToCart } = useStoreCart.getState();
        builderState.forEach((product) => addToCart(product));
        console.log("transfer success");
        clearAll();
      },
    }),
    {
      name: "builder-store",
    },
  ),
);

export const useProductsStore = create<{
  products: Product[];
  initializeProducts: () => Promise<void>;
  isInitialized: boolean;
  isLoading: boolean;
}>()((set, get) => ({
  products: [],
  isInitialized: false,
  isLoading: false,
  initializeProducts: async () => {
    const { isInitialized } = get();
    if (isInitialized) return;
    set({ isLoading: true });
    try {
      const response = await getProducts({}, undefined);
      if (response?.products) {
        set({
          products: response.products,
          isInitialized: true,
          isLoading: false,
        });
        return;
      }
    } catch {
      // fall through
    }
    set({ isLoading: false });
  },
}));

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeToCart: (id: string) => void;
  clearCart: () => void;
}
export const useStoreCart = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (item: Product) => {
    const { cart } = get();
    set((state) => {
      const merged = [...state.cart];
      const exist = merged.find((i) => i.id === item.id);
      if (!exist) merged.push(item);
      return { cart: merged };
    });
  },
  removeToCart: (id: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
  clearCart: () => set({ cart: [] }),
}));
