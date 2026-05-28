const orderItemProperties = {
  id: { type: "string" },
  productId: { type: "string" },
  quantity: { type: "integer" },
  unitPrice: { type: "number" },
};

const orderProperties = {
  id: { type: "string" },
  orderNumber: { type: "string" },
  userId: { type: "string" },
  customerName: { type: "string" },
  customerEmail: { type: "string" },
  customerPhone: { type: "string" },
  subtotal: { type: "number" },
  shippingCost: { type: "number" },
  taxAmount: { type: "number" },
  discountAmount: { type: "number" },
  totalAmount: { type: "number" },
  status: { type: "string", enum: ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"] },
  paymentMethod: { type: "string" },
  items: {
    type: "array",
    items: { type: "object", properties: orderItemProperties },
  },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const orderArrayResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "object", properties: orderProperties },
    },
  },
};

const orderSingleResponse = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: { type: "object", properties: orderProperties },
  },
};

export const orderListSchema = {
  schema: {
    tags: ["Orders"],
    summary: "List all orders",
    response: { 200: orderArrayResponse },
  },
};

export const orderByClientSchema = {
  schema: {
    tags: ["Orders"],
    summary: "Get orders by client ID",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    response: { 200: orderArrayResponse },
  },
};

export const orderCreateBodySchema = {
  schema: {
    tags: ["Orders"],
    summary: "Create a new order",
    body: {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            required: ["productId", "quantity"],
            properties: {
              productId: { type: "string" },
              quantity: { type: "integer", minimum: 1 },
              unitPrice: { type: "number" },
            },
          },
        },
        customerName: { type: "string" },
        customerEmail: { type: "string" },
        customerPhone: { type: "string" },
        shippingAddress: { type: "object" },
      },
    },
    response: { 201: orderSingleResponse },
  },
};

export const orderCancelSchema = {
  schema: {
    tags: ["Orders"],
    summary: "Cancel an order",
    params: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    response: { 200: orderSingleResponse },
  },
};
