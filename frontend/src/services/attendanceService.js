// frontend/src/services/attendanceService.js

import axios from "axios";

const API = "/api/attendance";

// ✅ MARK ATTENDANCE
export const markAttendance = async (employeeId, date, status) => {
  const response = await axios.post(`${API}/mark`, {
    employeeId,
    date,
    status,
  });
  return response.data;
};

// ✅ GET ALL ATTENDANCE RECORDS FOR EMPLOYEE
export const getAttendanceByEmployee = async (employeeId) => {
  const response = await axios.get(`${API}/employee/${employeeId}`);
  return response.data;
};

// ✅ GET SUMMARY FOR EMPLOYEE (Present/Absent/Leave counts)
export const getEmployeeAttendanceSummary = async (employeeId) => {
  const response = await axios.get(`${API}/summary/${employeeId}`);
  return response.data;
};

// ✅ GET TODAY'S OVERALL ATTENDANCE (for dashboard)
export const getTodayAttendanceStats = async () => {
  const response = await axios.get(`${API}/today`);
  return response.data;
};
