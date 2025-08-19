"use client";

import { getBrands } from "@/lib/actions";
import { Brand } from "@/lib/types";
import { ApiResponse } from "@/lib/types/common";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState, useTransition } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../../packages/ui/src/components";
import BrandCard from "../../../components/items-cards/brand-card";

const Page = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [brands, setBrands] = useState<ApiResponse<Brand[]> | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getBrands();
      setBrands(response);
    });
  }, []);

  if (!brands) return <div>Loading</div>;
  return (
    <div className="w-auto my-10">
      <Carousel
        id="Carro"
        className="w-full md:min-w-xl lg:min-w-3xl"
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {brands.data!.map((brand: Brand, idx: number) => {
            return (
              <CarouselItem key={idx} className=" md:basis-1/2 lg:basis-1/4">
                <BrandCard data={brand} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Page;
