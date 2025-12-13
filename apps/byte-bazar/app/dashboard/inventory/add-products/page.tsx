"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../../../../../packages/ui/src/components";
import {
  ProductsSchema,
  productsSchema,
} from "../../../../lib/schemas/products/products.schema";
import { ProductHelper } from "../../../../lib/utils/productHelper";

const Page = () => {
  const form = useForm<ProductsSchema>({
    resolver: zodResolver(productsSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      brandId: "",
      stock: 0,
      images: [],
      isActive: true,
      tags: [],
      sku: "",
      slug: "",
      Views: 0,
    },
  });

  function onSubmit(values: ProductsSchema) {
    const dataToSubmit = {
      ...values,
      sku:
        values.sku ||
        ProductHelper.generateSKU(values.categoryId, values.brandId),
      slug: values.slug || ProductHelper.generateSlug(values.name),
      tags:
        values.tags.length > 0
          ? values.tags
          : ProductHelper.generateTags(values.name, values.description),
    };

    console.log("FORM DATA", dataToSubmit);
  }

  return (
    <Card className=" ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 grid columns-2 row-autos gap-4"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category field */}
          {/* Brand id */}
          {/* imagesUrl base */}
          {/* images array */}

          <FormField
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};

export default Page;
