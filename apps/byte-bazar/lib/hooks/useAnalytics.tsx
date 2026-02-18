import { useQueries } from "@tanstack/react-query";
import {
  getCountBrands,
  getCountCategories,
  getCountOrders,
  getCountProducts,
  getCountUsers,
} from "../../src/actions/analytics.actions";

const useAnalytics = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["count", "products"],
        queryFn: () => getCountProducts(),
      },
      {
        queryKey: ["count", "categories"],
        queryFn: () => getCountCategories(),
      },
      {
        queryKey: ["count", "brands"],
        queryFn: () => getCountBrands(),
      },
      {
        queryKey: ["count", "users"],
        queryFn: () => getCountUsers(),
      },
      {
        queryKey: ["count", "orders"],
        queryFn: () => getCountOrders(),
      },
    ],
    combine: (data) => {
      return {
        data: {
          products: data[0].data,
          categories: data[1].data,
          brands: data[2].data,
          users: data[3].data,
          orders: data[4].data,
        },
        isAllReady: data.every((res) => !res.isPending && res.isSuccess),
      };
    },
  });
};

export default useAnalytics;
