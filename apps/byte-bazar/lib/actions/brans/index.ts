"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

import brandSchema, { BrandSchema } from "../../schemas/brand/brand.schema";
import { ActionResponse } from "../../types/common";

export async function createBrand(data: BrandSchema): Promise<ActionResponse> {
  try {
    const validateData = brandSchema.parse(data);
    const brand = await prisma.brand.create({
      data: validateData,
    });

    revalidateBrandPath();
    return { success: true, data: brand } as ActionResponse;
  } catch (error) {
    console.error("Error creating brand", error);
    return {
      success: false,
      message: "Failed to create brand",
    } as ActionResponse;
  }
}

export async function getBrands(
  page: number = 1,
  pageSize: number = 10
): Promise<ActionResponse> {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      success: true,
      data: brands,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(brands.length / pageSize),
        totalItems: brands.length,
      },
    } as ActionResponse;
  } catch (error) {
    console.error("Error fetching brands", error);
    return {
      success: false,
      error: "Failed to get brands",
    } as ActionResponse;
  }
}

export async function getBrandById(id: string): Promise<ActionResponse> {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      return { success: false, error: "brand not found" } as ActionResponse;
    }

    return { success: true, data: brand } as ActionResponse;
  } catch (error) {
    console.error("Error fetching brand by Id", error);
    return {
      success: false,
      error: "Failed to fetch brand by ID",
    } as ActionResponse;
  }
}

export async function getBrandPreview(): Promise<ActionResponse> {
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

export async function updateBrand() {}

export async function deleteSoftBrand(id: string): Promise<ActionResponse> {
  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: { isActive: false },
    });

    revalidateBrandPath();
    return { success: true, data: brand } as ActionResponse;
  } catch (error) {
    console.error("Error soft deleting brand", error);
    return {
      success: false,
      error: "Failed to soft delete brand",
    } as ActionResponse;
  }
}

export async function deleteBrand(id: string): Promise<ActionResponse> {
  try {
    await prisma.brand.delete({
      where: { id },
    });

    revalidateBrandPath();
    return {
      success: true,
      message: "Brand deleted successfully",
    } as ActionResponse;
  } catch (error) {
    console.error("Error deleting brand", error);
    return {
      success: false,
      error: "Failed to delete brand",
    } as ActionResponse;
  }
}

export async function revalidateBrandPath() {
  revalidatePath("/brands");
}
