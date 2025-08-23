import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import Leave from "../models/Leave.js";

// Get all employees
export const getEmployees = async (req, res) => {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
};

// Add a new employee
export const addEmployee = async (req, res) => {
    const { name, email, department, phone, designation } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: "Employee already exists" });

    const employee = await Employee.create({ name, email, department, phone, designation });
    res.status(201).json(employee);
};

// Update an employee
export const updateEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Delete all related salaries
    await Salary.deleteMany({ employee: employee._id });

    // Delete all related leaves
    await Leave.deleteMany({ employee: employee._id });

    // Delete the employee
    await employee.deleteOne();

    res.json({ message: "Employee and related data deleted successfully" });
};
