import CategoryShowcase from "../../components/category-showcase";
import PreviewGrid from "../../components/preview-grid";

import { getBrands, getCategoryPreview, getProducts } from "@/lib/actions";

export default async function Page() {
  const products = await getProducts();
  const brands = await getBrands();
  const categories = await getCategoryPreview();

  /* console.log("Brands: ", brands);
  console.log("Products: ", products); */

  return (
    <div className="min-h-svh">
      <div className="my-5">
        <CategoryShowcase />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {/* <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button> */}
        <PreviewGrid dataType="brand" brands={brands.data} />
        <PreviewGrid dataType="product" products={products.data} />
      </div>
    </div>
  );
}
