"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Label,
  Separator,
} from "../../../../packages/ui/src/components";
import {
  CartProducts,
  cartProductsSchema,
} from "../../lib/schemas/products/cartProduct.schema";
import { useBuilderStore, useStoreCart } from "../../lib/store";
import { Product } from "../../lib/types/products";

const ListCart = () => {
  const { cart, clearCart } = useStoreCart();
  const { builderState, transferToCart } = useBuilderStore();

  const { control, register, setValue, handleSubmit, reset, watch } =
    useForm<CartProducts>({
      resolver: zodResolver(cartProductsSchema),
      defaultValues: {
        items: [],
        subtotal: "0",
      },
    });

  const items = useWatch({
    control,
    name: "items",
  });

  const subtotal = useMemo(() => {
    if (!items?.length) return 0;
    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0,
    );
    setValue("subtotal", subtotal.toString());
    return subtotal;
  }, [items]);

  useEffect(() => {
    if (builderState.length) return transferToCart();
  }, [builderState]);

  useEffect(() => {
    if (cart.length) {
      const formData = cart.map((item: Product) => ({
        productId: item.id,
        price: item.price,
        quantity: 1,
      }));
      reset({ items: formData });
    }
  }, [cart]);

  const onSubmit = (data: CartProducts) => {
    console.log(data);
  };

  return (
    <div className="p-5 space-y-5">
      <section>
        <Card className="">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Image</CardTitle>
            <CardTitle>Product </CardTitle>
            <CardTitle className="ml-35">Price </CardTitle>
            <CardTitle>Quantity</CardTitle>
          </CardHeader>
          <CardContent className="mt-10 space-y-10 space-x-5">
            <form id="cart-form" onSubmit={handleSubmit(onSubmit)}>
              {cart.map((item, idx) => {
                const photo = item.images[0];
                return (
                  <div
                    key={idx}
                    className="w-full h-10 flex items-center justify-between border-b-2 pb-10 mt-8 gap-6"
                  >
                    <Image
                      src={photo || ""}
                      alt={item.name}
                      width={60}
                      height={60}
                    />

                    <Label className="w-60">{item.name}</Label>
                    <Label className="w-20 text-start">
                      {(
                        Number(watch(`items.${idx}.price`)) *
                        watch(`items.${idx}.quantity`)
                      ).toFixed(2)}
                    </Label>

                    <Field className="w-20">
                      <Input
                        className="w-15"
                        type="number"
                        defaultValue={1}
                        min={1}
                        max={item.stock}
                        {...register(`items.${idx}.quantity`, {
                          required: true,
                        })}
                      />
                    </Field>
                  </div>
                );
              })}
            </form>
          </CardContent>
          <CardFooter className="mt-10 flex justify-between">
            <Button>
              <Link href={"/products"}>Return To Shop</Link>
            </Button>
            <Button
              onClick={() => {
                clearCart();
              }}
            >
              Clear
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
              <Label>{subtotal.toFixed(2)}</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Shipping:</Label>
              <Label>20</Label>
            </div>
            <Separator />
            <div className="flex justify-between">
              <Label>Total:</Label>
              <Label>{(Number(subtotal) + 20).toFixed(2)}</Label>
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
