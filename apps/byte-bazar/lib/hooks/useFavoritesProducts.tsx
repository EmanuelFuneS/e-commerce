import { useEffect, useState } from "react";
import { getProductPreview } from "../actions";
import { Product } from "../types";

/* interface useFavoritesProductsProps {} */

const useFavoritesProducts = () => {
  const [favorites, setFavorites] = useState<Product[] | []>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const products = await getProductPreview();
        setFavorites((products?.data as unknown as Product[]) || []);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    fetchFavorites();
  }, []);

  return { favorites };
};

export default useFavoritesProducts;
