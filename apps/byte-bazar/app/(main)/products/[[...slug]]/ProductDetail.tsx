import { Label } from "@workspace/ui/components";

import RelatedItems from "../../../../components/preview-grid/RelatedItems";
import ProductGallery from "../../../../components/product-gallery";
import { SearchByProductName } from "../../../../lib/actions";
import { Product } from "../../../../lib/types";

interface Params {
  params: { slug: string[] };
}

export default async function ProductDetail({ params }: Params) {
  const { slug } = await params;
  const decodeName = decodeURIComponent(slug[1] || "");
  const decodeCategory = decodeURIComponent(slug[0] || "");

  const productResponse = await SearchByProductName(decodeName);
  const product: Product = productResponse!.data as unknown as Product;

  //console.log("PRODUCT", product);

  return (
    <section className="w-full h-full pb-10">
      <ProductGallery product={product} />
      <section>
        <Label className="text-2xl font-bold px-4">Related items</Label>
        {slug && <RelatedItems categoryName={decodeCategory} />}
      </section>
    </section>
  );
}
