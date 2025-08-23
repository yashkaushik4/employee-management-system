import React, { useEffect, useState } from "react";
import api from "../services/api"; // Axios instance
import { motion } from "framer-motion";

const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState(null);

  // Show toast/message
  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else if (res.data?.employees) {
          setEmployees(res.data.employees);
        } else {
          showMessage("Unexpected response for employees.", "error");
        }
      } catch (err) {
        console.error(err);
        showMessage("Failed to load employees.", "error");
      }
    };
    fetchEmployees();
  }, []);

  // Fetch attendance for selected employee
  const fetchAttendanceRecords = async (empId) => {
    if (!empId) return setAttendanceRecords([]);

    try {
      const res = await api.get(`/attendance/${empId}`);
      setAttendanceRecords(res.data || []);
    } catch (err) {
      console.error(err);
      showMessage("Failed to fetch attendance history.", "error");
      setAttendanceRecords([]);
    }
  };

  // When employee is selected
  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    fetchAttendanceRecords(empId);
  };

  // Mark attendance
  const handleMarkAttendance = async () => {
    if (!selectedEmployee) {
      return showMessage("Please select an employee.", "error");
    }

    try {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      await api.post("/attendance/mark", {
        employeeId: selectedEmployee,
        date: normalizedDate,
        status,
      });

      showMessage("Attendance marked!");
      fetchAttendanceRecords(selectedEmployee);
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.message || "Error marking attendance.", "error");
    }
  };

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

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-gray-200 p-8 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
        Attendance Management
      </h2>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-4 text-center ${
            message.type === "success"
              ? "bg-green-800 text-green-200"
              : "bg-red-800 text-red-200"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <motion.div 
        className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
        variants={formSectionVariants}
      >
        <h3 className="text-xl font-bold mb-4 text-white">Mark Attendance</h3>
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Employee:</label>
          <select
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
            value={selectedEmployee}
            onChange={handleEmployeeChange}
          >
            <option value="" className="text-gray-500">-- Select --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="date"
            className="flex-grow border p-3 rounded-lg bg-gray-900 border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="flex-grow border p-3 rounded-lg bg-gray-900 border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>

          <button
            className="flex-shrink-0 bg-teal-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105"
            onClick={handleMarkAttendance}
          >
            Mark
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
        variants={tableVariants}
      >
        <h3 className="text-xl font-bold mb-4 text-white">Attendance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-lg overflow-hidden text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="border-b border-gray-700 px-4 py-3 text-white">Date</th>
                <th className="border-b border-gray-700 px-4 py-3 text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((rec, index) => (
                  <tr key={rec._id || index} className="even:bg-gray-900">
                    <td className="border-b border-gray-700 px-4 py-3">
                      {new Date(rec.date).toLocaleDateString()}
                    </td>
                    <td className="border-b border-gray-700 px-4 py-3">{rec.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="border-b border-gray-700 px-4 py-3 text-center text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendancePage;
