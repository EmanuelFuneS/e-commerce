import type { FastifyInstance } from "fastify";
import controllers from "../controller/product.controller";
import {
  productListSchema,
  productParamsSchema,
  productCreateBodySchema,
  productUpdateBodySchema,
  productDeleteSchema,
  stockMovementsSchema,
  incrementViewsSchema,
  incrementStockSchema,
  applyDiscountSchema,
  disableDiscountSchema,
} from "../schemas";
import { authHook } from "../hooks/auth.hook";

export const productRoutes = async (app: FastifyInstance) => {
  app.get("/", productListSchema, controllers.getProducts);
  app.get("/:id", productParamsSchema, controllers.getProduct);

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", productCreateBodySchema, controllers.createProduct);
    protectedApp.put("/", productUpdateBodySchema, controllers.updateProduct);
    protectedApp.delete("/:id", productDeleteSchema, controllers.deleteProduct);

    protectedApp.get("/stock-movements", stockMovementsSchema, controllers.getStockMovements);
    protectedApp.post("/:id/increment-stock", incrementStockSchema, controllers.incrementStock);
    protectedApp.post("/:id/increment-views", incrementViewsSchema, controllers.incrementViews);
    protectedApp.post("/:id/apply-discount", applyDiscountSchema, controllers.applyDiscount);
    protectedApp.post("/:id/disable-discount", disableDiscountSchema, controllers.disableDiscount);
  });
};
