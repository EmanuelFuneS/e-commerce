import type { FastifyRequest, FastifyReply } from "fastify";
import { BrandService } from "../services";
import { Brand } from "@workspace/repository";

export default {
  getBrands: async (req: FastifyRequest, reply: FastifyReply) => {
    const service = new BrandService();
    const query = req.query as Record<string, string>;
    const filters =
      query.name || query.tenantId
        ? { name: query.name, tenantId: query.tenantId }
        : undefined;
    const pagination =
      query.page && query.pageSize
        ? { page: Number(query.page), pageSize: Number(query.pageSize) }
        : undefined;

    const brands = await service.getBrands(filters, pagination);
    return reply.send({ success: true, data: brands });
  },

  getBrand: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new BrandService();
    const [brand] = await service.getBrandById(req.params.id);
    if (!brand) {
      return reply.status(404).send({ success: false, error: "Brand not found" });
    }
    return reply.send({ success: true, data: brand });
  },

  createBrand: async (
    req: FastifyRequest<{ Body: Brand }>,
    reply: FastifyReply,
  ) => {
    const service = new BrandService();
    const brand = await service.createBrand(req.body);
    return reply.status(201).send({ success: true, data: brand });
  },

  updateBrand: async (
    req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; logo?: string; website?: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new BrandService();
    const brand = await service.updateBrand({ id: req.params.id, ...req.body });
    return reply.send({ success: true, data: brand });
  },

  deleteBrand: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new BrandService();
    await service.deleteBrand(req.params.id);
    return reply.send({ success: true, message: "Brand deleted" });
  },
};
