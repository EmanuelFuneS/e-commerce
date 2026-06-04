import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Label,
  NativeSelect,
  NativeSelectOption,
  RadioGroup,
  RadioGroupItem,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../../../packages/ui/src/components";
import { Filter as FilterIcon } from "../../../../../../packages/ui/src/lib";

import { FilterType } from "../../../../lib/services/filterService";
import { useBrandsStore, useCategoriesStore } from "../../../../lib/store";

const sortOptions = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "relevance", label: "Relevance" },
];

interface FilterProps {
  filter?: FilterType;
  searchParams: { [key: string]: string | string[] | undefined };
}
export interface FilterFormData {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  page: string;
}

const Filter = ({ filter, searchParams }: FilterProps) => {
  const { categories } = useCategoriesStore();
  const { brands } = useBrandsStore();
  const router = useRouter();
  const pathname = usePathname();

  const formFilter = useForm<FilterFormData>({
    defaultValues: {
      category: (filter?.type === "category" && (filter?.id as string)) || "",
      brand: (filter?.type === "brand" && (filter?.id as string)) || "",
      minPrice: (searchParams.minPrice as string) || "",
      maxPrice: (searchParams.maxPrice as string) || "",
      sort: (searchParams.sort as string) || "",
      page: (searchParams.page as string) || "1",
    },
  });

  useEffect(() => {}, [formFilter]);

  const onSubmit = (data: FilterFormData) => {
    const params = new URLSearchParams();

    // Construye los params excluyendo valores vacíos y "all"
    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") {
        // Si hay filter del slug, NO agregues ese tipo a los params
        if (filter && key === filter.type) {
          return;
        }
        params.set(key, String(value));
      }
    });

    // Siempre reinicia a página 1
    params.set("page", "1");

    let newUrl;

    if (filter) {
      const currentPrimaryValue = data[filter.type as keyof FilterFormData];

      if (currentPrimaryValue === filter.id) {
        // Mantén el slug
        const queryString = params.toString();
        newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      } else {
        // Cambió el filtro principal
        newUrl = `/products?${params.toString()}`;
      }
    } else {
      newUrl = params.toString()
        ? `/products?${params.toString()}`
        : "/products";
    }

    router.push(newUrl);
  };

  const filterFields = (
    <div className="space-y-10">
      <Field>
        <FieldLabel>Sort by</FieldLabel>
        <NativeSelect
          className="col-span-1"
          {...formFilter.register("sort")}
        >
          {sortOptions.map((option, idx) => (
            <NativeSelectOption
              key={idx}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <FieldDescription>Select Category</FieldDescription>
        <FieldError>
          {formFilter.formState.errors.sort?.message}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel>Price</FieldLabel>
        <div className="flex flex-row space-x-5">
          <Input
            placeholder="Min"
            type="number"
            {...formFilter.register("minPrice")}
          />
          <Input
            placeholder="Max"
            type="number"
            {...formFilter.register("maxPrice")}
          />
        </div>
        <FieldDescription>Define range of price</FieldDescription>
        <FieldError>
          {formFilter.formState.errors.minPrice?.message ||
            formFilter.formState.errors.maxPrice?.message}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel>Brands</FieldLabel>
        <Controller
          name="brand"
          control={formFilter.control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="brand-all" />
                <Label htmlFor="brand-all">All</Label>
              </div>
              {brands.map((brand, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem id={idx.toString()} value={brand.id} />
                  <Label htmlFor={brand.id}>{brand.name}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        ></Controller>
        <FieldDescription>FilterByBrand</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Categories</FieldLabel>
        <Controller
          name="category"
          control={formFilter.control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="brand-all" />
                <Label htmlFor="brand-all">All</Label>
              </div>
              {categories.map((category, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={idx.toString()}
                    value={category.id}
                  />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        ></Controller>
        <FieldDescription>Filter by Category</FieldDescription>
      </Field>
      <Button type="submit">Filtrar</Button>
    </div>
  );

  return (
    <>
      <Card className="hidden md:block w-87.5 mt-4 rounded-lg shadow-2xl bg-card dark:bg-card ">
        <CardHeader>
          <Label className="text-2xl font-bold mb-4">Filters</Label>{" "}
        </CardHeader>
        <CardContent>
          <form
            onSubmit={formFilter.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {filterFields}
          </form>
        </CardContent>
      </Card>
      <div className="block md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <FilterIcon className="size-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-75 sm:w-87.5 flex flex-col">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <form
              onSubmit={formFilter.handleSubmit(onSubmit)}
              className="flex-1 overflow-y-auto space-y-6 p-4 pt-2"
            >
              {filterFields}
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Filter;
