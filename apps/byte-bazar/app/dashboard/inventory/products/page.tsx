"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Badge,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from "../../../../../../packages/ui/src/components";
import InputImages from "../../../../components/Input-images";
import useProductMutation from "../../../../lib/hooks/useProductMutation";
import {
  ProductsSchema,
  productsSchema,
} from "../../../../lib/schemas/products/products.schema";
import {
  deleteImagesAction,
  uploadImagesAction,
} from "../../../../lib/services/cloudinary/actions";
import { useBrandsStore, useCategoriesStore } from "../../../../lib/store";
import { ImageItem, ProductHelper } from "../../../../lib/utils/productHelper";

const Page = () => {
  const [renderTag, setRenderTag] = useState<string[]>([]);
  const [slug, setSlug] = useState<string>("");
  const { categories } = useCategoriesStore();
  const { brands } = useBrandsStore();
  const [images, setImages] = useState<ImageItem[]>([]);
  const createProduct = useProductMutation();

  const form = useForm<ProductsSchema>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: zodResolver(productsSchema) as unknown,
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      brandId: "",
      stock: 0,
      images: [],
      isActive: true,
      tags: [],
      sku: "",
      slug: "",
      views: 0,
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((value, { name }) => {
      if (name === "brandId" || name === "categoryId") {
        if (value.brandId && value.categoryId) {
          const newSku = ProductHelper.generateSKU(
            value.categoryId,
            value.brandId,
          );
          form.setValue("sku", newSku);
        }
      }
    });

    return unsubscribe;
  }, [form]);

  useEffect(() => {
    const { unsubscribe } = form.watch((value, { name }) => {
      if (name === "name" || name === "description") {
        if (value.name && value.description) {
          const newTags = ProductHelper.generateTags(
            value.name,
            value.description,
          );
          const slug = ProductHelper.generateSlug(value.name);
          setSlug(slug);
          setRenderTag(newTags);
          form.setValue("tags", newTags);
          form.setValue("slug", slug);
        }
      }
    });

    return unsubscribe;
  }, [form, setRenderTag]);

  const onSubmit: SubmitHandler<ProductsSchema> = async (data) => {
    try {
      let productData = { ...data };

      const imagesToUpload = images;
      const imagePaths = await uploadImagesAction(imagesToUpload);

      if (imagePaths.length > 0) {
        productData.images = imagePaths;
        const result = await createProduct.mutateAsync(productData);

        if (result) {
          form.reset();
          setImages([]);
          setRenderTag([]);
          setSlug("");

          redirect("/dashboard/inventory/");
        } else {
          await deleteImagesAction(imagePaths);
        }
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      throw error;
    }
  };

  return (
    <section className="min-h-full">
      <form
        onSubmit={form.handleSubmit(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onSubmit,
        )}
      >
        <section className="h-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  [&>*:first-child]:mb-8">
          <div className="row-span-2 min-w-62.5 md:mb-0 ">
            <FieldLabel className="mb-2">Images Loader</FieldLabel>
            <InputImages setStateForm={setImages} stateForm={images} />
            <FieldDescription>Only 4 Images can be loaded.</FieldDescription>
          </div>

          <Field>
            <FieldLabel>Category</FieldLabel>
            <NativeSelect
              className="col-span-1"
              {...form.register("categoryId")}
            >
              {categories.map((cat, idx) => (
                <NativeSelectOption
                  key={idx}
                  value={cat.id}
                  className="capitalize"
                >
                  {cat.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldDescription>Select Category</FieldDescription>
            <FieldError>{form.formState.errors.categoryId?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Brand</FieldLabel>
            <NativeSelect className="col-span-1" {...form.register("brandId")}>
              {brands.map((brand, idx) => (
                <NativeSelectOption
                  key={idx}
                  value={brand.id}
                  className="capitalize"
                >
                  {brand.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldDescription>Select Brand</FieldDescription>
            <FieldError>{form.formState.errors.brandId?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name", { required: true })}
            />
            <FieldDescription>Enter the product name.</FieldDescription>
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              id="price"
              type="number"
              aria-invalid={!!form.formState.errors.price}
              {...form.register("price", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <FieldDescription>Enter the product price.</FieldDescription>
            <FieldError>{form.formState.errors.price?.message}</FieldError>
          </Field>

          <Field className="col-span-1">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description", { required: true })}
            />
            <FieldDescription>Enter the product description.</FieldDescription>
            <FieldError>
              {form.formState.errors.description?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              id="stock"
              type="number"
              aria-invalid={!!form.formState.errors.stock}
              {...form.register("stock", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <FieldDescription>Enter the product stock.</FieldDescription>
            <FieldError>{form.formState.errors.stock?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="sku">SKU</FieldLabel>
            <Input
              id="sku"
              disabled
              {...form.register("sku", {
                required: true,
              })}
            />
          </Field>
        </section>
        <div className="flex p-4 gap-2">
          <div className="space-x-2 space-y-2 w-full">
            <FieldLabel>Generated Tags</FieldLabel>
            <div className="h-20 bg-muted rounded-md p-2">
              {renderTag.length > 1 &&
                renderTag.map((tag, idx) => (
                  <Badge
                    className="p-2 hover:bg-ring"
                    variant="custom"
                    key={idx}
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="space-x-2 space-y-2 w-full">
            <FieldLabel>Generated Slug</FieldLabel>
            <div className="h-20 bg-muted rounded-md p-4">
              {slug.length > 0 && <p>{slug}</p>}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Page;
