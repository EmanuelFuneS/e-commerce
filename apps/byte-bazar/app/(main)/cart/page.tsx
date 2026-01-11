import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
} from "../../../../../packages/ui/src/components";
import ListCart from "../../../components/items-list/ListCart";
const Page = () => {
  return (
    <div className="p-5 space-y-5">
      <section className="">
        <ListCart />
      </section>
      <section className="w-full flex flex-col md:flex-row items-center gap-5 md:items-start md:justify-between mb-10">
        <Card className="w-full md:w-[40%]">
          <CardHeader>
            <CardTitle>Coupon Input</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Input placeholder="Boucher" type="text" />
            <Button>Add</Button>
          </CardContent>
        </Card>

        <Card className="w-full md:w-[40%]">
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex justify-between">
              <Label>Subtotal:</Label>
              <Label>999</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Shipping:</Label>
              <Label>20</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Total:</Label>
              <Label>999</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href={"/checkout/preview"}>Process To Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default Page;
