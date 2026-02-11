"use client";
import { Card, Label, Skeleton } from "@workspace/ui/components/";

import Image from "next/image";
import Link from "next/link";
import useCategories from "../../lib/hooks/useCategories";
import { Category } from "../../lib/types/categories";
import BannerCarousel from "../banners/banner-carousel";

const CategoryShowcase = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="flex flex-col md:flex-row h-100 my-10 space-x-4 ">
      {/* categories section */}
      <div className="w-full md:w-2/7">
        <Card className="flex h-full p-4">
          <ul className=" flex flex-wrap justify-center md:flex-col gap-2">
            {!isLoading && categories?.length
              ? categories.map((cat: Category, index) => (
                  <li key={index}>
                    <CategoryLink cat={cat} idx={index} />
                  </li>
                ))
              : new Array(7)
                  .fill("")
                  .map((_, index) => (
                    <Skeleton className="h-10 w-full" key={index} />
                  ))}
          </ul>
        </Card>
      </div>
      <BannerCarousel />
    </section>
  );
};

export function CategoryLink({ cat, idx }: { cat: Category; idx: number }) {
  const isSkeleton = !cat.id || !cat.name || !cat.imageUrl;
  return (
    <>
      {isSkeleton ? (
        <div className="p-1 flex items-center space-x-2 ">
          <Skeleton className="h-6 w-8  bg-slate-400 " />
          <Skeleton
            className={`${idx % 2 === 1 ? "w-25" : "w-30"} h-4 bg-slate-400 `}
          />
        </div>
      ) : (
        <Link
          href={`/products/${cat.name}`}
          className="p-1 flex space-x-2 hover:text-slate-400 "
        >
          <Image
            src={cat.imageUrl || ""}
            alt={cat.name || ""}
            width={20}
            height={20}
            className="w-6 h-6 dark:invert dark:brightness-0 dark:contrast-100"
          />
          <Label className="text-md">{cat.name}</Label>
        </Link>
      )}
    </>
  );
}

export default CategoryShowcase;
