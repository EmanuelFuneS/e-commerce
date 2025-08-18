import { useEffect, useState } from "react";
interface HealthResponse {
  available: boolean;
}
const useHealthDB = () => {
  const [availableDB, setAvailableDB] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const testDB = async () => {
      try {
        const result = await fetch("/api/health");
        const data: HealthResponse = await result.json();
        setAvailableDB(data.available);
      } catch (error) {
        console.error("Health check failed: ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    testDB();
  }, []);

  return { availableDB, isLoading };
};

export default useHealthDB;
