import type { FastifyRequest, FastifyReply } from "fastify";
import { OrderService } from "../services";

export default {
  getOrders: async (req: FastifyRequest, reply: FastifyReply) => {
    const service = new OrderService();
    const orders = await service.getOrders();
    return reply.send({ success: true, data: orders });
  },

  getByClient: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new OrderService();
    const orders = await service.getByClient(req.params.id);
    return reply.send({ success: true, data: orders });
  },

  createOrder: async (
    req: FastifyRequest<{ Body: any }>,
    reply: FastifyReply,
  ) => {
    const service = new OrderService();
    const order = await service.createOrder(req.body, req.user.id);
    return reply.status(201).send({ success: true, data: order });
  },

  cancelOrder: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new OrderService();
    const order = await service.cancelOrder(req.params.id);
    return reply.send({ success: true, data: order });
  },
};
