"use server";

import { Prisma, safeDbOperation } from "@workspace/database";
import { revalidatePath } from "next/cache";
import { ProductsSchema } from "../../lib/schemas/products/products.schema";
import { ActionResponse, ProductFilters } from "../../lib/types";
import { ProductService } from "../services/product.service";

const productService = () => {
  return new ProductService();
};

export const getProducts = async (
  filters: ProductFilters = {},
  pagination?:
    | {
        page?: number;
        pageSize?: number;
      }
    | undefined
) => {
  return safeDbOperation(async () => {
    console.log("parameter", filters, pagination);
    try {
      const service = productService();
      return await service.getProducts(filters, pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Products not found");
    }
  }, [] as any);
};

export const getProduct = async (
  id: Prisma.ProductWhereUniqueInput,
  incrementView = false
) => {
  return safeDbOperation(async () => {
    try {
      const service = productService();
      return await service.getProduct(id, incrementView);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Product not found");
    }
  }, [] as any);
};

export const createProduct = async (data: any, tenantId: string) => {
  try {
    const service = productService();
    const result = await service.createProduct(data, tenantId);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      data: {},
    };
  }
};

export const updateProduct = async (
  data: ProductsSchema
): Promise<ActionResponse> => {
  //no safe db
  try {
    const service = productService();
    const result = await service.updateProduct(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      data: {},
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const service = productService();
    const result = service.deleteProduct(id);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
      data: {},
    };
  }
};

export async function revalidateProductPath() {
  revalidatePath("/products");
}
