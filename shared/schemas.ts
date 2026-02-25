import { z } from "zod";

const userSchema = z.object({
  firstName: z
    .string({ message: "The field cannot be empty" })
    .min(2, { message: "First name should be atleast 2 characters long" })
    .max(20, { message: "First Name should be less than 20 characters long." }),
  lastName: z
    .string({ message: "The field cannot be empty" })
    .min(5, { message: "Last name should be atleast 2 characters long" })
    .max(20, { message: "Last name be less thant 20 characters long" }),
  email: z.email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password cannot be empty" })
    .min(8, { message: "Password should atleast 8 characters long" }),
});

const signInSchema = userSchema.pick({
  email: true,
  password: true,
});

const TiptapNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.string(), z.any()).optional(),
    content: z.array(TiptapNodeSchema).optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.string(), z.any()).optional(),
        }),
      )
      .optional(),
    text: z.string().optional(),
  }),
);

const productSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.object(
    {
      type: z.literal("doc"),
      content: z.array(TiptapNodeSchema),
    },
    {
      message: "Please enter a product description.",
    },
  ),
  msrp: z
    .number({ message: "MSRP must be a number" })
    .positive({ message: "MSRP should be greater than 0" }),

  price: z
    .number({ message: "Price must be a number" })
    .positive({ message: "Price should be greater than 0" }),
  stock: z
    .number({ message: "Stock must be a number" })
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
  variant: z.string().optional(),
  images: z
    // 1. Allow an array where items can be EITHER a string OR a File object
    .array(z.union([z.string(), z.instanceof(File)]))

    // Refine needs to check both types now to ensure at least one valid item exists
    .refine(
      (arr) =>
        arr.some((item) => {
          if (item instanceof File) return true; // A new uploaded file is valid
          if (typeof item === "string" && item.trim() !== "") return true; // A non-empty URL is valid
          return false; // Empty strings are ignored
        }),
      {
        message: "At least one valid image is required.",
      },
    )
    .max(5, { message: "You can upload up to 5 images" }),
});

export { userSchema, signInSchema, productSchema };

export type ProductType = z.infer<typeof productSchema>;
export type UserType = z.infer<typeof userSchema>;
export type SignInType = z.infer<typeof signInSchema>;
