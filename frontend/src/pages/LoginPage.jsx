import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  // Retaining the original imports and context usage
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  // Animation variants from the homepage
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    focus: { borderColor: "#2dd4bf", boxShadow: "0 0 0 3px rgba(45, 212, 191, 0.5)" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 font-sans">
      <motion.form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
          Login to &lt;EMS /&gt;
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-800 text-red-200 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variants={inputVariants}
            whileFocus="focus"
          />

          <motion.input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>

        <motion.button
          type="submit"
          className="mt-6 w-full py-3 bg-teal-500 text-gray-900 font-bold text-lg rounded-lg hover:bg-teal-400 transition-colors duration-300 transform hover:scale-105 shadow-md"
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-400 hover:text-cyan-400 transition-colors duration-300"
          >
            Register here
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
