"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Tiptap from "./_components/TipTap";
import ImageUpload from "./_components/image-upload";
import { useProductForm } from "@/hooks/use-product";
import { Spinner } from "@/components/ui/spinner";

export default function AddProduct() {
  const {inputs, setInputs, errors, UploadProduct, loading, setLoading } = useProductForm();
  return (
    <>
      <div className="w-[90%] m-auto  sm:w-[80%] max-w-[1000px] flex flex-col items-center justify-center  border-[0.1px] border-neutral-700 rounded-md   bg-neutral-900">
        <div className="text-neutral-300 font-extralight  w-full ">
          <div className="w-full rounded-t-md p-2 border-b-[0.1px]  border-neutral-700">
            <h1 className="text-center text-md  ">ADD NEW PRODUCT</h1>
          </div>
          <form className="w-full flex flex-col justify-center items-center gap-6 p-4">
            <div className="w-full">
              <Label className="pb-2 font-extralight">Title *</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              {errors?.title && (
                <div className="text-red-700 text-xs">{errors.title}</div>
              )}
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
              <div className="w-full lg:w-1/3 relative">
                <Label className="pb-2 font-extralight">MSRP *</Label>
                <Input
                  type="number"
                  id="msrp"
                  name="msrp"
                  value={inputs.msrp}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      msrp: Number(e.target.value),
                    }))
                  }
                />
                {errors?.msrp && (
                  <div className="absolute -bottom-4 text-red-700 text-xs">
                    {errors.msrp}
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/3 relative">
                <Label className="pb-2 font-extralight">Price *</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={inputs.price}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                />
                {errors?.price && (
                  <div className="absolute -bottom-4 text-red-700 text-xs">
                    {errors.price}
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/3 relative">
                <Label className="pb-2 font-extralight">Stock *</Label>
                <Input
                  type="number"
                  id="stock"
                  name="stock"
                  value={inputs.stock}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      stock: Number(e.target.value),
                    }))
                  }
                />
                {errors?.stock && (
                  <div className="absolute -bottom-4 text-red-700 text-xs">
                    {errors.stock}
                  </div>
                )}
              </div>
              {/* <div className="w-full lg:w-1/4 relative">
                <Label className="pb-2 font-extralight">Variant</Label>
                <Input
                  placeholder="Leave empty for default...."
                  type="text"
                  id="variant"
                  name="variant"
                  value={inputs.variant}
                  onChange={(e) => {
                    setInputs((prev) => ({ ...prev, variant: e.target.value }));
                  }}
                />
                {errors?.variant && (
                  <div className="absolute -bottom-4 text-red-700 text-xs">
                    {errors.variant}
                  </div>
                )}
              </div> */}
            </div>
            <div className="w-full relative  flex flex-col justify-start items-start ">
              <Label className="pb-2 font-extralight">
                Images (First image will be featured as pilot) *
              </Label>
              <div className="w-full flex justify-start items-center gap-2">
                <ImageUpload setInputs={setInputs} inputs={inputs} />
              </div>
              {errors?.images && (
                <div className="absolute -bottom-4 text-red-700 text-sm">
                  {errors.images}
                </div>
              )}
            </div>
            <div className="relative w-full">
              <Label className="  pb-2 font-extralight">Description *</Label>
              <Tiptap inputs={inputs} setInputs={setInputs} />
                {errors?.description && (
                  <div className="absolute -bottom-4 text-red-700 text-sm">
                    {errors.description}
                  </div>
                )}
            </div>
            <Button
            disabled={loading}
              className="w-full bg-[#ff6467]  cursor-pointer"
              type="button"
              onClick={UploadProduct}
            >
              {loading ? <Spinner />  : "Add Product"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
