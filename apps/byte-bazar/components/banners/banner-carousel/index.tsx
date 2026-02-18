import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

import steamMachine from "@/public/img/SteamMachine.webp";
import steamController from "@/public/img/steam-controller.webp";
import steamDeck from "@/public/img/steamdeck.webp";

const preData = [
  {
    id: 1,
    title: "Valve Steam Deck",
    description:
      "Experience the next level of gaming with the Valve Steam Deck.",
    imageUrl: steamDeck,
  },
  {
    id: 2,
    title: "Valve Steam Machine",
    description:
      "Enjoy gaming like never before with the sleek and powerful Valve Steam Machine.",
    imageUrl: steamMachine,
  },
  {
    id: 3,
    title: "Valve Steam Controller",
    description:
      "Experience the ultimate control with our premium Valve Steam Controller.",
    imageUrl: steamController,
  },
];

interface BannerCarouselProps {
  data?: [
    {
      id: number;
      title: string;
      description: string;
      imageUrl: string;
    },
  ];
}

const BannerCarousel = ({ data }: BannerCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <>
      {/* Carousel section */}
      <Carousel
        className="w-full h-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {preData.map((item, idx) => (
            <CarouselItem key={item.id} className="h-full">
              <div className="h-77.5 md:h-100 rounded-xl flex justify-center items-center bg-black relative">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-scale-down rounded-xl opacity-90"
                />
                <span className="absolute z-100 bottom-10 text-center bg-black/50 w-full p-4 text-white">
                  {item.description}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default BannerCarousel;
