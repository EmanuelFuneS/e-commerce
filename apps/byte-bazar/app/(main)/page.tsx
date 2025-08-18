import CategoryShowcase from "@/components/category-showcase";
import PreviewGrid from "@/components/preview-grid";

import SpotlightGrid from "@/components/spotlight-grid";
import { getBrandPreview, getProductPreview } from "@/lib/actions";

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
        <PreviewGrid dataType="brands" brands={brands!.data} />
        <PreviewGrid dataType="products" products={products!.data} />
      </div>
      <div className="my-10">
        <SpotlightGrid />
      </div>
    </div>
  );
}
