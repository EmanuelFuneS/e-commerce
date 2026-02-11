import { Card, Label } from "../../../../../packages/ui/src/components";
import SearchItems from "../../../components/search-items";
import OrderTable from "../../../components/tables/order-table";
import { ordersExample } from "../../../lib/types";

const page = () => {
  return (
    <div className="w-full h-full space-y-4 p-2">
      <div className="my-4">
        <Label className="text-3xl">Inventory</Label>
      </div>
      <Card className="flex flex-row justify-between px-4 items-center ">
        <SearchItems />
        <div></div>
      </Card>
      <section>
        <OrderTable orders={ordersExample} rol={"admin"} />
      </section>
    </div>
  );
};
export default page;
