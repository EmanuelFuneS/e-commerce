// app/(main)/build-pc/page.tsx
import { getCategories } from "@/src/actions/category.actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import BuildPcForm from "../../../components/forms/build-pc-form";
import { Category } from "../../../lib/types";
import { getProducts } from "../../../src/actions/product.actions";

export const dynamic = "force-dynamic";

export default async function BuildPcPage() {
  const queryClient = new QueryClient();
  const categories = await getCategories();

  if (categories && Array.isArray(categories)) {
    await Promise.all(
      categories.map((cat: Category) =>
        queryClient.prefetchQuery({
          queryKey: ["products", { category: cat.id }],
          queryFn: () => getProducts({ category: cat.id }),
        }),
      ),
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
