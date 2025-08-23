import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// Importing icons to match the rest of the application
import {
  LayoutDashboard,
  Users,
  Coins,
  FileText,
  CalendarCheck,
  LogOut,
} from "lucide-react";

const SidebarLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/employees", label: "Employees", icon: Users },
    { path: "/salaries", label: "Salaries", icon: Coins },
    { path: "/leaves", label: "Leaves", icon: FileText },
    { path: "/attendance", label: "Attendance", icon: CalendarCheck },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200 font-sans">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-gray-800 p-6 flex flex-col justify-between shadow-xl border-r border-gray-700"
      >
        <div>
          <Link to="/">
            <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
              &lt;EMS /&gt;
            </h2>
          </Link>
          <nav className="space-y-3">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 group relative
                  ${location.pathname === path
                    ? "bg-gray-700 font-semibold text-teal-400"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-y-0 left-0 w-1 rounded-full bg-teal-500"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <motion.button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-400 hover:text-red-300 px-4 py-2 transition duration-200"
          whileHover={{ x: 5 }}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </motion.button>
      </motion.aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default SidebarLayout;
