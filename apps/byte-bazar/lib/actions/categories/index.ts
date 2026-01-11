"use server";

import { prisma, safeDbOperation } from "@workspace/database";
import { revalidatePath } from "next/cache";
import { categoriesTemplate, createSkeletons } from "../../skeleton-templates";
import { ActionResponse } from "../../types/common";

export async function createCategory() {}

export async function getCategories() {
  console.log("[getCategories] Iniciando llamada a Prisma...");
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    console.log(
      "[getCategories] Resultado:",
      categories.length,
      "categorías encontradas"
    );
    return { success: true, data: categories };
  } catch (error) {
    console.error("[getCategories] Error Prisma:", error);
    return { success: false, data: createSkeletons(categoriesTemplate, 9) };
  }
}

export async function getCategoryPreview() {
  return safeDbOperation<ActionResponse>(
    async () => {
      const brands = await prisma.category.findMany({
        orderBy: { name: "asc" },
        take: 10,
      });

      return { success: true, data: brands } as ActionResponse;
    }, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { success: false, data: createSkeletons(categoriesTemplate, 9) }
  );
}

export async function getCategoryById() {}

export async function updateCategory() {}

export async function deleteCategory() {}

export async function revalidateCategoryPath() {
  revalidatePath("/categories");
}
