"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../../packages/ui/src/components/card";
import { Label } from "../../../../../packages/ui/src/components/label";
import { Product } from "../../../lib/types/products";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  console.log(data);
  const image = data.images[0];
  return (
    <Card>
      <CardHeader>{data.discountPercentage}</CardHeader>
      <CardContent>
        <Image
          src={image || ""}
          alt={data.name}
          width={40}
          height={40}
          priority
        />
      </CardContent>
      <CardFooter>
        <Label>{data.name}</Label>
        <Label>{data.price}</Label>
        <Label>{data.stock}</Label>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
