"use client";
import PaginationGrid from "@/components/pagination-grid";
import { getProducts, ProductFilters } from "@/lib/actions";
import { ApiResponse } from "@/lib/types/common";
import { Product } from "@/lib/types/products";
import { usePathname, useRouter } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import Filter from "../../../../components/filter";
import { FilterType } from "../../../../lib/services/filterService";

interface ProductFilterProps {
  filter?: FilterType;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProductFilter({
  filter,
  searchParams,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<ApiResponse<Product[]> | null>(null);
  const [isPending, startTransition] = useTransition();
  /* const { availableDB } = useHealthDB(); */

  const buildFilters = useCallback((): ProductFilters => {
    const categoryFromParams = searchParams.category as string;
    const brandFromParams = searchParams.brand as string;

    // --- MODIFIED LOGIC ---
    let category: string | undefined;
    if (filter?.type === "category") {
      // Prioritize the ID from the filter object if one exists
      category = filter.id;
    } else if (categoryFromParams) {
      // Fallback to the slug from searchParams ONLY if no filter object exists
      // (This might still be the slug, meaning you need a separate map)
      category = categoryFromParams;
    }

    let brand: string | undefined;
    if (filter?.type === "brand") {
      brand = filter.id;
    } else if (brandFromParams) {
      brand = brandFromParams;
    }
    // ----------------------

    // ... rest of the function ...

    return {
      category: category !== "all" ? category : undefined,
      brand: brand !== "all" ? brand : undefined,
      // ...
    };
  }, [searchParams, filter]);

  useEffect(() => {
    const page = Number(searchParams.page || 1) - 1; // API usa 0-indexed
    const filters = buildFilters();

    startTransition(async () => {
      const response = await getProducts(page, 10, filters);
      setProducts(response);
    });
  }, [searchParams, buildFilters, page]);

  const changePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(
        searchParams as Record<string, string>
      );
      Object.entries(searchParams).forEach(([key, value]) => {
        if (filter && key === filter.type) {
          return;
        }

        if (value && key !== "page") {
          params.set(key, String(value));
        }
      });
      params.set("page", String(newPage + 1));
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      console.log("Changing page to:", newUrl);
      router.push(newUrl);
    },
    [pathname, router, searchParams]
  );

  if (!products)
    return (
      <div className="min-w-6x flex justify-center">
        <h1>Loading</h1>
      </div>
    );
  return (
    <div className="min-w-6xl ">
      <section className="flex flex-col md:flex-row justify-between">
        <aside>
          <Suspense fallback={<div>Loading filters...</div>}>
            <Filter searchParams={searchParams} filter={filter} />
          </Suspense>
        </aside>
        <section className="w-full h-full py-4">
          <Suspense fallback={<div>Loading products...</div>}>
            {!isPending && products.data && (
              <PaginationGrid
                data={products.data}
                changePage={changePage}
                page={Number(searchParams.page || 1) - 1}
                totalPages={products.pagination?.totalPages}
              />
            )}
          </Suspense>
        </section>
      </section>
    </div>
  );
}
