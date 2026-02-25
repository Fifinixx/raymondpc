import { prisma } from "../../lib/prisma.js";
import { ProductType, UserType } from "../../types.js";
import { slugify } from "../../lib/utils.js";
import { Prisma } from "../../generated/prisma/browser.js";

export async function AddProductService({
  product,
  email,
}: {
  product: ProductType;
  email: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  const newProduct = await prisma.product.create({
    data: {
      title: product.title,
      description: product.description as Prisma.InputJsonValue,
      slug: slugify(product.title),
      addedByUserId: existingUser.id,
      lastUpdatedByUserId: existingUser.id,
      variants: {
        create: {
          variantName: "Default",
          msrp: new Prisma.Decimal(product.msrp),
          price: new Prisma.Decimal(product.price),
          stock: Number(product.stock),
          images:{
            create : product.images.map((image, index) => {
             return { url:image,
              position:index,
              altText:`${product.title} - Image ${index + 1}` 
            }
            })
          }
        },
      },
    },
  });
  return {...newProduct}
}
