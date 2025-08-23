import api from "./api";

// GET all employees
export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

// POST new employee
export const addEmployee = async (employee) => {
  const res = await api.post("/employees", employee);
  return res.data;
};

// PUT update employee
export const updateEmployee = async (id, data) => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};

// DELETE employee
export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};
