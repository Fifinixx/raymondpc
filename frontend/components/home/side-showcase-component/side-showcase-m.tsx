"use client";

import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
export default function SideShowCaseMobile() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="relative w-full aspect-[12/3]">
        <Button className="z-20 absolute right-[2%] bottom-[2%] bg-[#ff6467]">Buy Now</Button>
          <CldImage
            src="side-showcase-1-m"
            fill
            alt="Promotion: Buy latest in PC parts and components at affordable prices"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
        <div className="relative w-full aspect-[12/3]">
        <Button className="z-20 absolute right-[2%] bottom-[2%] bg-[#ff6467]">Buy Now</Button>
          <CldImage
            src="side-showcase-2-m"
            fill
            alt="Promotion: Buy latest laptops at attractive prices"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      </div>
    </>
  );
}
