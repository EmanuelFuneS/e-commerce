import { useQuery } from "@tanstack/react-query";
import { getProducts, ProductFilters } from "../actions";

interface Props {
  page: number | undefined;
  sizePage: number | undefined;
  filter?: ProductFilters;
}

const useProducts = ({ page, sizePage, filter }: Props) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(undefined, undefined, filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useProducts;
