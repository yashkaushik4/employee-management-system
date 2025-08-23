import api from "./api";

// GET all leave requests
export const getLeaves = async () => {
  const res = await api.get("/leaves");
  return res.data;
};

// POST apply for leave
export const applyLeave = async (leaveData) => {
  const res = await api.post("/leaves", leaveData);
  return res.data;
};

// PUT update leave status (admin only)
export const updateLeaveStatus = async (id, status) => {
  // ✅ Corrected endpoint from `/leaves/${id}` to `/leaves/${id}/status`
  const res = await api.put(`/leaves/${id}/status`, { status });
  return res.data;
};
