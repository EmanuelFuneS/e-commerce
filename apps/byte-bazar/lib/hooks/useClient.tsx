import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../../src/actions/user.actions";

interface UseClientProps {
  userId: string;
}

const useClient = ({ userId }: UseClientProps) => {
  return useQuery({
    queryKey: ["client", `${userId}`],
    queryFn: () => getClientById(userId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useClient;
