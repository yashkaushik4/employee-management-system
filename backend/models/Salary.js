import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Salary", salarySchema);
