import { getProducts } from "@/src/actions/product.actions";
import { useEffect, useState } from "react";
import { Product } from "../types";

/* interface useFavoritesProductsProps {} */

const useFavoritesProducts = () => {
  const [favorites, setFavorites] = useState<Product[] | []>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const products = await getProducts();
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
