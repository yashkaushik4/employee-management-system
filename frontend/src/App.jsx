import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";
import Salaries from "./pages/Salaries";
import Leaves from "./pages/Leaves";
import AttendancePage from "./pages/AttendancePage";
import HomePage from "./pages/HomePage";


import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";

const App = () => {
  const token = Cookies.get("token");

  return (
    <Router>
      <Routes>
        {/* Smart Home Route (only change made) */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <HomePage />
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Dashboard />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Employees Route */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Employees />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Salaries Route */}
        <Route
          path="/salaries"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Salaries />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Leaves Route */}
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Leaves />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Attendance Route */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <AttendancePage />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        


        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
