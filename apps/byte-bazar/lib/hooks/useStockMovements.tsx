import { useQuery } from "@tanstack/react-query";
import { getStockMovements } from "../../src/actions/product.actions";

const useStockMovements = () => {
  return useQuery({
    queryKey: ["stock-movements"],
    queryFn: () => getStockMovements(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useStockMovements;
