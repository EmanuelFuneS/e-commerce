import type { FastifyRequest, FastifyReply } from "fastify";
import { AnalyticsService } from "../services";

export default {
  getCounts: async (req: FastifyRequest, reply: FastifyReply) => {
    const service = new AnalyticsService();
    const [products, categories, brands, users, orders] = await Promise.all([
      service.getCountProducts(),
      service.getCountCategories(),
      service.getCountBrands(),
      service.getCountUsers(),
      service.getCountOrders(),
    ]);
    return reply.send({
      success: true,
      data: { products, categories, brands, users, orders },
    });
  },
};
