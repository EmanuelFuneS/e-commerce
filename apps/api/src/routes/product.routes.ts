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

  // increment view param 
  //apply discount

  app.register(async (protectedApp) => {
    protectedApp.addHook("preHandler", authHook);

    protectedApp.post("/", controllers.createProduct);
    protectedApp.put("/", controllers.updateProduct);
    protectedApp.delete("/:id", controllers.deleteProduct);

    //get stockmovements
    //incrementstock post /:id

    //disablediscount
  });
};
