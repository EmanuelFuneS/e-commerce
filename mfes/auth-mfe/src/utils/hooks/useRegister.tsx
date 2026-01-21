import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegisterSchema } from "../schemas/register.schema";
import services from "../services";
const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterSchema) => services.registerPost(data),
    onSuccess: (data) => {
      toast("Success Register", {
        description: data.success,
        classNames: {
          description: "!text-blue-100 !text-sm !font-medium",
        },
      });
    },
    onError: (error: Error) => {
      toast("Error Register", {
        description: error.message,
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useRegister;
