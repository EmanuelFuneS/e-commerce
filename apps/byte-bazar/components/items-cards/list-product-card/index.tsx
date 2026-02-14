import { Card, CardContent, Label } from "@workspace/ui/components";
import Image from "next/image";
import { Product } from "../../../lib/types";

interface ListProductCardProps {
  item: Product;
}

const ListProductCard = ({ item }: ListProductCardProps) => {
  const image = item.images!.length && item.images![0];
  //const isSkeleton = !item.id || !item.name;
  console.log("ITEM", item);
  return (
    <Card className="m-2 px-0 p-1 shadow-lg">
      <CardContent className="flex items-center justify-between space-x-2">
        <Image
          src={image || ""}
          alt={item.name}
          width={80}
          height={80}
          className="object-scale-down hover:scale-110 transform transition-transform duration-300 "
          priority
        />
        <div className="flex flex-col">
          <Label>{item.name}</Label>
          <Label>${item.price}</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListProductCard;
