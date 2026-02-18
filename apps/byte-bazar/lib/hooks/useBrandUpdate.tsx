import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBrand } from "../../src/actions/brand.actions";
import { BrandSchema } from "../schemas/brand/brand.schema";

interface useBrandUpdateProps {
  setId: (id: string | null) => void;
  setOpen: (open: boolean) => void;
}

const useBrandUpdate = ({ setId, setOpen }: useBrandUpdateProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["brand-update"],
    mutationFn: (data: BrandSchema) => updateBrand(data),
    onSuccess: () => {
      console.log("Brand updated successfully");
      toast.success("Brand updated successfully", {
        description: "Brand updated successfully",
        classNames: {
          description: "!text-green-700 !text-sm !font-medium",
        },
      });
      setOpen(false);
      setId(null);
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error) => {
      console.log("Failed to update Brand", error);
      toast.error("Failed to update Brand", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        classNames: {
          description: "!text-red-700 !text-sm !font-medium",
        },
      });
    },
  });
};

export default useBrandUpdate;
