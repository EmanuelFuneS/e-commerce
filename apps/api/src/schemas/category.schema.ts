const categoryProperties = {
  id: { type: "string" },
  name: { type: "string" },
  imageUrl: { type: "string" },
  tenantId: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const categorySuccessResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: { type: "object", properties: categoryProperties },
  },
};

const categoryArrayResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "object", properties: categoryProperties },
    },
  },
};

export const categoryParamsSchema = {
  schema: {
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    tags: ["Categories"],
  },
};

export const categoryListSchema = {
  schema: {
    tags: ["Categories"],
    summary: "List all categories",
    response: { 200: categoryArrayResponse },
  },
};

export const categoryCreateBodySchema = {
  schema: {
    tags: ["Categories"],
    summary: "Create a new category",
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        imageUrl: { type: "string" },
        logo: { type: "string" },
      },
    },
    response: { 201: categorySuccessResponse },
  },
};

export const categoryUpdateSchema = {
  schema: {
    tags: ["Categories"],
    summary: "Update a category",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        imageUrl: { type: "string" },
      },
    },
    response: { 200: categorySuccessResponse },
  },
};

export const categoryDeleteSchema = {
  schema: {
    tags: ["Categories"],
    summary: "Delete a category",
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
