import React, { useEffect, useState } from "react";
import { getSalaries, addSalary } from "../services/salaryService";
import { getEmployees } from "../services/employeeService";
import { motion } from "framer-motion";
import { Plus, Coins } from "lucide-react";

const initialForm = {
  employee: "",
  month: "",
  year: "",
  amount: "",
};

const Salaries = () => {
  const [formData, setFormData] = useState(initialForm);
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empData, salData] = await Promise.all([
        getEmployees(),
        getSalaries(),
      ]);
      setEmployees(empData);
      setSalaries(salData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSalary(formData);
      setFormData(initialForm);
      loadData();
    } catch (error) {
      console.error("Failed to add salary:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const formSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  const inputVariants = {
    focus: { borderColor: "#2dd4bf", boxShadow: "0 0 0 3px rgba(45, 212, 191, 0.5)" },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-200 p-8 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
        Salary Management
      </h2>

      <motion.form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700"
        variants={formSectionVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.select
            value={formData.employee}
            onChange={(e) =>
              setFormData({ ...formData, employee: e.target.value })
            }
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 text-gray-400"
            variants={inputVariants}
            whileFocus="focus"
          >
            <option value="" className="text-gray-500">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </motion.select>

          <motion.input
            type="text"
            placeholder="Month"
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />

          <motion.input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />

          <motion.input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>

        <motion.button
          type="submit"
          className="col-span-2 w-full bg-teal-500 text-gray-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-5 w-5" />
          <span>Add Salary</span>
        </motion.button>
      </motion.form>

      <motion.div
        className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
        variants={tableVariants}
      >
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-3 text-white">Employee</th>
              <th className="px-4 py-3 text-white">Month</th>
              <th className="px-4 py-3 text-white">Year</th>
              <th className="px-4 py-3 text-white">Amount</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length > 0 ? (
              salaries.map((sal) => (
                <tr key={sal._id} className="border-t border-gray-700 even:bg-gray-900">
                  <td className="p-4">{sal.employee?.name}</td>
                  <td className="p-4">{sal.month}</td>
                  <td className="p-4">{sal.year}</td>
                  <td className="p-4">₹ {sal.amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No salary records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Salaries;
