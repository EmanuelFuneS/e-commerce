import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components";
import { ordersExample } from "../../../lib/types";
import OrderTable from "../../tables/order-table";

interface ProfileOrdersProps {
  data?: any;
}

const ProfileOrders = ({ data }: ProfileOrdersProps) => {
  return (
    <section>
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <OrderTable rol={"customer"} orders={ordersExample} />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderTable rol={"customer"} orders={ordersExample} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileOrders;
