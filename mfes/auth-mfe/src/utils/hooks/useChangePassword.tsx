import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangePasswordSchema } from "../schemas/register.schema";
import services from "../services";

const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordSchema) =>
      services.changePasswordPost(data),
    mutationKey: ["changePassword"],
    onSuccess: (data) => {
      toast.success("Change Password Success", {
        description: data.message,
        classNames: {
          description: "!text-blue-100 !text-sm !font-medium",
        },
      });
    },
    onError: (error: Error) => {
      toast.error("Change Password Failed", {
        description: error.message,
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useChangePassword;
