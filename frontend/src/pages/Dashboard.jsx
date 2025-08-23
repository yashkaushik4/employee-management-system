import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getDashboardStats } from "../services/dashboardService";
import { motion } from "framer-motion";
// Importing icons for the stats cards
import { Users, DollarSign, CalendarDays, TrendingUp, CircleCheck, CircleX } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    totalSalariesPaid: 0,
  });

  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [summary, setSummary] = useState({ Present: 0, Absent: 0, Leave: 0 });

  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    leave: 0,
  });

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchSummary = async (id) => {
    try {
      const res = await api.get(`/attendance/summary/${id}`);
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching employee summary:", error);
    }
  };

  const fetchAttendanceStats = async () => {
    try {
      const res = await api.get("/attendance/stats");
      setAttendanceStats(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchEmployees();
    fetchAttendanceStats();
  }, []);

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    setSelectedEmp(empId);
    if (empId) {
      fetchSummary(empId);
    } else {
      setSummary({ Present: 0, Absent: 0, Leave: 0 });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-200 p-8 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
        Dashboard Overview
      </h2>

      {/* Main Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        variants={cardVariants}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
          <Users className="h-12 w-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">Total Employees</h3>
          <p className="text-3xl font-bold mt-2 text-white">{stats.totalEmployees}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
          <DollarSign className="h-12 w-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">Total Salaries Paid</h3>
          <p className="text-3xl font-bold mt-2 text-white">₹ {stats.totalSalariesPaid.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
          <CalendarDays className="h-12 w-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">Total Leave Requests</h3>
          <p className="text-3xl font-bold mt-2 text-white">{stats.totalLeaves}</p>
        </div>
      </motion.div>

      {/* Today's Attendance Stats */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-white">
          <TrendingUp className="inline-block mr-2 text-teal-400" /> Today's Attendance Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            className="bg-gray-800 border border-green-700 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <h3 className="text-sm font-semibold text-green-400">Present</h3>
            <p className="text-2xl font-bold text-white">{attendanceStats.present}</p>
          </motion.div>
          <motion.div
            className="bg-gray-800 border border-yellow-700 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <h3 className="text-sm font-semibold text-yellow-400">On Leave</h3>
            <p className="text-2xl font-bold text-white">{attendanceStats.leave}</p>
          </motion.div>
          <motion.div
            className="bg-gray-800 border border-red-700 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <h3 className="text-sm font-semibold text-red-400">Absent</h3>
            <p className="text-2xl font-bold text-white">{attendanceStats.absent}</p>
          </motion.div>
        </div>
      </div>

      {/* Employee-Specific Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Employee Attendance Summary</h2>
        <div className="mb-4">
          <label className="font-medium block mb-2">Select Employee</label>
          <select
            value={selectedEmp}
            onChange={handleEmployeeSelect}
            className="w-full max-w-sm px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
          >
            <option value="" className="text-gray-500">-- Select --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <CircleCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Present</p>
            <h3 className="text-xl font-bold text-white">{summary.Present}</h3>
          </motion.div>
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <CalendarDays className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Leave</p>
            <h3 className="text-xl font-bold text-white">{summary.Leave}</h3>
          </motion.div>
          <motion.div
            className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 text-center transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <CircleX className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Absent</p>
            <h3 className="text-xl font-bold text-white">{summary.Absent}</h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
