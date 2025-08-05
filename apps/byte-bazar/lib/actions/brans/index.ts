"use server";

import { revalidatePath } from "next/cache";

export async function createBrand() {}

export async function getBrands() {}

export async function getBrandById() {}

export async function getBrandPreview() {}

export async function updateBrand() {}

export async function deleteBrand() {}

export async function revalidateBrandPath() {
  revalidatePath("/brands");
}
