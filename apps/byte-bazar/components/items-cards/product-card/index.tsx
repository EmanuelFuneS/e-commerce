"use client";
import Image from "next/image";
import {
  Card,
  CardFooter,
  CardHeader,
} from "../../../../../packages/ui/src/components/card";
import { Label } from "../../../../../packages/ui/src/components/label";
import { Product } from "../../../lib/types/products";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const image = data.images[0];

  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader className="w-full h-40 flex justify-center relative">
        <Image
          src={image || ""}
          alt={data.name}
          fill
          className=" px-2 object-contain "
          priority
        />
      </CardHeader>

      <CardFooter className="w-full flex flex-col items-start">
        <Label>{data.name}</Label>
        <Label>${data.price.toString()}</Label>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
