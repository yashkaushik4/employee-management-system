import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import Leave from "../models/Leave.js";

export const getDashboardStats = async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const totalLeaves = await Leave.countDocuments();
  const salaries = await Salary.find();

  const totalSalariesPaid = salaries.reduce((sum, sal) => sum + sal.amount, 0);

  res.json({
    totalEmployees,
    totalSalariesPaid,
    totalLeaves,
  });
};
