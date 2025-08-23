import React, { useEffect, useState } from "react";
import { applyLeave, getLeaves, updateLeaveStatus } from "../services/leaveService";
import { getEmployees } from "../services/employeeService";
import { motion } from "framer-motion";
import { Plus, CheckCircle, XCircle } from "lucide-react";

const initialForm = {
  employee: "",
  type: "Sick",
  fromDate: "",
  toDate: "",
  reason: "",
};

const Leaves = () => {
  const [formData, setFormData] = useState(initialForm);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empData, leaveData] = await Promise.all([
        getEmployees(),
        getLeaves(),
      ]);
      setEmployees(empData);
      setLeaves(leaveData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      setFormData(initialForm);
      loadData();
    } catch (error) {
      console.error("Failed to apply for leave:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      loadData();
    } catch (error) {
      console.error("Failed to update leave status:", error);
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
        Leave Management
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
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 text-gray-400"
            required
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

          <motion.select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 text-gray-400"
            required
            variants={inputVariants}
            whileFocus="focus"
          >
            <option value="Sick">Sick</option>
            <option value="Casual">Casual</option>
            <option value="Paid">Paid</option>
            <option value="Other">Other</option>
          </motion.select>

          <motion.input
            type="date"
            value={formData.fromDate}
            onChange={(e) =>
              setFormData({ ...formData, fromDate: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
            required
            variants={inputVariants}
            whileFocus="focus"
          />

          <motion.input
            type="date"
            value={formData.toDate}
            onChange={(e) =>
              setFormData({ ...formData, toDate: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
            required
            variants={inputVariants}
            whileFocus="focus"
          />

          <motion.input
            type="text"
            placeholder="Reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            className="col-span-2 w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-teal-500 text-gray-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-5 w-5" />
          <span>Apply for Leave</span>
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
              <th className="px-4 py-3 text-white">Type</th>
              <th className="px-4 py-3 text-white">From</th>
              <th className="px-4 py-3 text-white">To</th>
              <th className="px-4 py-3 text-white">Status</th>
              <th className="px-4 py-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave._id} className="border-t border-gray-700 even:bg-gray-900">
                  <td className="p-4">{leave.employee?.name}</td>
                  <td className="p-4">{leave.type}</td>
                  <td className="p-4">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        leave.status === "Pending"
                          ? "bg-yellow-800 text-yellow-200"
                          : leave.status === "Approved"
                          ? "bg-green-800 text-green-200"
                          : "bg-red-800 text-red-200"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    {leave.status === "Pending" && (
                      <>
                        <button
                          className="bg-green-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300 transform hover:scale-105 flex items-center space-x-1"
                          onClick={() => handleStatusChange(leave._id, "Approved")}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          className="bg-red-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300 transform hover:scale-105 flex items-center space-x-1"
                          onClick={() => handleStatusChange(leave._id, "Rejected")}
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No leave applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Leaves;
