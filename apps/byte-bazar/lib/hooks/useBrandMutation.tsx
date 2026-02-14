import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBrand } from "../../src/actions/brand.actions";

interface useBrandMutationProps {
  setId: (id: string | null) => void;
  setOpen: (open: boolean) => void;
}

const useBrandMutation = ({ setId, setOpen }: useBrandMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["brand-mutation"],
    mutationFn: (data: any) => createBrand(data),
    onSuccess: () => {
      console.log("Brand created successfully");
      toast.success("Brand created successfully", {
        description: "Brand created successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
      setOpen(false);
      setId(null);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error) => {
      console.log("Failed to create Brand", error);
      toast.error("Failed to create Brand", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useBrandMutation;
