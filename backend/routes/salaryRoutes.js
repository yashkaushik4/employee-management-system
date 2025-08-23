import express from "express";
import { addSalary, getSalaries } from "../controllers/salaryController.js";

const router = express.Router();

router.get("/", getSalaries);
router.post("/", addSalary);

export default router;
