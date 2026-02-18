"use client";
import { Product } from "@/lib/types/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Label,
  Skeleton,
} from "@workspace/ui/components";
import { Cart, CartSolid, Heart /* HeartSolid  */ } from "@workspace/ui/lib";
import Image from "next/image";
import Link from "next/link";
import { useStoreCart } from "../../../lib/store";

interface ProductCardProps {
  data: Product;
  onSelect?: (product: Product) => void;
  onSelected?: boolean;
}

const ProductCard = ({ data, onSelect, onSelected }: ProductCardProps) => {
  const { cart, addToCart, removeToCart } = useStoreCart();

  const image = data.images!.length && data.images![0];
  const isSkeleton = !data.id || !data.name;

  return (
    <Card
      className={`rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ${onSelected && "bg-slate-400"} `}
      onClick={() => onSelect && onSelect(data)}
    >
      <CardHeader className="w-full flex justify-end">
        <Heart className="hover:text-slate-400" />
        {/*  <HeartSolid className="hidden hover:block" /> */}

        {cart.find((item) => item.id === data.id) ? (
          <CartSolid
            className="hover:text-slate-400"
            onClick={() => removeToCart(data.id)}
          />
        ) : (
          <Cart
            className="hover:text-slate-400"
            onClick={() => addToCart(data)}
          />
        )}
      </CardHeader>
      <CardContent className="w-full h-40 flex justify-center relative">
        {!image ? (
          <Skeleton className="w-full h-full bg-slate-400" />
        ) : (
          <Image
            src={image || ""}
            alt={data.name}
            fill
            className={` px-2 object-contain `}
            priority
          />
        )}
      </CardContent>

      <CardFooter className="min-w-40 flex flex-col gap-2 items-start">
        {isSkeleton ? (
          <div className="w-full flex flex-col space-y-2">
            <Skeleton className="w-full h-5 p-0.5 bg-slate-400" />
            <Skeleton className="w-full h-5 bg-slate-400" />
            <Skeleton className="w-full h-5 bg-slate-400" />
          </div>
        ) : (
          <>
            <Label>{data.name}</Label>
            <Label>${data.price?.toString()}</Label>
            <Link href={`/products/${data.category?.name + "/" + data.name}`}>
              View More...
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
