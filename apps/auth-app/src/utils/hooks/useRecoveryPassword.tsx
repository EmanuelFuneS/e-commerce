import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RecoveryPasswordSchema } from "../schemas/form.schema";
import services from "../services";

const useRecoveryPassword = () => {
  return useMutation({
    mutationFn: (data: RecoveryPasswordSchema) =>
      services.recoveryPasswordPost(data),
    mutationKey: ["RecoveryPassword"],
    onSuccess: (data) => {
      toast.success("Recovery Link Sent", {
        description: data.message,
        classNames: {
          description: "!text-gray-700 !text-sm !font-medium",
        },
      });
    },
    onError: (error: Error) => {
      toast.error("Recovery Password Failed", {
        description: error.message,
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useRecoveryPassword;
