import { Label } from "@workspace/ui/components";

import RelatedItems from "../../_components/preview-grid/RelatedItems";
import ProductGallery from "../../_components/product-gallery";
import { Product } from "../../../../lib/types";
import { getProducts } from "../../../../src/actions/product.actions";

interface Params {
  params: { slug: string[] };
}

export default async function ProductDetail({ params }: Params) {
  const { slug } = await params;
  const decodeName = decodeURIComponent(slug[1] || "");
  const decodeCategory = decodeURIComponent(slug[0] || "");

  const productResponse = await getProducts({ name: decodeName });
  const product: Product = productResponse!.products[0] as unknown as Product;

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
