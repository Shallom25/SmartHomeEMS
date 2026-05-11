import { Router } from "express";
import { getEnergyData } from "../controllers/energy.controller.js";

const router = Router();

router.get("/energy-data", getEnergyData);

export default router;