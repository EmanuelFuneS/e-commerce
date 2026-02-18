import { useQuery } from "@tanstack/react-query";
import { getBrandById } from "../../src/actions/brand.actions";

interface useBrandProps {
  id: string;
}

const useBrand = ({ id }: useBrandProps) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => {
      return getBrandById(id);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useBrand;
