import { FastifyInstance } from "fastify";
import controllers from "../controller/category.controller";
import { authHook } from "../hooks/auth.hook";

export const categoryRoutes = async (app: FastifyInstance) => {
  app.get("/", controllers.getcategories);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);
    //add protected routes create, update, delete
  });
};
