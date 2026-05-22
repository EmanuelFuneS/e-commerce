import type { FastifyInstance } from "fastify";
import controllers from "../controller/brand.controller";
import { brandParamsSchema, brandCreateBodySchema } from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const brandRoutes = async (app: FastifyInstance) => {
  app.get("/", controllers.getBrands);
  app.get("/:id", { schema: brandParamsSchema }, controllers.getBrand);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", { schema: brandCreateBodySchema }, controllers.createBrand);
    protectedApp.put("/:id", { schema: brandParamsSchema }, controllers.updateBrand);
    protectedApp.delete("/:id", { schema: brandParamsSchema }, controllers.deleteBrand);
  });
};
