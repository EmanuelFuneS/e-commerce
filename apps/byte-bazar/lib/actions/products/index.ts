"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import prisma, { safeDbOperation } from "../../prisma";
import {
  ProductsSchema,
  productsSchema,
} from "../../schemas/products/products.schema";
import { createSkeletons, productTemplate } from "../../skeleton-templates";
import { ActionResponse } from "../../types/common";
import { serializeDecimals } from "../../utils";

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
  pageSize: number = 10,
  filter: {} = {}
) {
  return safeDbOperation<ActionResponse>(
    async () => {
      const [totalProducts, products] = await prisma.$transaction([
        prisma.product.count(),
        prisma.product.findMany({
          where: { isActive: true, ...filter },
          orderBy: { name: "asc" },
          include: {
            category: {
              select: {
                name: true,
              },
            },
            brand: {
              select: {
                name: true,
              },
            },
            _count: {
              select: { stockMovements: true },
            },
          },
          skip: page * pageSize,
          take: pageSize,
        }),
      ]);

      const serializedData = serializeDecimals(products);

      return {
        success: true,
        data: serializedData,
        pagination: {
          page,
          pageSize,
          totalPages: Math.ceil(totalProducts / pageSize),
          totalItems: products.length,
        },
      } as ActionResponse;
    },
    {
      success: false,
      data: createSkeletons(productTemplate, 8),
      pagination: {
        page,
        pageSize,
        totalPages: 0,
        totalItems: 0,
      },
    }
  );
}

export async function SearchByProductName(name: string) {
  return safeDbOperation<ActionResponse>(
    async () => {
      const product = await prisma.product.findMany({
        where: {
          isActive: true,
          name: { contains: name, mode: "insensitive" },
        },
        orderBy: { name: "asc" },
        take: 1,
      });

      const serializedData = serializeDecimals(product);

      if (product.length === 0) {
        return { success: false, error: "Product not found" } as ActionResponse;
      }

      return { success: true, data: serializedData[0] } as ActionResponse;
    },
    { success: false, data: [] }
  );
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

export async function getProductPreview(params?: {
  search?: string;
  discount?: boolean;
  promotion?: boolean;
  sale?: boolean;
}) {
  return safeDbOperation<ActionResponse>(
    async () => {
      const where: any = { isActive: true };

      if (params?.search) {
        where.name = { contains: params.search, mode: "insensitive" };
      }
      if (params?.discount) {
        where.discount = { gt: 0 };
      }
      if (params?.promotion) {
        where.promotion = true;
      }
      if (params?.sale) {
        where.sale = true;
      }

      const products = await prisma.product.findMany({
        where: {
          AND: [
            {
              images: {
                isEmpty: false,
              },
            },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          brand: { select: { name: true } },
          category: { select: { name: true } },
        },
      });
      const serializedData = serializeDecimals(products);

      return { success: true, data: serializedData } as ActionResponse;
    },
    { success: true, data: createSkeletons(productTemplate, 6) }
  );
}

export async function getRelatedProducts(categoryId: string) {
  return safeDbOperation<ActionResponse>(
    async () => {
      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          categoryId: categoryId,
        },
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          brand: { select: { name: true } },
          category: { select: { name: true } },
        },
      });

      const serializedData = serializeDecimals(products);

      return { success: true, data: serializedData } as ActionResponse;
    },
    { success: true, data: createSkeletons(productTemplate, 6) }
  );
}

//not use this actions, extend getProducts
/* export async function getProductByBrands(
  brandIds: string[]
): Promise<ActionResponse> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        brandId: { in: brandIds },
      },
      orderBy: { name: "asc" },
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    return { success: true, data: products } as ActionResponse;
  } catch (error) {
    console.error("Error fetching products by brands:", error);
    return {
      success: false,
      error: "Failed to fetch products by brands",
    } as ActionResponse;
  }
}

export async function getProductByCategory(
  categoryIds: string[]
): Promise<ActionResponse> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: { in: categoryIds },
      },
      orderBy: { name: "asc" },
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    return { success: true, data: products } as ActionResponse;
  } catch (error) {
    console.error("Error fetching products by categories:", error);
    return {
      success: false,
      error: "Failed to fetch products by categories",
    } as ActionResponse;
  }
} */

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

export async function deleteSoftProduct(id: string): Promise<ActionResponse> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    revalidateProductPath();
    return { success: true, data: product } as ActionResponse;
  } catch (error) {
    console.error("Error soft deleting product:", error);
    return {
      success: false,
      error: "Failed to soft delete product",
    } as ActionResponse;
  }
}

export async function deleteProduct(id: string): Promise<ActionResponse> {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidateProductPath();
    return { success: true } as ActionResponse;
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: "Failed to delete product",
    } as ActionResponse;
  }
}

export async function revalidateProductPath() {
  revalidatePath("/products");
}
