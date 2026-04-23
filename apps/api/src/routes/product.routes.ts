import type { FastifyInstance } from "fastify";
import controllers from "../controller/product.controller";
import { productSchema } from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const productRoutes = async (app: FastifyInstance) => {
  app.get("/", controllers.getProducts);
  app.get(
    "/id",
    {
      schema: productSchema,
    },
    controllers.getProduct,
  );
  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);
  });
};
