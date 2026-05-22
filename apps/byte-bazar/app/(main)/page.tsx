import BannerGrid from "@/app/(main)/_components/banner-grid";
import CategoryShowcase from "@/app/(main)/_components/category-showcase";
import PreviewGrid from "@/app/(main)/_components/preview-grid";

import { getBrands } from "@/src/actions/brand.actions";
import { Brand, Product } from "lib/types";
import { getProducts } from "../../src/actions/product.actions";

export const dynamic = "force-dynamic";
export default async function Page() {
  const { products } = await getProducts(undefined, { page: 1, pageSize: 6 });
  const brands = await getBrands(undefined, { page: 1, pageSize: 6 });
  return (
    <div className="">
      <div className="mb-20">
        <CategoryShowcase />
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-8">
        {/* <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button> */}
        <PreviewGrid dataType="brands" brands={brands! as unknown as Brand[]} />
        <PreviewGrid
          dataType="products"
          products={products! as unknown as Product[]}
        />
        {/* <AIChat /> */}
      </div>
      <div className="my-10">
        <BannerGrid />
      </div>
    </div>
  );
}
