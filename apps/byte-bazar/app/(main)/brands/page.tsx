"use client";
import { Product } from "@/lib/types/products";
import { useCallback, useEffect, useState, useTransition } from "react";
import PaginationGrid from "../../../components/pagination-grid";
import { getBrands } from "../../../lib/actions";
import { ApiResponse } from "../../../lib/types/common";

type Props = {};

const Page = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const [brands, setBrands] = useState<ApiResponse<Product[]> | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getBrands(page);
      setBrands(response);
    });
  }, [page]);

  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (!brands) return <div>Loading</div>;
  return (
    <div className="w-full ">
      <section className="flex flex-col md:flex-row justify-between">
        <aside className="h-full w-[350px] mt-5 rounded-lg shadow-2xl bg-card dark:bg-card ">
          aside
        </aside>
        <section className=" h-full w-full py-4">
          {!isPending && (
            <PaginationGrid
              data={brands.data}
              setPage={changePage}
              page={page}
              totalPages={brands.pagination?.totalPages}
            />
          )}
        </section>
      </section>
    </div>
  );
};

export default Page;
