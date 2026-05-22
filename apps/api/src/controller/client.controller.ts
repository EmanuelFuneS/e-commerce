import type { FastifyRequest, FastifyReply } from "fastify";
import { ClientService } from "../services";

export default {
  getClients: async (req: FastifyRequest, reply: FastifyReply) => {
    const service = new ClientService();
    const clients = service.getClients();
    return reply.send({ success: true, data: clients });
  },
  getClientById: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const service = new ClientService();
    const client = service.getClientById(req.params.id);
    return reply.send({ success: true, data: client });
  },
};
