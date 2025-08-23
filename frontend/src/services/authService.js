import api from "./api"; // Axios instance

// Login User
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Register User
export const registerUser = async (email, password, role) => {
  const response = await api.post("/auth/register", { email, password, role });
  return response.data;
};

// Logout
export const logoutUser = async () => {
  await api.post("/auth/logout");
};
