import express from "express";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";
import formidable from "express-formidable";
import {
  createProductController,
  getProductsController,
} from "../controller/productController.js";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-products", getProductsController);

export default router;
