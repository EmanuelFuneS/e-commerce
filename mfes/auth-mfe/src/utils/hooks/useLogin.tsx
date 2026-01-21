import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginSchema } from "../schemas/register.schema";
import services from "../services";

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginSchema) => services.loginPost(data),
    mutationKey: ["login"],
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
      toast.success("Login Success", {
        description: data.message,
        classNames: {
          description: "!text-blue-100 !text-sm !font-medium",
        },
      });
    },
    onError: (error: Error) => {
      toast.error("Login Failed", {
        description: error.message,
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useLogin;
