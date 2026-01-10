import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BuildPcForm from "../../../components/forms/build-pc-form";
import { getCategories, getProducts } from "../../../lib/actions";
import { Category } from "../../../lib/types";

const Page = async () => {
  const queryClient = new QueryClient();
  const categories = await getCategories();

  await Promise.all(
    categories &&
      categories.data.map((cat: Category) =>
        queryClient.prefetchQuery({
          queryKey: ["products", { category: cat.id }],
          queryFn: () =>
            getProducts(undefined, undefined, { category: cat.id }),
        })
      )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildPcForm />
    </HydrationBoundary>
  );
};

export default Page;
