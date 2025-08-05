"use server";

import { revalidatePath } from "next/cache";

export async function createCategory() {}

export async function getCategories() {}

export async function getCategoryPreview() {}

export async function getCategoryById() {}

export async function updateCategory() {}

export async function deleteCategory() {}

export async function revalidateCategoryPath() {
  revalidatePath("/categories");
}
