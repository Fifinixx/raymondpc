import { Request, Response, NextFunction } from "express";
import * as AdminCategoryService from "../../services/admin/admin-category.service.js";
import { CategoriesSchema, CategorySchema } from "../../../../shared/schemas.js";
import { Prisma } from "../../generated/prisma/client.js";

export async function FetchCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categories = await AdminCategoryService.FetchCategories();
    return res
      .status(200)
      .json({ categories, message: "Categories fetched succesfully" });
  } catch (e) {
    console.error("Error while fetching categories", e);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}


export async function UpsertCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { category } = req.body;
  const result = CategorySchema.safeParse(category);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: result.error.issues,
    });
  }
  try {
    const updatedCategory = await AdminCategoryService.UpdateCategory(category);
    return res.status(200).json({ message: "Categories updated succesfully" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientValidationError) {
      console.error(e);
      return res
        .status(400)
        .json({ error: "Invalid data provided for categories" });
    }
    console.error("Error while adding categories", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
