import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

// Add Salary
export const addSalary = async (req, res) => {
  const { employee, month, year, amount } = req.body;

  // Optional: Check if salary already exists for this employee/month/year
  const exists = await Salary.findOne({ employee, month, year });
  if (exists) {
    return res.status(400).json({ message: "Salary already exists for this month" });
  }

  const salary = await Salary.create({ employee, month, year, amount });
  res.status(201).json(salary);
};

// Get All Salaries with employee details
export const getSalaries = async (req, res) => {
  const salaries = await Salary.find().populate("employee").sort({ createdAt: -1 });
  res.json(salaries);
};
