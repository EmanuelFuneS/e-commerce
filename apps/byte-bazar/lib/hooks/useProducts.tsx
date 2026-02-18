import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/actions/product.actions";
import { ProductFilters } from "../types";

interface Props {
  page: number | undefined;
  sizePage: number | undefined;
  filter?: ProductFilters;
}

const useProducts = ({ filter }: Props) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(filter, undefined),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useProducts;
