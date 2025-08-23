import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  designation: String,
}, {
  timestamps: true
});

export default mongoose.model("Employee", employeeSchema);
