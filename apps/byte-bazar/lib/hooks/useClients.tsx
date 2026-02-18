import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../src/actions/user.actions";

const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useClients;
