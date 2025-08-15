"use client";
import psSlim from "@/public/img/ps5-slim.svg";
import speaker from "@/public/img/speaker-horizontal.svg";
import speakerLit from "@/public/img/speaker.svg";
import valveIndex from "@/public/img/valve_index_vr.webp";
import { Card } from "@workspace/ui/components";
import Image from "next/image";
import { useEffect, useRef } from "react";

const SpotlightGrid = () => {
  const sectionRef = useRef(null);

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
      { threshold: 0.5 }
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
        <div>
          <Card className="relative h-full shadow-lg bg-black p-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/6 h-2/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
            </div>
            <Image
              src={valveIndex}
              alt="Valve Index Banner"
              className="relative z-10 object-scale-down h-full w-full"
            />
          </Card>
        </div>
        <div className="w-full h-full grid grid-cols-1 grid-rows-2 gap-2">
          <div>
            <Card className="h-full relative shadow-lg bg-black p-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/6 h-3/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
              </div>
              <Image
                src={speaker}
                alt="Speaker Banner"
                className="relative z-50 object-scale-down h-full w-full"
              />
            </Card>
          </div>
          <div className="w-full h-full grid grid-cols-2 gap-2">
            <div>
              <Card className="relative h-full shadow-lg bg-black p-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/6 h-3/6 rounded-full bg-[#D9D9D9] blur-3xl opacity-100 " />
                </div>
                <Image
                  src={speakerLit}
                  alt="Speaker Lit Banner"
                  className="relative z-50 object-scale-down h-full w-full"
                />
              </Card>
            </div>
            <div>
              <Card className="h-full shadow-lg bg-black p-0">
                <Image
                  src={psSlim}
                  alt="PS5 Slim Banner"
                  className="object-scale-down h-full w-full"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightGrid;
