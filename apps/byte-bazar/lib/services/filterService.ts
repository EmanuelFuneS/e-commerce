import { unstable_cache } from "next/cache";
import prisma, { safeDbOperation } from "../prisma";

export interface FilterData {
  categories: Array<string>;
  brands: Array<string>;
}

export interface FilterType {
  type: "category" | "brand" | null;
  value: string;
}

export const getCachedFilterData = unstable_cache(
  async () /* : Promise<FilterData> */ => {
    return safeDbOperation(async () => {
      const [categories, brands] = await prisma.$transaction([
        prisma.category.findMany({
          where: { isActive: true },
          select: { name: true },
          orderBy: { name: "asc" },
        }),
        prisma.brand.findMany({
          where: { isActive: true },
          select: { name: true },
          orderBy: { name: "asc" },
        }),
      ]);

      const arrayCat = categories.map((el) => el.name);
      const arrayBrand = brands.map((el) => el.name);

      return { categories: arrayCat, brands: arrayBrand };
    });
  }
);
