const brandProperties = {
  id: { type: "string" },
  name: { type: "string" },
  logo: { type: "string" },
  website: { type: "string" },
  tenantId: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const brandSuccessResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: { type: "object", properties: brandProperties },
  },
};

const brandArrayResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "object", properties: brandProperties },
    },
  },
};

export const brandParamsSchema = {
  schema: {
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    tags: ["Brands"],
    summary: "Get brand by ID",
    response: {
      200: brandSuccessResponse,
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

export const brandListSchema = {
  schema: {
    tags: ["Brands"],
    summary: "List all brands",
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
        page: { type: "integer" },
        pageSize: { type: "integer" },
      },
    },
    response: { 200: brandArrayResponse },
  },
};

export const brandCreateBodySchema = {
  schema: {
    tags: ["Brands"],
    summary: "Create a new brand",
    body: {
      type: "object",
      required: ["name", "logo", "website"],
      properties: {
        name: { type: "string", minLength: 1 },
        logo: { type: "string" },
        website: { type: "string" },
      },
    },
    response: { 201: brandSuccessResponse },
  },
};

export const brandUpdateSchema = {
  schema: {
    tags: ["Brands"],
    summary: "Update a brand",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        logo: { type: "string" },
        website: { type: "string" },
      },
    },
    response: { 200: brandSuccessResponse },
  },
};

export const brandDeleteSchema = {
  schema: {
    tags: ["Brands"],
    summary: "Delete a brand",
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
