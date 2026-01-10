"use client";
import { Label } from "@workspace/ui/components";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import PaginationGrid from "../../../components/pagination-grid";
import { getProducts } from "../../../lib/actions";
import { ApiResponse } from "../../../lib/types/common";
import { Product } from "../../../lib/types/products";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ApiResponse<Product[]> | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getProducts(page);
      setProducts(response as unknown as ApiResponse<Product[]>);
    });
  }, [page]);

  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (!products) return <div>Loading</div>;

  return (
    <div className="w-full">
      <section className="flex flex-col gap-4 mt-5">
        <Label className="capitalize text-3xl">{`Wishlist (${products.pagination?.totalItems})`}</Label>
        {!isPending && (
          <PaginationGrid
            data={products.data}
            changePage={changePage}
            page={page}
            totalPages={products!.pagination!.totalPages || 1}
          />
        )}
      </section>
      <section className="my-10 flex justify-center">
        <Link
          href={"/products"}
          className="bg-card dark:bg-card p-4 rounded-lg shadow-lg hover:scale-105  transform transition-transform duration-300"
        >
          Explore More Products
        </Link>
      </section>
    </div>
  );
};

export default Page;
