import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ResetPasswordSchema } from "../schemas/form.schema";
import services from "../services";

const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ResetPasswordSchema) => services.resetPasswordPost(data),
    mutationKey: ["resetPassword"],
    onSuccess: (data) => {
      toast.success("Reset Password Success", {
        description: data.message,
        classNames: {
          description: "!text-blue-100 !text-sm !font-medium",
        },
      });
    },
    onError: (error: Error) => {
      toast.error("Reset Password Failed", {
        description: error.message,
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useResetPassword;
