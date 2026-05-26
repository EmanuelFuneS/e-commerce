import { FastifyInstance } from "fastify";
import controller from "../controller/client.controller";
import { clientParamsSchema } from "../schemas/client.schema";

export const clientRoutes = async (app: FastifyInstance) => {
  app.get("/", controller.getClients);
  app.get("/:id", { schema: clientParamsSchema }, controller.getClientById);
};
