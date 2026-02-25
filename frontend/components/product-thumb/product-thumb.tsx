"use client";

import { CldImage } from "next-cloudinary";
import { ProductThumbType } from "@/lib/types";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";

export default function ProductThumb(props: ProductThumbType) {
  return (
    <>
      <div className="relative cursor-pointer border-[0.1px] border-[#ff6467] rounded-md p-2 flex flex-col justify-center items-center w-full">
        <div className="absolute z-20 top-[2%] left-[2%]">
          <Badge variant="destructive" className="bg-[#ff6467]">NEW</Badge>
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative bg-transparent w-full aspect-square"
        >
          <CldImage
            src={props.image}
            alt={props.alt}
            fill
            sizes="(max-width:768px) 150px, (max-width:1024px) 200px, 400px"
            className="object-fit"
          />
        </motion.div>
        <div className="font-bold w-full  p-2 bg-neutral-200 flex flex-col justify-center gap-2 rounded-b-md text-sm">
          <p className="text-center line-clamp-2">{props.title}</p>
          <p className="text-center  text-green-600">
            {currencyFormatter(props.price)}
          </p>
          <div className="w-full flex justify-center items-center gap-4">
            <Button className="cursor-pointer">Buy Now</Button>
            <Button className="cursor-pointer">
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
