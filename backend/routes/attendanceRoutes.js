import express from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
  getAttendanceSummary,
  getTodayAttendanceStats,
  syncApprovedLeavesToAttendance // ✅ Import new controller
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/stats", getTodayAttendanceStats); // ✅ BEFORE ":employeeId"
router.get("/:employeeId", getAttendanceByEmployee);
router.get("/summary/:employeeId", getAttendanceSummary);
router.get("/sync-leaves", async (req, res) => {
  await syncApprovedLeavesToAttendance();
  res.json({ message: "Synced approved leaves to attendance." });
});
 // ✅ Add new route

export default router;
