"use client";

import { useEffect, useState } from "react";
import PreviewGrid from ".";
import { useCategoriesStore } from "../../lib/store";
import { Product, ProductResponse } from "../../lib/types";
import { getProducts } from "../../src/actions/product.actions";

interface RelatedItemsProps {
  categoryName: string | undefined;
}

const RelatedItems = ({ categoryName }: RelatedItemsProps) => {
  const { categories } = useCategoriesStore();
  const [relatedProducts, setRelatedProducts] = useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryName || !categories.length) return;

      setIsLoading(true);

      try {
        const matchedCategory = categories.find(
          (cat) => cat.name === categoryName,
        );

        if (matchedCategory) {
          const result: ProductResponse = await getProducts(
            { category: matchedCategory.id, sort: "relevance" },
            {
              pageSize: 6,
            },
          );

          if (result?.products) {
            setRelatedProducts(result.products as Product[]);
          }
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryName, categories]);

  if (isLoading) {
    return <div className="w-full h-full p-4">Loading related products...</div>;
  }

  if (!relatedProducts.length) {
    return <div className="w-full h-full p-4">No related products found.</div>;
  }

  return (
    <section className="w-full h-full p-4">
      <PreviewGrid dataType="products" products={relatedProducts} />
    </section>
  );
};

export default RelatedItems;
