import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      console.log("User Logout successfully");
      toast.success("User Logout successfully", {
        description: "User Logout successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
    },
    onError: (error) => {
      console.log("Failed Logout", error);
      toast.error("Failed Logout", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useLogout;
