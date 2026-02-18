import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../src/actions/brand.actions";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useBrands;
