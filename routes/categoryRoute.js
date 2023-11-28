import expres from "express";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = expres.Router();

// routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
// Update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get All Categories
router.get("/get-category", requireSignIn, isAdmin, allCategoryController);

//******** */ Single Category ********
router.get("/get-singleCategory/:slug", singleCategoryController);

// delete category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
