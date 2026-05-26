"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
} from "../../../../../../packages/ui/src/components";
import useAnalytics from "../../../../lib/hooks/useAnalytics";
import { ChartAreaIcons } from "../../../../components/charts/area-chart";
import { ChartAreaInteractive } from "../../../../components/charts/area-chart-interactive";
import { ChartBarMultiple } from "../../../../components/charts/bar-chart";

const AnalyticsCharts = () => {
  const { data, isAllReady } = useAnalytics();
  /*   const { data: data2, isAllReady: isAllReady2 } = useStatsPerMonth(); */
  if (isAllReady === false) {
    return <>...Loading</>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          <ChartBarMultiple />
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl">
          <ChartAreaIcons />
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Counts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Label>Products: {data.products[0].count} </Label>
              <Label>Brands: {data.brands[0].count}</Label>
              <Label>Categories: {data.categories[0].count}</Label>
              <Label>Users: {data.users[0].count}</Label>
              <Label>Orders: {data.orders[0].count}</Label>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
