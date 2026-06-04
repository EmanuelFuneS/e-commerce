const productProperties = {
  id: { type: "string", description: "Product unique identifier" },
  name: { type: "string" },
  description: { type: "string" },
  price: { type: "string" },
  stock: { type: "integer" },
  sku: { type: "string" },
  slug: { type: "string" },
  images: { type: "array", items: { type: "string" } },
  tags: { type: "array", items: { type: "string" } },
  isActive: { type: "boolean" },
  views: { type: "integer" },
  categoryId: { type: "string" },
  brandId: { type: "string" },
  finalPrice: { type: "number" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const successResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: { type: "object", properties: productProperties },
  },
};

const successArrayResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    products: {
      type: "array",
      items: { type: "object", properties: productProperties },
    },
    pagination: {
      type: "object",
      properties: {
        page: { type: "integer" },
        pageSize: { type: "integer" },
        totalPages: { type: "integer" },
        totalItems: { type: "integer" },
      },
    },
  },
};

export const productParamsSchema = {
  schema: {
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    tags: ["Products"],
    summary: "Get product by ID",
    response: {
      200: successResponse,
      404: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          error: { type: "string" },
        },
      },
    },
  },
};

export const productListSchema = {
  schema: {
    tags: ["Products"],
    summary: "List all products",
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
        category: { type: "string" },
        brand: { type: "string" },
        minPrice: { type: "number" },
        maxPrice: { type: "number" },
        sort: { type: "string", enum: ["price-asc", "price-desc", "name-asc", "name-desc", "relevance"] },
        page: { type: "integer" },
        pageSize: { type: "integer" },
      },
    },
    response: { 200: successArrayResponse },
  },
};

export const productCreateBodySchema = {
  schema: {
    tags: ["Products"],
    summary: "Create a new product",
    body: {
      type: "object",
      required: ["name", "description", "price", "sku", "categoryId", "brandId"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "string" },
        stock: { type: "integer" },
        sku: { type: "string" },
        images: { type: "array", items: { type: "string" } },
        tags: { type: "array", items: { type: "string" } },
        categoryId: { type: "string" },
        brandId: { type: "string" },
        isActive: { type: "boolean" },
      },
    },
    response: { 201: successResponse },
  },
};

export const productUpdateBodySchema = {
  schema: {
    tags: ["Products"],
    summary: "Update a product",
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "string" },
        stock: { type: "integer" },
        images: { type: "array", items: { type: "string" } },
        tags: { type: "array", items: { type: "string" } },
        categoryId: { type: "string" },
        brandId: { type: "string" },
        isActive: { type: "boolean" },
      },
    },
    response: { 200: successResponse },
  },
};

export const productDeleteSchema = {
  schema: {
    tags: ["Products"],
    summary: "Delete a product",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
};

export const stockMovementsSchema = {
  schema: {
    tags: ["Products"],
    summary: "Get stock movements",
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                productId: { type: "string" },
                type: { type: "string", enum: ["IN", "OUT", "ADJUST"] },
                quantity: { type: "integer" },
                reason: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
  },
};

export const incrementViewsSchema = {
  schema: {
    tags: ["Products"],
    summary: "Increment product views",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
};

export const incrementStockSchema = {
  schema: {
    tags: ["Products"],
    summary: "Increment product stock",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    body: {
      type: "object",
      required: ["quantity"],
      properties: { quantity: { type: "integer", minimum: 1 } },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
};

export const applyDiscountSchema = {
  schema: {
    tags: ["Products"],
    summary: "Apply discount to a product",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    body: {
      type: "object",
      required: ["discountType"],
      properties: {
        discountType: { type: "string", enum: ["PERCENTAGE", "FIXED_AMOUNT"] },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: { type: "object" },
        },
      },
    },
  },
};

export const disableDiscountSchema = {
  schema: {
    tags: ["Products"],
    summary: "Disable product discount",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
};
