import {
  Card,
  CardContent,
  Label,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components";
import Image from "next/image";
import { Brand } from "../../../lib/types/brands";
interface BrandCardProps {
  data: Brand;
}

const BrandCard = ({ data }: BrandCardProps) => {
  //const isSkeleton = !data.id || !data.name;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`${data && "bg-white"} rounded-lg relative hover:scale-105  transform transition-transform duration-300 p-0`}
        >
          {!data.logo ? (
            <Skeleton className="w-full h-40 bg-slate-400" />
          ) : (
            <CardContent className="w-40 h-40">
              <Image
                src={data.logo}
                alt={data.name}
                fill
                className="px-2 object-contain"
                priority
              />
            </CardContent>
          )}
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <Label>{data.name}</Label>
      </TooltipContent>
    </Tooltip>
  );
};

export default BrandCard;
