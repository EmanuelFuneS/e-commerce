import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../packages/ui/src/components";
import { useBrandsStore, useCategoriesStore } from "../../lib/store";

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "relevance", label: "Relevance" },
];

const Filter = () => {
  const { categories } = useCategoriesStore();
  const { brands } = useBrandsStore();

  //const response = await getBrands();

  console.log("Categories", categories);

  console.log("Brands", brands);

  const form = useForm({
    defaultValues: {
      price: "",
      category: "",
      brand: "",
      discountPercentage: "",
      sort: "",
    },
  });

  return (
    <Card className="w-[350px] mt-4 rounded-lg shadow-2xl bg-card dark:bg-card ">
      <CardHeader>
        <Label className="text-2xl font-bold mb-4">Filters</Label>{" "}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-10">
            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Sort by</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select order" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sortOptions.map((options, index) => (
                        <SelectItem key={index} value={options.value}>
                          {options.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Sort products</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormDescription>Filter by price</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Brands</FormLabel>
                  <RadioGroup className="flex flex-wrap gap-2">
                    {brands.map((brand, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            id={idx.toString()}
                            value={brand.id}
                          />
                        </FormControl>
                        <Label htmlFor={brand.id}>{brand.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FormDescription>Filter by Brand</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Categories</FormLabel>
                  <RadioGroup className="flex flex-wrap gap-2">
                    {categories.map((category, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            id={idx.toString()}
                            value={category.id}
                          />
                        </FormControl>
                        <Label htmlFor={category.id}>{category.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FormDescription>Filter by Category</FormDescription>
                </FormItem>
              )}
            />

            {/* <FormField /> */}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Filter;
