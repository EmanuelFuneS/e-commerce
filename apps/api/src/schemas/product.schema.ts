export const productParamsSchema = {};

export const productSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
      },
    },
  },
};

export const productCreateBodySchema = {};
export const productUpdateBodySchema = {};
