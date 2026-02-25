"use client";

import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

export default function TopBanner() {
  return (
    <>
      <div className="cursor-pointer relative w-full aspect-[16/2] rounded-t-md">
        <div className="absolute z-15 w-full aspect-[16/2]  rounded-t-md bg-linear-to-r from-transparent to-[#ff6467]"></div>
        <div className="absolute z-20 right-[0.5%] bottom-[2%] text-right">
          <p className="text-xl text-neutral-200">Festival discount upto 50%</p>
          <Button className="cursor-pointer  bg-[#ff6467]">BROWSE</Button>
        </div>
        <CldImage
          src="top-banner-img"
          fill
          alt="Promotion: Buy PC products with a discount as high as 50%"
          sizes="(max-width:768px) 500px, (max-width:1024px) 700px, 1000px"
          className="object-cover rounded-t-md hover:opacity-90"
        />
      </div>
    </>
  );
}
