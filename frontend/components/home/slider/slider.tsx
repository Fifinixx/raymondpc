"use client";

import { CldImage } from "next-cloudinary";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
export default function Slider() {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const images = [
    "slider-img-1",
    "slider-img-2",
    "slider-img-3",
    "slider-img-4",
    "slider-img-5",
  ];

  useEffect(() => {
    intervalRef.current = loop();
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function handleSetImageIndex(command: string) {
    if (command === "prev" && imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = loop();
      }
    }
    if (command === "next" && imageIndex < images.length - 1) {
      setImageIndex((prev) => prev + 1);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = loop();
      }
    }
  }
  function loop() {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev < images.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 3000);
    return interval;
  }
  return (
    <>
      <motion.div className="relative aspect-video overflow-hidden w-full">
        <div
          onClick={() => handleSetImageIndex("prev")}
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-0 z-20 text-neutral-200 bg-[#ff6467] opacity-80 hover:opacity-100 rounded-r-md"
        >
          <ChevronLeft size={50} />
        </div>

        <div
          onClick={() => handleSetImageIndex("next")}
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0 z-20 text-neutral-200 bg-[#ff6467] opacity-80 hover:opacity-100 rounded-l-md"
        >
          <ChevronRight size={50} />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((item, index) => {
            return (
              <button
                onClick={() => setImageIndex(index)}
                type="button"
                key={item}
                className={`w-3 h-3 rounded-full ${
                  index === imageIndex ? "bg-white " : "bg-[#ff6467]"
                } hover:bg-white cursor-pointer`}
              />
            );
          })}
        </div>
        <motion.div
          className="relative flex w-full h-full"
          animate={{ x: `-${imageIndex * 100}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
        >
          {images.map((item) => (
            <div key={item} className="relative w-full aspect-[16/9] shrink-0 ">
              <CldImage
                src={item}
                alt={item}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className="object-cover  "
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
