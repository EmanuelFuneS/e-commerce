import type { FastifyInstance } from "fastify";
import controllers from "../controller/orders.controller";
import {
  orderListSchema,
  orderByClientSchema,
  orderCreateBodySchema,
  orderCancelSchema,
} from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const ordersRoutes = async (app: FastifyInstance) => {
  app.get("/", orderListSchema, controllers.getOrders);
  app.get("/client/:id", orderByClientSchema, controllers.getByClient);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", orderCreateBodySchema, controllers.createOrder);
    protectedApp.patch("/:id/cancel", orderCancelSchema, controllers.cancelOrder);
  });
};
