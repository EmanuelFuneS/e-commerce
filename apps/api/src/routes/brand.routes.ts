import type { FastifyInstance } from "fastify";
import controllers from "../controller/brand.controller";
import {
  brandListSchema,
  brandParamsSchema,
  brandCreateBodySchema,
  brandUpdateSchema,
  brandDeleteSchema,
} from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const brandRoutes = async (app: FastifyInstance) => {
  app.get("/", brandListSchema, controllers.getBrands);
  app.get("/:id", brandParamsSchema, controllers.getBrand);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", brandCreateBodySchema, controllers.createBrand);
    protectedApp.put("/:id", brandUpdateSchema, controllers.updateBrand);
    protectedApp.delete("/:id", brandDeleteSchema, controllers.deleteBrand);
  });
};
