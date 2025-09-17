"use client";

import { useEffect, useState } from "react";
import PreviewGrid from ".";
import { getRelatedProducts } from "../../lib/actions";
import { useCategoriesStore } from "../../lib/store";

interface RelatedItemsProps {
  categoryName: string | undefined;
}

const RelatedItems = ({ categoryName }: RelatedItemsProps) => {
  const { categories } = useCategoriesStore(); // Sin await - es síncrono
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryName || !categories.length) return;

      setIsLoading(true);

      try {
        const matchedCategory = categories.find(
          (cat) => cat.name === categoryName
        );

        if (matchedCategory) {
          console.log("CATEGORIES", categories);
          const result = await getRelatedProducts(matchedCategory.id);

          if (result?.data) {
            setRelatedProducts(result.data);
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
