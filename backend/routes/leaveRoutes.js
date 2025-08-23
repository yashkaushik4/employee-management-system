// Leave routes
import express from "express";
import {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/", applyLeave);
router.get("/", getLeaves);

// ✅ This enables approval/rejection
router.put("/:id/status", updateLeaveStatus);

export default router;
