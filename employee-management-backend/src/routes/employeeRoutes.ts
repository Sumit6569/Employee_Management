import express from "express";

import {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/:id", getOneEmployee);

router.post("/", addEmployee);

router.put("/:id", editEmployee);

router.delete("/:id", removeEmployee);

export default router;