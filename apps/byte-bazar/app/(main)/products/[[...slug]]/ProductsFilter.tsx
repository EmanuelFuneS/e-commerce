"use client";

/* import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import PaginationGrid from "../../../../components/pagination-grid";
import { getProducts } from "../../../../lib/actions";
import useHealthDB from "../../../../lib/hooks/useHealthDB";
import { ApiResponse } from "../../../../lib/types";
import { Product } from "../../../generated/prisma"; */

import PaginationGrid from "@/components/pagination-grid";
import { getProducts } from "@/lib/actions";
import useHealthDB from "@/lib/hooks/useHealthDB";
import { ApiResponse } from "@/lib/types/common";
import { Product } from "@/lib/types/products";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface ProductFilterProps {
  filter: string | undefined;
}

export default function ProductFilter({ filter }: ProductFilterProps) {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<ApiResponse<Product[]> | null>(null);
  const [isPending, startTransition] = useTransition();
  const { availableDB } = useHealthDB();

  console.log(filter);

  useEffect(() => {
    if (availableDB) {
      toast("Sync success", {
        description: `DB is successfully connected`,
      });
    } else {
      toast("Sync failed", {
        description: `DB is failed connected`,
      });
    }
  }, [availableDB]);

  useEffect(() => {
    startTransition(async () => {
      const response = await getProducts(page);
      setProducts(response);
    });
  }, [page]);

  /*  useEffect(() => {
    startTransition(async () => {

      if(filter.type === "category") {
        const response = await getProductsbycategory(page, filter);
        setProducts(response);

      }else if (filterType === "brand") {
        const response = await getProductsbyBrand(page, filter);
        setProducts(response);

      } else {

        const response = await getProducts(page);
        setProducts(response);
      }
    });
  }, [page]); */

  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (!products) return <div>Loading</div>;
  return (
    <div className="w-full ">
      <section className="flex flex-col md:flex-row justify-between">
        <aside className="h-full w-[350px] mt-5 rounded-lg shadow-2xl bg-card dark:bg-card ">
          aside
        </aside>
        <section className=" h-full w-full py-4">
          {!isPending && (
            <PaginationGrid
              data={products.data}
              setPage={changePage}
              page={page}
              totalPages={products.pagination?.totalPages}
            />
          )}
        </section>
      </section>
    </div>
  );
}
