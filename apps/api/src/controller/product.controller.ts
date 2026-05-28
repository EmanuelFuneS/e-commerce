import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "../services";
import { Product, DiscountType } from "@workspace/repository";

function serviceInitializer() {
  return new ProductService();
}

export default {
  getProducts: async (_req: FastifyRequest, reply: FastifyReply) => {
    const service = serviceInitializer();

    const products = await service.getProducts();
    return reply.send(products);
  },
  getProduct: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    const product = await service.getProduct({ id: req.params.id });
    if (!product) {
      return reply
        .status(404)
        .send({ success: false, error: "Product not found" });
    }
    return reply.send({ success: true, data: product });
  },
  createProduct: async (
    req: FastifyRequest<{ Body: Product }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    const product = await service.createProduct(req.body, {
      adminId: req.user.id,
      role: req.user.role,
    });
    return reply.status(201).send({ success: true, data: product });
  },
  updateProduct: async (
    req: FastifyRequest<{ Body: Product }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    const update = await service.updateProduct(req.body, {
      adminId: req.user.id,
      role: req.user.role,
    });
    return reply.send({ success: true, data: update });
  },
  deleteProduct: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    await service.deleteProduct(req.params.id, {
      adminId: req.user.id,
      role: req.user.role,
    });
    return reply.send({ success: true, message: "Product deleted" });
  },

  getStockMovements: async (
    req: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    const movements = await service.getStockMovements({
      adminId: req.user.id,
      role: req.user.role,
    });
    return reply.send({ success: true, data: movements });
  },

  incrementViews: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    await service.incrementViews({ id: req.params.id });
    return reply.send({ success: true, message: "Views incremented" });
  },

  incrementStock: async (
    req: FastifyRequest<{ Params: { id: string }; Body: { quantity: number } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    await service.incrementStock(
      { id: req.params.id },
      req.body.quantity,
      req.user.id,
    );
    return reply.send({ success: true, message: "Stock incremented" });
  },

  applyDiscount: async (
    req: FastifyRequest<{ Params: { id: string }; Body: { discountType: DiscountType } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    const discount = await service.applyDiscount(req.params.id, req.body.discountType);
    return reply.status(201).send({ success: true, data: discount });
  },

  disableDiscount: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = serviceInitializer();
    await service.disableDiscount(req.params.id);
    return reply.send({ success: true, message: "Discount disabled" });
  },
};
