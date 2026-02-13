import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProduct } from "../../src/actions/product.actions";
import { ProductsSchema } from "../schemas/products/products.schema";

const useProductUpdate = () => {
  return useMutation({
    mutationKey: ["new", "product"],
    mutationFn: (data: ProductsSchema) => updateProduct(data),
    onSuccess: () => {
      toast.success("Product updated successfully", {
        description: "Product updated successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
    },
    onError: (error) => {
      toast.error("Failed to Update product", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useProductUpdate;
