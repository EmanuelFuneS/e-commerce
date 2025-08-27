import { ChartAreaIcons } from "../../../components/charts/area-chart";
import { ChartAreaInteractive } from "../../../components/charts/area-chart-interactive";
import { ChartBarMultiple } from "../../../components/charts/bar-chart";

const Page = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-2">
        <div className="">
          <ChartBarMultiple />
        </div>
        <div className="">
          <ChartAreaIcons />
        </div>
      </div>
      <div className="w-auto h-fit">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};

export default Page;
