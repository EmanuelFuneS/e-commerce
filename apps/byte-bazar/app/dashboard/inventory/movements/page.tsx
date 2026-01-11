import { Card, Label } from "../../../../../../packages/ui/src/components";
import SearchItems from "../../../../components/search-items";
import MovementTable from "../../../../components/tables/movement-table";

import { stockMovements } from "../../../../lib/types";

const Page = () => {
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
        <MovementTable movements={stockMovements} />
      </section>
    </div>
  );
};

export default Page;
