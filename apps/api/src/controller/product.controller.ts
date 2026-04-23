import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "../services";

export default {
  getProduct: async (req: FastifyRequest<{ Params: { id: string } }>) => {},
  getProducts: async (_req: FastifyRequest, reply: FastifyReply) => {
    const service = new ProductService();

    const products = await service.getProducts();
    return reply.send(products);
  },
};
