import { useEffect } from "react";
import { useBrandsStore, useCategoriesStore } from "../../lib/store";

const StoreInitializer = () => {
  const { initializeCategories } = useCategoriesStore();
  const { initializeBrands } = useBrandsStore();
  useEffect(() => {
    initializeCategories();
    initializeBrands();
  }, [initializeCategories, initializeBrands]);

  return null;
};

export default StoreInitializer;
