"use client";
import PaginationGrid from "@/components/pagination-grid";
import { ProductFilters } from "@/lib/types/common";
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
import { Product, ProductResponse } from "../../../../lib/types";
import { getProducts } from "../../../../src/actions/product.actions";

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

  const page = Number(searchParams.page || 1) - 1;

  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }>({ page: 0, pageSize: 0, totalItems: 0, totalPages: 0 });
  const [isPending, startTransition] = useTransition();
  /* const { availableDB } = useHealthDB(); */

  const buildFilters = useCallback((): ProductFilters => {
    const categoryFromParams = searchParams.category as string;
    const brandFromParams = searchParams.brand as string;
    const minPrice = searchParams.minPrice as string;
    const maxPrice = searchParams.maxPrice as string;
    const sort = searchParams.sort as string;

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
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort,
      // ...
    };
  }, [searchParams, filter]);

  useEffect(() => {
    const page = Number(searchParams.page || 1) - 1; // API usa 0-indexed
    const filters = buildFilters();

    startTransition(async () => {
      const response: ProductResponse = await getProducts(filters, {
        page,
        pageSize: 10,
      });

      setProducts(response.products);
      setPagination(response.pagination);
    });
  }, [searchParams, buildFilters, page]);

  const changePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(
        searchParams as Record<string, string>,
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
      router.push(newUrl);
    },
    [pathname, router, searchParams, filter],
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
            {!isPending && products && (
              <PaginationGrid
                data={products}
                changePage={changePage}
                page={Number(searchParams.page || 1) - 1}
                totalPages={pagination.totalPages}
              />
            )}
          </Suspense>
        </section>
      </section>
    </div>
  );
}
