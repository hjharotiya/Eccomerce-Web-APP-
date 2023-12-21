import express from "express";

import {
  forgetPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);
// LOGIN || METHOD POST
router.post("/login", loginController);

// FORGET-PASSWORD || METHOD POST
router.post("/forget-password", forgetPasswordController);

// TEST routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin Routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update Profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
