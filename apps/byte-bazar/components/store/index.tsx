import { useEffect } from "react";
import { useCategoriesStore } from "../../lib/store";

const StoreInitializer = () => {
  const { initializeCategories } = useCategoriesStore();
  useEffect(() => {
    initializeCategories();
  }, [initializeCategories]);

  return null;
};

export default StoreInitializer;
