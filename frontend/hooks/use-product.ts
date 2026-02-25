import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { productSchema } from "../../shared/schemas";
import type { ProductType } from "@/lib/types";
import { addProduct } from "@/lib/services/product.service";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export function useProductForm() {
  const emptyProduct: ProductType = {
    title: "",
    description: "",
    msrp: 0,
    price: 0,
    stock: 0,
    variant: "",
    images: ["", "", "", "", ""],
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductType, string>>
  >({});
  const [inputs, setInputs] = useState<ProductType>(emptyProduct);
  const [loading, setLoading] = useState(false);

  function resetInputs() {
    setInputs(emptyProduct);
  }

  function resetErrors() {
    setErrors({});
  }

  function validateInputs(inputs: ProductType) {
    resetErrors();
    const checkProductInputs = productSchema.safeParse(inputs);
    if (!checkProductInputs.success) {
      toast.error("Please check for errors in the form");
      const fieldErrors = Object.fromEntries(
        checkProductInputs.error.issues.map((issue) => [
          issue.path[0],
          issue.message,
        ]),
      );
      setErrors(fieldErrors);
      return false;
    }
    return true;
  }

  async function UploadProduct() {
    if (validateInputs(inputs)) {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("msrp", inputs.msrp.toString());
      formData.append("price", inputs.price.toString());
      formData.append("stock", inputs.stock.toString());
      formData.append("description", JSON.stringify(inputs.description));
      formData.append("variant", "");
      inputs.images.forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item);
        }
      });

      try {
        setLoading(true);
        const res = await addProduct(formData);
        const data = await res.json();
        if (res.ok) {
          toast.success("Product added succesfully!");
          setLoading(false);
        } else if (res.status === 400 || res.status === 409) {
          setLoading(false);
          toast.error("Please check for errors in the form");
          const fieldErrors = Object.fromEntries(
            data.errors.map((issue: z.core.$ZodIssue) => [
              issue.path[0],
              issue.message,
            ]),
          );
          setErrors(fieldErrors);
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      } catch (e) {
        setLoading(false);
        console.error("Network error", e);
        toast.error("Network error. Please check your connection.");
      }
    }
  }

  return {
    errors,
    setErrors,
    inputs,
    setInputs,
    resetInputs,
    resetErrors,
    validateInputs,
    UploadProduct,
    loading,
    setLoading,
  };
}
