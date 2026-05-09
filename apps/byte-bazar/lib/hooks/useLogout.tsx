"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogout = () => {
  const router = useRouter();

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
      toast.success("User Logout successfully", {
        description: "User Logout successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
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
