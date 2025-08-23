import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import moment from "moment";

// ✅ MARK ATTENDANCE
export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const exists = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (exists) {
      return res.status(400).json({ message: "Attendance already marked." });
    }

    // Check for approved leave
    const approvedLeave = await Leave.findOne({
      employee: employeeId,
      status: "Approved",
      from: { $lte: new Date(date) },
      to: { $gte: new Date(date) },
    });

    if (approvedLeave && status !== "Leave") {
      return res.status(400).json({ message: "Employee is on approved leave." });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

// ✅ GET ALL ATTENDANCE FOR EMPLOYEE
export const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const attendance = await Attendance.find({
      employee: employeeId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const leaveRecords = await Leave.find({
      employee: employeeId,
      status: "Approved",
      from: { $lte: endOfMonth },
      to: { $gte: startOfMonth },
    });

    const attendanceMap = {};
    attendance.forEach((record) => {
      const key = new Date(record.date).toDateString();
      attendanceMap[key] = { ...record._doc, status: record.status };
    });

    leaveRecords.forEach((leave) => {
      let current = new Date(leave.from);
      while (current <= leave.to) {
        const key = current.toDateString();
        if (!attendanceMap[key]) {
          attendanceMap[key] = {
            _id: `leave-${current.getTime()}`,
            date: new Date(current),
            status: "Leave",
          };
        }
        current.setDate(current.getDate() + 1);
      }
    });

    const allRecords = Object.values(attendanceMap).sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(allRecords);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
};

// ✅ GET SUMMARY
export const getAttendanceSummary = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const records = await Attendance.find({ employee: employeeId });

    const summary = {
      Present: 0,
      Absent: 0,
      Leave: 0,
    };

    records.forEach((record) => {
      if (summary[record.status] !== undefined) {
        summary[record.status]++;
      }
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

// ✅ GET TODAY STATS
export const getTodayAttendanceStats = async (req, res) => {
  try {
    const today = moment().startOf("day").toDate();
    const tomorrow = moment(today).add(1, "days").toDate();

    const todayRecords = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    });

    const stats = {
      present: 0,
      absent: 0,
      leave: 0,
    };

    todayRecords.forEach((record) => {
      if (record.status === "Present") stats.present++;
      else if (record.status === "Absent") stats.absent++;
      else if (record.status === "Leave") stats.leave++;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch today's attendance stats" });
  }
};

// ✅ AUTO MARK LEAVES IN ATTENDANCE
export const syncApprovedLeavesToAttendance = async () => {
  const today = moment().startOf("day");
  const tomorrow = moment(today).add(1, "days");

  const approvedLeaves = await Leave.find({
    status: "Approved",
    from: { $lte: tomorrow.toDate() },
    to: { $gte: today.toDate() },
  });

  for (const leave of approvedLeaves) {
    const exists = await Attendance.findOne({
      employee: leave.employee,
      date: {
        $gte: today.toDate(),
        $lte: tomorrow.toDate(),
      },
    });

    if (!exists) {
      await Attendance.create({
        employee: leave.employee,
        date: today.toDate(),
        status: "Leave",
      });
    }
  }
};