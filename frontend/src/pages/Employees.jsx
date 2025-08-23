import React, { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    // Note: The original logic is preserved.
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await addEmployee(formData);
      }
      setFormData(initialForm);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Failed to submit employee data:", error);
    }
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    // Note: The original logic is preserved.
    try {
      await deleteEmployee(id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete employee:", error);
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
        Employee Management
      </h2>
      
      <motion.form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700"
        variants={formSectionVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.input
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-teal-500 text-gray-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          whileTap={{ scale: 0.98 }}
        >
          {editingId ? (
            <>
              <Pencil className="h-5 w-5" />
              <span>Update Employee</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add Employee</span>
            </>
          )}
        </motion.button>
      </motion.form>
      
      <motion.div
        className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
        variants={tableVariants}
      >
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-3 text-white">Name</th>
              <th className="px-4 py-3 text-white">Email</th>
              <th className="px-4 py-3 text-white">Department</th>
              <th className="px-4 py-3 text-white">Phone</th>
              <th className="px-4 py-3 text-white">Designation</th>
              <th className="px-4 py-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id} className="border-t border-gray-700 even:bg-gray-900">
                  <td className="p-4">{emp.name}</td>
                  <td className="p-4">{emp.email}</td>
                  <td className="p-4">{emp.department}</td>
                  <td className="p-4">{emp.phone}</td>
                  <td className="p-4">{emp.designation}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-yellow-500 text-gray-900 font-semibold px-3 py-2 rounded-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105 flex items-center space-x-1"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-400 transition-colors duration-300 transform hover:scale-105 flex items-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Employees;
