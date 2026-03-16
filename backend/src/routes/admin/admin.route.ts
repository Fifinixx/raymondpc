import express from "express";
import { MulterMiddleware } from "../../middlewares/multer/multer.middleware.js";
import * as AdminProductController from "../../controllers/admin/admin-product.controller.js";
import * as AdminCategoryController from "../../controllers/admin/admin-category.controller.js";

const AdminRouter = express.Router();

AdminRouter.post(
  "/product/add",
  MulterMiddleware,
  AdminProductController.AddProduct,
);

AdminRouter.get("/categories", AdminCategoryController.FetchCategories);
AdminRouter.post("/categories", AdminCategoryController.UpsertCategories);

export { AdminRouter };
