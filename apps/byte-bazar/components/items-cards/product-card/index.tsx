"use client";
import { Product } from "@/lib/types/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Label,
} from "@workspace/ui/components";
import { Heart, HeartSolid } from "@workspace/ui/lib";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const image = data.images[0];
  console.log(data.brand);
  return (
    <Card className="rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
      <CardHeader className="w-full flex justify-end">
        <Heart className="hover:hidden" />
        <HeartSolid className="hidden hover:block" />
      </CardHeader>
      <CardContent className="w-full h-40 flex justify-center relative">
        <Image
          src={image || ""}
          alt={data.name}
          fill
          className=" px-2 object-contain "
          priority
        />
      </CardContent>

      <CardFooter className="w-full flex flex-col gap-2 items-start">
        <Label>{data.name}</Label>
        <Label>${data.price.toString()}</Label>
        <Link href={`/products/${data.category.name + "/" + data.name}`}>
          View More...
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
