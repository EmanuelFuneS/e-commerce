import { FastifyInstance } from "fastify";
import controllers from "../controller/category.controller";
import { authHook } from "../hooks/auth.hook";

export const categoryRoutes = async (app: FastifyInstance) => {
  app.get("/", controllers.getcategories);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", controllers.createCategory);
    protectedApp.put("/:id", controllers.updateCategory);
    protectedApp.delete("/:id", controllers.deleteCategory);
  });
};
