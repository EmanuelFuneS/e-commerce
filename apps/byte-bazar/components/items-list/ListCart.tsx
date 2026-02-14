"use client";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
} from "../../../../packages/ui/src/components";
import { useStoreCart } from "../../lib/store";

const ListCart = () => {
  const { cart, cartProducts } = useStoreCart();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const items = await cartProducts();
      console.log("items", items);
      setSubTotal(items.reduce((acc, item) => acc + Number(item.price), 0));

      setCartItems(items);
    };
    fetch();
  }, [cart]);

  /* const cartItems = use(cartProducts()); */
  return (
    <div className="p-5 space-y-5">
      <section>
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
                  <Label>{item.name}</Label>
                  <Label>{item.price.toString()}</Label>
                  <Label className="mx-7">0</Label>
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
              <Label>{subTotal}</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Shipping:</Label>
              <Label>20</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Total:</Label>
              <Label>{subTotal + 20}</Label>
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

export default ListCart;
