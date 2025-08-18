"use server";

import { revalidatePath } from "next/cache";
import prisma, { safeDbOperation } from "../../prisma";
import { categoriesTemplate, createSkeletons } from "../../skeleton-templates";
import { ActionResponse } from "../../types/common";

export async function createCategory() {}

export async function getCategories() {}

export async function getCategoryPreview() {
  return safeDbOperation<ActionResponse>(
    async () => {
      const brands = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 10,
      });

      return { success: true, data: brands } as ActionResponse;
    },
    { success: false, data: createSkeletons(categoriesTemplate, 9) }
  );
}

export async function getCategoryById() {}

export async function updateCategory() {}

export async function deleteCategory() {}

export async function revalidateCategoryPath() {
  revalidatePath("/categories");
}
