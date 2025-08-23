import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
// Importing icons for the feature section
import { Users, Calendar, DollarSign, Clock } from "lucide-react";

const HomePage = () => {
  const token = Cookies.get("token");

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const mainVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
  };
  
  const featureCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  useEffect(() => {
    // You can add logic here for more dynamic effects, if needed.
  }, []);

  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Onboard, manage, and track all employee profiles in a centralized database."
    },
    {
      icon: Calendar,
      title: "Attendance Tracking",
      description: "Effortlessly log and monitor employee attendance with real-time updates."
    },
    {
      icon: DollarSign,
      title: "Payroll & Salary",
      description: "Automate salary calculations and generate detailed payroll reports with ease."
    },
    {
      icon: Clock,
      title: "Leave Management",
      description: "Streamline leave requests, approvals, and tracking for all employees."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <motion.header
        className="bg-gray-800 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-teal-400 font-mono tracking-wide">
            &lt;EMS /&gt;
          </h1>
          </Link>
          <nav className="space-x-6 flex items-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
                <Link
                  to="/logout"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300 relative group"
                >
                  Register
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
                <Link
                  to="/login"
                  className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </motion.header>

      <main className="flex-grow flex flex-col justify-center items-center text-center px-8 relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-gray-900 to-gray-900 animate-pulse-slow"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            className="text-6xl font-extrabold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 leading-tight"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Welcome to <br /> EMS.
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Your streamlined solution for efficient employee management, all in one intuitive platform.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={buttonVariants}>
            {token ? (
              <Link
                to="/dashboard"
                className="bg-teal-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-teal-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Login to Get Started
              </Link>
            )}
          </motion.div>
        </div>
      </main>

      <section className="bg-gray-800 py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Powerful Features, Simplified</h3>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            EMS is built with everything you need to manage your workforce
            efficiently, all in one intuitive platform.
          </p>
          {/* Updated grid layout below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700 hover:border-teal-500 transition-colors duration-300 cursor-pointer"
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="h-12 w-12 text-teal-400 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 shadow-inner py-6 text-center border-t border-gray-700">
        <p className="text-sm text-gray-500">
          Credits - {" "}
          <a
            href="https://www.linkedin.com/in/yash-kaushik4/"
            className="text-teal-400 hover:text-teal-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yash Kaushik
          </a>{" "}
          |
          <a
            href="https://github.com/yashkaushik4"
            className="ml-2 text-teal-400 hover:text-teal-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
