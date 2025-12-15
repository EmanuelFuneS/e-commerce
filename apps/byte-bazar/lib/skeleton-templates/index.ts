import { Brand, Category, Product } from "../types";

export const brandTemplate: Brand = {
  id: "",
  name: "",
  logo: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const productTemplate: Product = {
  id: "",
  name: "",
  description: "",
  price: 100,
  stock: 10,
  isActive: true,
  categoryId: "",
  brandId: "",
  images: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  category: { name: "" },
  brand: { name: "" },
};

export const categoriesTemplate: Category = {
  name: "",
  imageUrl: "",
};

export function createSkeleton<T>(sampleObject: T): T {
  if (sampleObject === null || sampleObject === undefined) {
    return sampleObject;
  }

  if (typeof sampleObject === "string") {
    return "" as T;
  }

  if (typeof sampleObject === "number") {
    return 0 as T;
  }

  if (typeof sampleObject === "boolean") {
    return false as T;
  }

  if (sampleObject instanceof Date) {
    return new Date() as T;
  }

  if (Array.isArray(sampleObject)) {
    return [] as T;
  }

  if (typeof sampleObject === "object") {
    const skeleton = {} as T;
    for (const key in sampleObject) {
      if (sampleObject.hasOwnProperty(key)) {
        skeleton[key] = createSkeleton(sampleObject[key]);
      }
    }
    return skeleton;
  }

  return sampleObject;
}

export function createSkeletons<T>(sampleObject: T, count: number = 4): T[] {
  return Array.from({ length: count }, () => createSkeleton(sampleObject));
}
