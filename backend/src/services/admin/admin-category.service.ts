import { prisma } from "../../lib/prisma.js";
import { Category, Prisma } from "../../generated/prisma/client.js";
import type { CategoryType } from "../../types.js";
import { slugify } from "../../lib/utils.js";

// export async function AddCategories(categories: CategoryType[]) {
//   function slugifyCategory(categories: CategoryType[]) {
//     return categories.map((category: CategoryType) => {
//       return {
//         ...category,
//         slug: slugify(category.name),
//         children: category.children ? slugifyCategory(category.children) : null,
//       };
//     });
//   }

//   const slugifiedCategories = slugifyCategory(categories);

//   // Format the object to append the create functionality
//   // In order to work in Prisma relations
//   function formatCategories(
//     categories: CategoryType[],
//   ): Prisma.CategoryCreateInput[] {
//     return categories.map((category: CategoryType) => {
//       const { children, ...rest } = category;
//       const parent: any = { ...rest };
//       if (children && children.length > 0) {
//         parent.children = {
//           create: formatCategories(children),
//         };
//       }
//       return parent;
//     });
//   }
//   const formattedCategories = formatCategories(slugifiedCategories);
//   const categoriesAddPromises = formattedCategories.map((category) => {
//     return prisma.category.create({ data: category });
//   });
//   await Promise.all(categoriesAddPromises);
// }

export async function FetchCategories() {
  return await prisma.category.findMany();
}

export async function UpdateCategory(category: CategoryType) {
  async function upsertCategory(category: CategoryType) {
    const { children, id, ...categoryData } = category;
    const updateAddCategory = {
      ...categoryData,
      slug: slugify(categoryData.name),
    };
    return await prisma.category.upsert({
      where: { id },
      update: { ...updateAddCategory },
      create: { id, ...updateAddCategory },
    });
  }

  const result = await upsertCategory(category);
  return result;
}
