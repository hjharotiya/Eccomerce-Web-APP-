import express from "express";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";
import formidable from "express-formidable";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductPhotoController,
  getProductsController,
  getSingleProductController,
  productCategoryController,
  productCountFilter,
  productFilterController,
  productListController,
  searchProductController,
  similarProductController,
  updateProductController,
} from "../controller/productController.js";
const router = express.Router();

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
router.get("/get-products", getProductsController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", getProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter product route
router.post("/product-filters", productFilterController);

// PAGE COUNT
router.get("/product-count", productCountFilter);

export default router;

// PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

// SEARCH ROUTE
router.get("/search/:keyword", searchProductController);

// SIMILAR PRODUCT
router.get("/similar/:pid/:cid", similarProductController);

// PRODUCT BY CATEGORY
router.get("/product-category/:slug", productCategoryController);

// PAYMENTS ROUTES
// TOKEN
router.get("/braintree/token", braintreeTokenController);

// PAYMENT
router.post("/braintree/token", requireSignIn, braintreePaymentController);
