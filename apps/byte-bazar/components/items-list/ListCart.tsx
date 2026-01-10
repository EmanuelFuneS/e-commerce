import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../packages/ui/src/components";

const ListCart = () => {
  const cartItems = new Array(4).fill("");
  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Product </CardTitle>
        <CardTitle>Price </CardTitle>
        <CardTitle>Quantity</CardTitle>
      </CardHeader>
      <CardContent className="mt-10 space-y-10 space-x-5">
        {cartItems.map((item, idx) => {
          return (
            <div
              key={idx}
              className="w-full h-10 flex justify-between border-b-2 pb-10 mt-4 gap-6"
            >
              <p>name product</p>
              <p>999</p>
              <p className="mx-7">12</p>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="mt-10 flex justify-between">
        <Button>
          <Link href={"/products"}>Return To Shop</Link>
        </Button>
        <Button>
          <Link href={""}>Update Cart</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListCart;
