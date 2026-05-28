import type { FastifyInstance } from "fastify";
import controllers from "../controller/orders.controller";
import { authHook } from "../hooks/auth.hook";

export const ordersRoutes = async (app: FastifyInstance) => {
  app.get("/", controllers.getOrders);
  app.get("/client/:id", controllers.getByClient);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", controllers.createOrder);
    protectedApp.patch("/:id/cancel", controllers.cancelOrder);
  });
};
