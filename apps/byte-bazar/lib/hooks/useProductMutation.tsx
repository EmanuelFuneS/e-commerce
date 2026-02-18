import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "../../src/actions/product.actions";
import { ProductsSchema } from "../schemas/products/products.schema";

const useProductMutation = () => {
  return useMutation({
    mutationKey: ["new", "product"],
    mutationFn: (data: ProductsSchema) => createProduct(data),
    onSuccess: () => {
      console.log("Product created successfully");
      toast.success("Product created successfully", {
        description: "Product created successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
    },
    onError: (error) => {
      console.log("Failed to create product", error);
      toast.error("Failed to create product", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useProductMutation;
