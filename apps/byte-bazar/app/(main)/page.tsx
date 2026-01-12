import CategoryShowcase from "@/components/category-showcase";
import PreviewGrid from "@/components/preview-grid";

import SpotlightGrid from "@/components/spotlight-grid";
import { getBrandPreview, getProductPreview } from "@/lib/actions";
import { Brand, Product } from "lib/types";
import AIChat from "../../components/ai-chat";

export default async function Page() {
  const products = await getProductPreview();
  const brands = await getBrandPreview();

  return (
    <div className="">
      <div className="mb-20">
        <CategoryShowcase />
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-8">
        {/* <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button> */}
        <PreviewGrid
          dataType="brands"
          brands={brands!.data as unknown as Brand[]}
        />
        <PreviewGrid
          dataType="products"
          products={products!.data as unknown as Product[]}
        />
        <AIChat />
      </div>
      <div className="my-10">
        <SpotlightGrid />
      </div>
    </div>
  );
}
