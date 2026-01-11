import { useEffect, useState } from "react";
import { getCategoryPreview } from "../actions";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryPreview();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCategories(response!.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
};

export default useCategories;
