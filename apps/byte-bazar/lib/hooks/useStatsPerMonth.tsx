import { useQueries } from "@tanstack/react-query";
import {
  getMonthlyStatsBrands,
  getMonthlyStatsCategories,
  getMonthlyStatsOrders,
  getMonthlyStatsProducts,
  getMonthlyStatsUsers,
} from "../../src/actions/analytics.actions";

const useStatsPerMonth = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["stats", "products"],
        queryFn: () => getMonthlyStatsProducts(),
      },
      {
        queryKey: ["stats", "categories"],
        queryFn: () => getMonthlyStatsCategories(),
      },
      {
        queryKey: ["stats", "brands"],
        queryFn: () => getMonthlyStatsBrands(),
      },
      {
        queryKey: ["stats", "users"],
        queryFn: () => getMonthlyStatsUsers(),
      },
      {
        queryKey: ["stats", "orders"],
        queryFn: () => getMonthlyStatsOrders(),
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

export default useStatsPerMonth;
