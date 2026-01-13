import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../src/actions/product.actions";

interface useProductProps {
  id: string;
}

const useProduct = ({ id }: useProductProps) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
    staleTime: 5 * 60 * 1000,
  });
};

export default useProduct;
