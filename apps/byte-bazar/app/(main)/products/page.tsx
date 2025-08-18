"use client";
import useHealthDB from "@/lib/hooks/useHealthDB";
import { Product } from "@/lib/types/products";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import PaginationGrid from "../../../components/pagination-grid";
import { getProducts } from "../../../lib/actions";
import { ApiResponse } from "../../../lib/types/common";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ApiResponse<Product[]> | null>(null);
  const [isPending, startTransition] = useTransition();
  const { availableDB } = useHealthDB();

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
};

export default Page;
