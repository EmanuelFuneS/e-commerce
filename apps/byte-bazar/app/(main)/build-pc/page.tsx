// app/(main)/build-pc/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import BuildPcForm from "../../../components/forms/build-pc-form";
import { getCategories, getProducts } from "../../../lib/actions";
import { Category } from "../../../lib/types";

export default async function BuildPcPage() {
  const queryClient = new QueryClient();
  const categories = await getCategories();

  if (categories?.data && Array.isArray(categories.data)) {
    await Promise.all(
      categories.data.map((cat: Category) =>
        queryClient.prefetchQuery({
          queryKey: ["products", { category: cat.id }],
          queryFn: () =>
            getProducts(undefined, undefined, { category: cat.id }),
        })
      )
    );
  }

  return (
    <Suspense fallback={<div>Cargando página...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BuildPcForm />
      </HydrationBoundary>
    </Suspense>
  );
}
