import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "../services";
import { Product } from "@workspace/repository";
import { error } from "node:console";

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
  deleteProduct: async (req: FastifyRequest<{ Params: { id: string } }>) => {
    const service = serviceInitializer();
    await service.deleteProduct(req.params.id, {
      adminId: req.user.id,
      role: req.user.role,
    });
  },

  getStockMovements: async () => {},
  incrementViews: async () => {},
  incrementStock: async () => {},

  applyDiscount: async () => {},
  disableDiscount: async () => {},
};
