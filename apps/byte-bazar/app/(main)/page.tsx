import CategoryShowcase from "@/components/category-showcase";
import PreviewGrid from "@/components/preview-grid";

import SpotlightGrid from "@/components/spotlight-grid";
import { getBrands, getProducts } from "@/lib/actions";
import { brandsTest, productTest } from "@/lib/test/data";

export default async function Page() {
  const products = await getProducts(undefined, undefined);
  const brands = await getBrands();
  // const categories = await getCategoryPreview();

  /* console.log("Brands: ", brands);
  console.log("Products: ", products); */

  return (
    <div className="">
      <div className="mb-20">
        <CategoryShowcase />
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-8">
        {/* <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button> */}
        <PreviewGrid dataType="brands" brands={brands.data || brandsTest} />
        <PreviewGrid
          dataType="products"
          products={products.data || productTest}
        />
      </div>
      <div className="my-10">
        <SpotlightGrid />
      </div>
    </div>
  );
}
