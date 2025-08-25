import { ChartAreaIcons } from "../../../components/charts/area-chart";
import { ChartAreaInteractive } from "../../../components/charts/area-chart-interactive";
import { ChartBarMultiple } from "../../../components/charts/bar-chart";

const Page = () => {
  return (
    <div className="bg-amber-200 gap-2">
      <div className="h-fit">
        <ChartAreaInteractive />
      </div>
      <ChartAreaIcons />
      <div className="h-fit">
        <ChartBarMultiple />
      </div>
    </div>
  );
};

export default Page;
