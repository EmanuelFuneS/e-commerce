import type { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services";
import { Category } from "@workspace/repository";

export default {
  getcategories: async (req: FastifyRequest, reply: FastifyReply) => {
    const service = new CategoryService();
    const categories = await service.getCategories();
    return reply.send({ success: true, data: categories });
  },
  createCategory: async (
    req: FastifyRequest<{ Body: Category }>,
    reply: FastifyReply,
  ) => {
    const service = new CategoryService();
    const category = await service.createCategory(req.body);
    return reply.status(201).send({ success: true, data: category });
  },
  updateCategory: async (
    req: FastifyRequest<{ Params: { id: string }; Body: Partial<Category> }>,
    reply: FastifyReply,
  ) => {
    const service = new CategoryService();
    const category = await service.updateCategory(req.params.id, req.body);
    return reply.send({ success: true, data: category });
  },
  deleteCategory: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new CategoryService();
    await service.deleteCategory(req.params.id);
    return reply.send({ success: true, message: "Category deleted" });
  },
};
