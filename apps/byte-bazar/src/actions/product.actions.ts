"use server";

import { Prisma, safeDbOperation } from "@workspace/database";
import { revalidatePath } from "next/cache";
import { ProductsSchema } from "../../lib/schemas/products/products.schema";
import { createSkeletons, productTemplate } from "../../lib/skeleton-templates";
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
  return safeDbOperation<ActionResponse>(
    async () => {
      const service = productService();
      const result = await service.getProducts(filters, pagination);
      return {
        success: true,
        products: result,
        pagination: {
          page: pagination?.page || 1,
          pageSize: pagination?.pageSize || 10,
          totalPages: Math.ceil(result.length / (pagination?.pageSize || 1)),
          totalItems: result.length,
        },
      };
    },
    {
      success: false,
      data: { skeletons: createSkeletons(productTemplate, 8) },
    }
  );
};

export const getProduct = async (
  id: Prisma.ProductWhereUniqueInput,
  incrementView = false
) => {
  return safeDbOperation<ActionResponse>(
    async () => {
      const service = productService();
      const result = await service.getProduct(id, incrementView);
      return {
        success: true,
        data: result,
      };
    },
    {
      success: false,
      data: {},
    }
  );
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
