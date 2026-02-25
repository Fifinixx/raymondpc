import express from "express";
import { MulterMiddleware } from "../../middlewares/multer/multer.middleware.js";
import { AddProduct } from "../../controllers/admin/admin-product.controller.js";
import validateToken from "../../middlewares/token/validateToken.js";

const AdminProductRouter = express.Router();

AdminProductRouter.post(
  "/product/add",
  validateToken,
  (req, res, next) => {
    if (req.user.role !== "ADMIN") {
      return res
        .status(409)
        .json({ message: "You do not have permission to access this route." });
    }
    next();
  },
  MulterMiddleware,
  AddProduct,
);

export { AdminProductRouter };
