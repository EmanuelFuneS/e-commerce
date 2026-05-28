export const analyticsCountsSchema = {
  schema: {
    tags: ["Analytics"],
    summary: "Get entity counts (products, categories, brands, users, orders)",
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "object",
            properties: {
              products: {},
              categories: {},
              brands: {},
              users: {},
              orders: {},
            },
          },
        },
      },
    },
  },
};
