import api from "./api";

// Get all salaries
export const getSalaries = async () => {
  const res = await api.get("/salaries");
  return res.data;
};

// Add a new salary
export const addSalary = async (data) => {
  const res = await api.post("/salaries", data);
  return res.data;
};
