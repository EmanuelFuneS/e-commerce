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
        setFavorites(products!.data);
      } catch (error) {}
    };
    fetchFavorites();
  }, []);

  return { favorites };
};

export default useFavoritesProducts;
