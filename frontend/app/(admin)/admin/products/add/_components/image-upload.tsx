"use client";

import { Input } from "@/components/ui/input";
import { LucideImageUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ProductType } from "@/lib/types";
type ImageUploadTypes = {
  inputs: ProductType;
  setInputs: React.Dispatch<React.SetStateAction<ProductType>>;
};
export default function ImageUpload({ inputs, setInputs }: ImageUploadTypes) {
  return (
    <>
      {inputs.images.map((item, i) => {
        const isFile = item instanceof File;
        const imageSrc = isFile
          ? URL.createObjectURL(item as File)
          : (item as string);
        return (
          <Label
            htmlFor={`image-upload-${i}`}
            key={i}
            className="cursor-pointer relative w-24 h-24 bg-neutral-700 rounded-md flex items-center  justify-center"
          >
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id={`image-upload-${i}`}
              name={`image-${i}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setInputs((prev) => {
                  const images = [...prev.images];
                  images[i] = file;
                  return { ...prev, images: images };
                });
              }}
            />
              <span className="z-10">
                <LucideImageUp className="h-6 w-6 text-neutral-400" />
              </span>
            {item && (
              <Image
                src={imageSrc}
                alt={`Uploaded ${i + 1}`}
                fill
                className="object-cover rounded-md"
              />
            )}
          </Label>
        );
      })}
    </>
  );
}
