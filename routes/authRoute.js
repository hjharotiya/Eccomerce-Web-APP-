import express from "express";

import {
  loginController,
  registerController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);
// LOGIN || METHOD POST
router.post("/login", loginController);

// TEST routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
