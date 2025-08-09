import { Card, CardContent } from "@workspace/ui/components";
import Image from "next/image";
import { Brand } from "../../../lib/types/brands";
interface BrandCardProps {
  data: Brand;
}

const BrandCard = ({ data }: BrandCardProps) => {
  return (
    <Card className="bg-white p-1 rounded-lg relative">
      <CardContent className="w-40 h-40">
        <Image
          src={data.logo}
          alt={data.name}
          fill
          className=" px-2 object-contain"
          priority
        />
      </CardContent>
    </Card>
  );
};

export default BrandCard;
