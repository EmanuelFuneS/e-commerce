"use server";

import { prisma, safeDbOperation } from "@workspace/database";
import { revalidatePath } from "next/cache";

import brandSchema, { BrandSchema } from "../../schemas/brand/brand.schema";
import { brandTemplate, createSkeletons } from "../../skeleton-templates";
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

export async function getBrands(page: number = 1, pageSize: number = 10) {
  return safeDbOperation<ActionResponse>(
    async () => {
      const brands = await prisma.brand.findMany({
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
    },
    {
      success: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: createSkeletons(brandTemplate, 6),
      pagination: {
        page,
        pageSize,
        totalPages: 0,
        totalItems: 0,
      },
    }
  );
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

export async function getBrandPreview() {
  return safeDbOperation<ActionResponse>(
    async () => {
      const brands = await prisma.brand.findMany({
        orderBy: { name: "asc" },
        take: 6,
      });

      return { success: true, data: brands } as ActionResponse;
    }, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { success: true, data: createSkeletons(brandTemplate, 6) }
  );
}

export async function updateBrand() {}

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
