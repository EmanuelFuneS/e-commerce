"use client";
import Image from "next/image";
import { Brand } from "../../../lib/types/brands";

interface BrandCardProps {
  data: Brand;
}

const BrandCard = ({ data }: BrandCardProps) => {
  return (
    <Image src={data.logo} alt={data.name} width={80} height={80} priority />
  );
};

export default BrandCard;
