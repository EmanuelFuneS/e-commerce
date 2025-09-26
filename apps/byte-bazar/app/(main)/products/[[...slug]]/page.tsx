import { getCachedFilterData } from "../../../../lib/services/filterService";
import ProductDetail from "./ProductDetail";
import ProductFilter from "./ProductsFilter";

interface ProductDynamicZoneProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDynamicZone({
  params,
  searchParams,
}: ProductDynamicZoneProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return <ProductFilter filter={""} />;
  }

  const decodeSlug = slug.map((segment) => decodeURIComponent(segment));
  const decodeFilter = decodeSlug[0];

  const filter = await determineFilterType(decodeFilter!);

  //console.log(filter);

  if (decodeSlug.length === 1) {
    return <ProductFilter filter={decodeFilter} />;
  } else if (decodeSlug.length === 2) {
    return <ProductDetail params={{ slug }} />;
  } else {
    return <ProductNotFound />;
  }
}

function ProductNotFound() {
  return <div>product not found !!</div>;
}

async function determineFilterType(slug: string) {
  const filterData = await getCachedFilterData();

  if (filterData?.brands.includes(slug.toUpperCase())) {
    return { type: "brand", filter: slug };
  } else {
    return { type: "category", filter: slug };
  }
}
