"use client";
import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  Label,
} from "@workspace/ui/components/";

import steamMachine from "@/public/img/SteamMachine.webp";
import steamController from "@/public/img/steam-controller.webp";
import steamDeck from "@/public/img/steamdeck.webp";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCategories from "../../lib/hooks/useCategories";
import { Category } from "../../lib/types/categories";

const CategoryShowcase = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const { categories } = useCategories();
  return (
    <section className="flex flex-col md:flex-row h-[400px] my-10 space-x-4 ">
      {/* Categories section */}
      <div className="w-full md:w-2/7">
        <Card className="flex h-full p-4">
          <ul className=" flex flex-wrap justify-center md:flex-col gap-2">
            {categories.map((cat: Category, index) => (
              <li key={index}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="p-1 flex space-x-2 hover:text-slate-400 "
                >
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    width={20}
                    height={20}
                    className="w-6 h-6 dark:invert dark:brightness-0 dark:contrast-100"
                  />
                  <Label className="text-md">{cat.name}</Label>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Carousel section */}
      <Card className="w-full md:w-4/5 p-0">
        <Carousel
          className="w-full h-full" // Cambiar de max-w-xs a w-full h-full
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full">
            <CarouselItem className="h-full">
              <div className="h-[310px] md:h-[400px] rounded-xl flex justify-center items-center bg-black">
                <Image
                  src={steamDeck}
                  alt="Banner"
                  className=" h-full w-full object-contain "
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="h-[310px] md:h-[400px] rounded-xl flex justify-center items-center bg-black">
                <Image
                  src={steamMachine}
                  alt="Banner"
                  className=" h-full w-full object-scale-down "
                />
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="h-[310px] md:h-[400px] rounded-xl flex justify-center items-center bg-black">
                <Image
                  src={steamController}
                  alt="Banner"
                  className=" h-4/6 w-4/6 object-contain "
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Card>
    </section>
  );
};

export default CategoryShowcase;
