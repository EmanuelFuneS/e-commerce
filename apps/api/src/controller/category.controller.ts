import type { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services";

export default {
  getcategories: (req: FastifyRequest, reply: FastifyReply) => {
    const service = new CategoryService();
    const categpries = service.getCategories();
    return reply.send({ success: true, data: categpries });
  },
  createCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
};
