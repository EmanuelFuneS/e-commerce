import { FastifyInstance } from "fastify";
import controllers from "../controller/category.controller";
import {
  categoryListSchema,
  categoryCreateBodySchema,
  categoryUpdateSchema,
  categoryDeleteSchema,
} from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const categoryRoutes = async (app: FastifyInstance) => {
  app.get("/", categoryListSchema, controllers.getcategories);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", categoryCreateBodySchema, controllers.createCategory);
    protectedApp.put("/:id", categoryUpdateSchema, controllers.updateCategory);
    protectedApp.delete("/:id", categoryDeleteSchema, controllers.deleteCategory);
  });
};
