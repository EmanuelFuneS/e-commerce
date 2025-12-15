import { unstable_cache } from "next/cache";
import prisma, { safeDbOperation } from "../prisma";

export interface FilterData {
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
}

export interface FilterType {
  type: "category" | "brand";
  value: string;
  id: string;
}

export const getCachedFilterData = unstable_cache(
  async () /* : Promise<FilterData> */ => {
    return safeDbOperation(async () => {
      const [categories, brands] = await prisma.$transaction([
        prisma.category.findMany({
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        }),
        prisma.brand.findMany({
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        }),
      ]);

      return {
        categories,
        brands,
      };
    });
  }
);
