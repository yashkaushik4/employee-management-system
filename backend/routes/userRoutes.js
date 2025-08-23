import express from "express";
import {
  updateProfile,
  changePassword,
  getUserSettings,
  updateUserSettings,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", updateProfile);
router.put("/change-password", changePassword);
router.get("/settings", getUserSettings);
router.put("/settings", updateUserSettings);

export const userRoutes = router; // ✅ Named export
