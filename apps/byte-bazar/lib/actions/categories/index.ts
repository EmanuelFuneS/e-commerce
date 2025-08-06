"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";
import { ActionResponse } from "../../types/common";

export async function createCategory() {}

export async function getCategories() {}

export async function getCategoryPreview(): Promise<ActionResponse> {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      take: 10,
    });

    return { success: true, data: brands } as ActionResponse;
  } catch (error) {
    console.error("Error fetching brand preview", error);
    return {
      success: false,
      error: "Failed to fetch brand preview",
    } as ActionResponse;
  }
}

export async function getCategoryById() {}

export async function updateCategory() {}

export async function deleteCategory() {}

export async function revalidateCategoryPath() {
  revalidatePath("/categories");
}
