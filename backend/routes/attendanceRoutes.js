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

// import express from "express";
// import {
//   markAttendance,
//   getAttendanceByEmployee,
//   getAttendanceSummary,
// } from "../controllers/attendanceController.js";
// import Attendance from "../models/Attendance.js"; // <-- Add this import

// const router = express.Router();

// router.post("/", markAttendance);
// router.get("/summary/:employeeId", getAttendanceSummary); // Put this first!
// router.get("/:employeeId", getAttendanceByEmployee);


// // ✅ NEW: Global stats for dashboard
// router.get("/stats", async (req, res) => {
//   try {
//     const today = new Date().toISOString().substr(0, 10);
//     const presentCount = await Attendance.countDocuments({ date: today, status: "Present" });
//     const absentCount = await Attendance.countDocuments({ date: today, status: "Absent" });
//     const leaveCount = await Attendance.countDocuments({ date: today, status: "Leave" });

//     res.json({
//       present: presentCount,
//       absent: absentCount,
//       leave: leaveCount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch attendance stats", error: err.message });
//   }
// });

// export default router;
