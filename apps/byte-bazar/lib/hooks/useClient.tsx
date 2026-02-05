import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../../src/actions/user.actions";

interface UseClientProps {
  id: string;
}

const useClient = ({ id }: UseClientProps) => {
  return useQuery({
    queryKey: ["client", `${id}`],
    queryFn: () => getClientById(id),
    staleTime: 5 * 60 * 1000,
  });
};

export default useClient;
