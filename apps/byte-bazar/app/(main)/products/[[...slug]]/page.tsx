import { redirect } from "next/navigation";
import { getCachedFilterData } from "../../../../lib/services/filterService";
import { Brand, Category } from "../../../../lib/types";
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
  const resolvedSearchParams = await searchParams;

  if (!slug || slug.length === 0) {
    return <ProductFilter searchParams={resolvedSearchParams} />;
  }

  const decodedSlug = slug.map((segment) => decodeURIComponent(segment));

  if (decodedSlug.length === 2) {
    return <ProductDetail params={{ slug: decodedSlug }} />;
  }

  if (decodedSlug.length === 1) {
    const filter = await determineFilterType(decodedSlug[0]!);

    // Verificar conflictos
    if (
      resolvedSearchParams[filter.type] &&
      resolvedSearchParams[filter.type] !== filter.value
    ) {
      const params = new URLSearchParams(
        resolvedSearchParams as Record<string, string>
      );
      return redirect(`/products?${params.toString()}`);
    }

    // Merge filters
    const mergedFilters = {
      ...resolvedSearchParams,
      [filter.type]: filter.value,
    };

    return <ProductFilter searchParams={mergedFilters} filter={filter} />;
  }

  return <ProductNotFound />;
}

function ProductNotFound() {
  return <div className="w-full">product not found !!</div>;
}

async function determineFilterType(
  slug: string
): Promise<{ type: "brand" | "category"; value: string; id: string }> {
  const filterData = await getCachedFilterData();
  if (!filterData) {
    throw new Error("Filter data not available");
  }

  const normalizedSlug = slug.toLowerCase().replace("-", " ");

  const brand = filterData.brands.find(
    (b: Brand) => b.name.toLocaleLowerCase() === normalizedSlug
  );

  if (brand) {
    return {
      type: "brand" as const,
      value: slug,
      id: brand.id,
    };
  }

  const category = filterData.categories.find(
    (c: Category) => c.name?.toLocaleLowerCase() === normalizedSlug
  );

  if (category) {
    return {
      type: "category" as const,
      value: slug,
      id: category.id,
    };
  }

  throw new Error(`Filter not found: ${slug}`);
}
