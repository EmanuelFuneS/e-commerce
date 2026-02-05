import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "../../src/actions/product.actions";

interface UseProductMutationProps {
  product: any;
}

const useProductMutation = ({ product }: UseProductMutationProps) => {
  return useMutation({
    mutationKey: ["new", "product"],
    mutationFn: () => createProduct(product),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });
};

export default useProductMutation;
