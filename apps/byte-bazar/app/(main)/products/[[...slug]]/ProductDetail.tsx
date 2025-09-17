import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Label,
} from "@workspace/ui/components";

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
  console.log("SLUG", decodeName);

  const productResponse = await SearchByProductName(decodeName);
  const product: Product = productResponse!.data;

  console.log("PRODUCT", product);

  return (
    <section className="w-full h-full pb-10">
      <div className="h-[10vh] flex items-center px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {slug &&
              slug.length > 0 &&
              slug.map((segment, index) => (
                <>
                  <BreadcrumbItem>
                    {index === slug.length - 1 ? (
                      <BreadcrumbPage>
                        {decodeURIComponent(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/products/${segment}`}>
                        {decodeURIComponent(segment)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < 1 && <BreadcrumbSeparator />}
                </>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProductGallery product={product} />
      <section>
        <Label className="text-2xl font-bold px-4">Related items</Label>
        {slug && <RelatedItems categoryName={decodeCategory} />}
      </section>
    </section>
  );
}
