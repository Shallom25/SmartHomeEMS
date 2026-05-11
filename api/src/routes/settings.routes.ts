import { Router } from "express";

import {
  getSystemSettings,
  updateSystemSettings,
} from "../controllers/settings.controller.js";

const router = Router();

router.get("/get-settings", getSystemSettings);

router.patch("/update-settings", updateSystemSettings);

export default router;