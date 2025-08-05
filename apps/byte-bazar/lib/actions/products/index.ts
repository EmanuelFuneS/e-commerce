"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";
import productsSchema, {
  ProductsSchema,
} from "../../schemas/products/products.schema";
import { ActionResponse } from "../../types/common";

export async function createProduct(
  data: ProductsSchema
): Promise<ActionResponse> {
  try {
    const validateData = productsSchema.parse(data);

    const product = await prisma.product.create({
      data: validateData,
    });

    revalidateProductPath();
    return { success: true, data: product } as ActionResponse;
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors as unknown,
      } as ActionResponse;
    }
    return {
      success: false,
      error: "Failed to create product",
    } as ActionResponse;
  }
}

export async function getProducts(
  page: number = 1,
  pageSize: number = 10
): Promise<ActionResponse> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { stockMovements: true },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      success: true,
      data: products,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(products.length / pageSize),
        totalItems: products.length,
      },
    } as ActionResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "Failed to fetch products",
    } as ActionResponse;
  }
}

export async function SearchByProductName() {
  //this function will search product by name
}

export async function getProductById(id: string): Promise<ActionResponse> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        _count: {
          select: { stockMovements: true },
        },
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" } as ActionResponse;
    }

    return { success: true, data: product } as ActionResponse;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return {
      success: false,
      error: "Failed to fetch product by id",
    } as ActionResponse;
  }
}

export async function getProductPreview() {
  //this function will return product preview max 10 products
}

export async function getProductByBrands() {}

export async function getProductByCategory() {}

export async function updateProduct(
  id: string,
  data: Partial<ProductsSchema>
): Promise<ActionResponse> {
  try {
    const validateData = productsSchema.partial().parse(data);

    if (validateData.sku) {
      const existingProduct = await prisma.product.findFirst({
        where: {
          sku: validateData.sku,
          id: { not: id },
        },
      });
      if (existingProduct) {
        return {
          success: false,
          error: "SKU must be unique",
        } as ActionResponse;
      }
    }

    const updateProduct = await prisma.product.update({
      where: { id },
      data: validateData,
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    revalidateProductPath();
    return { success: true, data: updateProduct } as ActionResponse;
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors as unknown,
      } as ActionResponse;
    }
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct() {}

export async function revalidateProductPath() {
  revalidatePath("/products");
}
