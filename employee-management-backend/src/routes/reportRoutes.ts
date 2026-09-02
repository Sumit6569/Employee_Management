import { Router } from "express";
import { getReportsHandler } from "../controllers/reportController.js";

const router = Router();

router.get("/", getReportsHandler);

export default router;
