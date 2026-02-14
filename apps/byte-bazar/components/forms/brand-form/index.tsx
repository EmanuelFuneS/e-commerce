"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from "../../../../../packages/ui/src/components";
import useBrand from "../../../lib/hooks/useBrand";
import useBrandMutation from "../../../lib/hooks/useBrandMutation";
import useBrandUpdate from "../../../lib/hooks/useBrandUpdate";
import brandSchema, {
  BrandSchema,
} from "../../../lib/schemas/brand/brand.schema";

interface BrandFormProps {
  id?: string | null;
  setId: (id: string | null) => void;
  setOpen: (open: boolean) => void;
}

const BrandForm = ({ id, setId, setOpen }: BrandFormProps) => {
  const brandUpdate = useBrandUpdate({ setId, setOpen });
  const brandCreate = useBrandMutation({ setId, setOpen });

  const { data: brand } = useBrand({ id: id as string });

  const form = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logo: "",
      website: "",
    },
  });

  useEffect(() => {
    if (brand && id) {
      form.reset({
        id: brand[0]!.id || "",
        name: brand[0]!.name || "",
        logo: brand[0]!.logo || "",
        website: brand[0]!.website || "",
      });
    }
  }, [brand]);

  const onSubmit: SubmitHandler<BrandSchema> = async (data: BrandSchema) => {
    console.log("onSubmit data", data);
    try {
      if (id && id !== null) {
        //update
        await brandUpdate.mutateAsync(data);
      } else {
        //create
        await brandCreate.mutateAsync(data);
      }
      /* setOpen(false);

      setId(null); */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4"
      >
        <Field>
          <FieldLabel>Logo</FieldLabel>
          <Input id="logo" type="url" {...form.register("logo")} />
          <FieldError>{form.formState.errors.logo?.message}</FieldError>
        </Field>
        <div className="flex wrap gap-4">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input id="name" {...form.register("name", { required: true })} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Website</FieldLabel>
            <Input
              id="website"
              type="url"
              {...form.register("website", { required: true })}
            />
            <FieldError>{form.formState.errors.website?.message}</FieldError>
          </Field>
        </div>

        <Button type="submit" className=" self-end">
          {id ? "Update Brand" : "Create Brand"}
        </Button>
      </form>
    </div>
  );
};

export default BrandForm;
