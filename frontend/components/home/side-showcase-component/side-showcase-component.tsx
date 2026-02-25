"use client";

import {Button} from "@/components/ui/button";
import { CldImage } from "next-cloudinary";

export default function SideShowCaseComponent() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <div className="relative w-full h-[50%]">
           <Button className="absolute z-20 bg-[#ff6467] cursor-pointer right-[2%] bottom-[2%]">SHOP NOW</Button>
          <CldImage
            src="side-showcase-1"
            alt="An Image for showcasing latest products"
            fill
            className="object-cover "
            sizes="(max-width: 768px) 100vw, 1000px"

          />
        </div>
        <div className="h-[50%] relative w-full ">
        <Button className="absolute z-20 bg-[#ff6467] cursor-pointer right-[2%] bottom-[2%]">SHOP NOW</Button>
          <CldImage
            src="side-showcase-2"
            alt="Promotion: Buy latest laptops at attractive prices"
            fill
            className="object-cover "
            sizes="(max-width: 768px) 100vw, 1000px"

          />
        </div>
      </div>
    </>
  );
}
