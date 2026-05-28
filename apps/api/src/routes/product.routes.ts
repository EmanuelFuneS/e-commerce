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

    protectedApp.post("/", controllers.createProduct);
    protectedApp.put("/", controllers.updateProduct);
    protectedApp.delete("/:id", controllers.deleteProduct);

    protectedApp.get("/stock-movements", controllers.getStockMovements);
    protectedApp.post("/:id/increment-stock", controllers.incrementStock);
    protectedApp.post("/:id/increment-views", controllers.incrementViews);
    protectedApp.post("/:id/apply-discount", controllers.applyDiscount);
    protectedApp.post("/:id/disable-discount", controllers.disableDiscount);
  });
};
