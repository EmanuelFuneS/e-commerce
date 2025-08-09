"use client";
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
      className=" h-screen flex items-center snap-center text-white"
    >
      <div className="w-full h-[70%] grid grid-cols-2 gap-2">
        <div className="bg-black rounded">left image max h</div>
        <div className="w-full h-full grid grid-cols-1 grid-rows-2 gap-2">
          <div className="bg-black rounded">upper foto</div>
          <div className="w-full h-full grid grid-cols-2 gap-2">
            <div className="bg-black rounded"></div>
            <div className="bg-black rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightGrid;
