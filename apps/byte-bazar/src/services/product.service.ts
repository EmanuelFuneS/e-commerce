import { Prisma } from "@workspace/database";

import { ProductsSchema } from "../../lib/schemas/products/products.schema";
import {
  OptionalParams,
  ProductFilters,
  ProductResponse,
} from "../../lib/types";
import {
  ProductRepository,
  ProductWithRelationsSerialized,
} from "../repositories/product.repository";

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  private calculateFinalPrice(product: ProductWithRelationsSerialized) {
    const price = Number(product.price);
    const discount = product.discounts[0];
    if (!discount?.isActive) {
      return price;
    }

    const percentOff = Number(discount.discountValue);

    if (percentOff < 0 || percentOff > 100) {
      console.error(
        `Invalid discount value: ${percentOff}%, productId: ${product.id}`
      );
      return price;
    }

    if (percentOff === 0) return price;
    if (percentOff === 100) return 0;

    return price * (1 - percentOff / 100);
  }

  async getProduct(id: Prisma.ProductWhereUniqueInput, incrementView = false) {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    if (incrementView) {
      await this.repository.incrementViews(id);
    }

    return {
      ...product,
      finalPrice: this.calculateFinalPrice(product),
    };
  }

  /**
   * Returns a list of products based on the provided filters and pagination.
   *
   * @param {OptionalParams<Prisma.ProductWhereInput>} filter - Optional filters to apply to the query.
   * @param {OptionalParams<Prisma.ProductFindManyArgs>} pagination - Optional pagination parameters to apply to the query.
   * @returns {Promise<ProductWithRelations[]>} A promise that resolves to an array of products.
   */
  async getProducts(
    filters?: ProductFilters,
    pagination?: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<ProductResponse> {
    //MANEJAR TENANT_ID
    // Construir el orderBy dinámicamente
    let orderBy: Record<string, string> = { name: "asc" }; // Default
    // Construir el where clause dinámicamente
    const whereClause: Record<string, unknown> = { isActive: true };
    if (filters) {
      // Filtro por categoría
      if (filters.category) {
        whereClause.categoryId = filters.category;
      }

      // Filtro por marca
      if (filters.brand) {
        whereClause.brandId = filters.brand;
      }

      // Filtro por precio
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        whereClause.price = {};
        const priceFilter = whereClause.price as Record<string, number>;
        if (filters.minPrice !== undefined) {
          priceFilter.gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          priceFilter.lte = filters.maxPrice;
        }
      }

      if (filters.sort) {
        switch (filters.sort) {
          case "price-asc":
            orderBy = { price: "asc" };
            break;
          case "price-desc":
            orderBy = { price: "desc" };
            break;
          case "name-asc":
            orderBy = { name: "asc" };
            break;
          case "name-desc":
            orderBy = { name: "desc" };
            break;
          case "relevance":
            orderBy = { createdAt: "asc" };
            break;
        }
      }
    }
    const { page, pageSize } = pagination ?? {};
    let paginationObj = {};

    if (page && pageSize) {
      const hasPagination =
        Number.isInteger(page) &&
        Number.isInteger(pageSize) &&
        page! > 0 &&
        pageSize! > 0;
      if (hasPagination) {
        paginationObj = {
          skip: page! * pageSize!,
          take: pageSize!,
        };
      }
    }
    console.log("where", whereClause, orderBy, paginationObj);
    const products = await this.repository.findMany(
      whereClause,
      paginationObj,
      orderBy
    );
    return {
      success: true,
      products: products.map((product: ProductWithRelationsSerialized) => ({
        ...product,
        finalPrice: this.calculateFinalPrice(product),
      })),
      pagination: {
        page: page || 1,
        pageSize: pageSize || 10,
        totalPages: Math.ceil(products.length / (pageSize || 10)),
        totalItems: products.length,
      },
    };
  }

  async createProduct(data: ProductsSchema, tenantId: string) {
    if (data.price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    return await this.repository.create(data);
  }

  async updateProduct(data: ProductsSchema) {
    const id = data.id;
    if (!id) throw new Error("ID is required");
    const product = await this.repository.findById({ id });

    if (product) {
      return await this.repository.update({ id: product.id }, data);
    }
    throw new Error("Product not found");
  }

  async deleteProduct(id: string) {
    return await this.repository.delete({ id });
  }
}
