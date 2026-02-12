"use server";

import { DiscountType, Prisma, safeDbOperation } from "@workspace/database";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ProductsSchema } from "../../lib/schemas/products/products.schema";
import { ProductFilters } from "../../lib/types";
import { ProductService } from "../services/product.service";

const productService = async () => {
  const cookiesStore = await cookies();
  const adminId = cookiesStore.get("userId")?.value;
  const role = cookiesStore.get("roles")?.value;

  return new ProductService(adminId!, role!);
};

export const getProducts = async (
  filters: ProductFilters = {},
  pagination?:
    | {
        page?: number;
        pageSize?: number;
      }
    | undefined,
) => {
  return safeDbOperation(async () => {
    console.log("parameter", filters, pagination);
    try {
      const service = await productService();
      return await service.getProducts(filters, pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Products not found");
    }
  }, [] as any);
};

export const getProduct = async (
  id: Prisma.ProductWhereUniqueInput,
  incrementView = false,
) => {
  return safeDbOperation(async () => {
    try {
      const service = await productService();
      return await service.getProduct(id, incrementView);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Product not found");
    }
  }, [] as any);
};

export const createProduct = async (data: any) => {
  const service = await productService();
  return await service.createProduct(data);
};

export const updateProduct = async (data: ProductsSchema) => {
  const service = await productService();
  return await service.updateProduct(data);
};

export const deleteProduct = async (id: string) => {
  try {
    const service = await productService();
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

export const incrementViews = async (id: string) => {
  try {
    const service = await productService();
    return service.incrementViews({ id });
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
};

export const applyDiscount = async (
  productId: string,
  discountType: DiscountType,
) => {
  try {
    const service = await productService();
    return service.applyDiscount(productId, discountType);
  } catch (error) {
    console.error("Error applying discount:", error);
  }
};

/* export const disableDiscount = () => {}; */

export async function revalidateProductPath() {
  revalidatePath("/products");
}
