import type { FastifyInstance } from "fastify";
import controllers from "../controller/analytics.controller";
import { authHook } from "../hooks/auth.hook";

export const analyticsRoutes = async (app: FastifyInstance) => {
  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.get("/counts", controllers.getCounts);
  });
};
