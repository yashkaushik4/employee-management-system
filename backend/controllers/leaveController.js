import Leave from "../models/Leave.js";

// Add Leave
export const applyLeave = async (req, res) => {
  const { employee, type, fromDate, toDate, reason } = req.body;

  const leave = await Leave.create({
    employee,
    type,
    fromDate,
    toDate,
    reason,
  });

  res.status(201).json(leave);
};

// Get all leaves (with employee info)
export const getLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("employee").sort({ createdAt: -1 });
  res.json(leaves);
};

// Update leave status
export const updateLeaveStatus = async (req, res) => {
  const { status } = req.body;
  const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(leave);
};
