"use client";
import psSlim from "@/public/img/ps5-slim.svg";
import speaker from "@/public/img/speaker-horizontal.svg";
import speakerLit from "@/public/img/speaker.svg";
import valveIndex from "@/public/img/valve_index_vr.webp";
import { Card } from "@workspace/ui/components";
import Image from "next/image";
import { useEffect, useRef } from "react";

const preData = [
  {
    id: 1,
    title: "Valve Index VR",
    description:
      "Experience the next level of virtual reality with the Valve Index.",
    imageUrl: valveIndex,
  },
  {
    id: 2,
    title: "Premium Speaker",
    description:
      "Immerse yourself in high-quality sound with our premium speaker.",
    imageUrl: speaker,
  },
  {
    id: 3,
    title: "Premium Speaker Lit",
    description:
      "Experience the ultimate sound quality with our premium speaker lit.",
    imageUrl: speakerLit,
  },
  {
    id: 4,
    title: "PS5 Slim",
    description:
      "Enjoy gaming like never before with the sleek and powerful PS5 Slim.",
    imageUrl: psSlim,
  },
];

interface BannerGridProps {
  data?: [
    {
      id: number;
      title: string;
      description: string;
      imageUrl: string;
    },
  ];
}
const BannerGrid = ({ data }: BannerGridProps) => {
  const sectionRef = useRef(null);

  const [firstItem, secondItem, ...restItems] = data || preData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className=" h-full flex items-center snap-center text-white"
    >
      <div className="w-full h-[70%] grid grid-cols-1 md:grid-cols-2 gap-2">
        {firstItem && (
          <Card className="relative h-full shadow-lg bg-black p-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/6 h-2/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
            </div>
            <Image
              src={firstItem.imageUrl}
              alt={firstItem.title}
              className="relative z-10 object-scale-down h-full w-full"
            />
            <span className="absolute bottom-0 text-center z-50 bg-black/50 w-full p-4 text-white">
              {firstItem.description}
            </span>
          </Card>
        )}

        <div className="w-full h-full grid grid-cols-1 grid-rows-2 gap-2">
          {secondItem && (
            <Card className="h-full relative shadow-lg bg-black p-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/6 h-3/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
              </div>
              <Image
                src={secondItem.imageUrl}
                alt={secondItem.title}
                className="relative z-10 object-scale-down h-full w-full"
              />
              <span className="absolute bottom-0 text-center z-50 bg-black/50 w-full p-3 text-sm text-white">
                {secondItem.description}
              </span>
            </Card>
          )}

          <div className="w-full h-full grid grid-cols-2 gap-2">
            {restItems.slice(0, 2).map((item) => (
              <Card className="relative h-full shadow-lg bg-black p-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/6 h-3/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
                </div>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="relative z-10 object-scale-down h-full w-full"
                />
                <span className="absolute bottom-0 text-center z-50 bg-black/50 w-full p-2 text-xs text-white">
                  {item.description}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerGrid;
