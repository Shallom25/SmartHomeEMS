import { Router } from "express";

import { connectedDevices, deviceDetails, disconnectedDevices, devicesConsumption } from "../controllers/devices.controller.js";

const router = Router();

router.get("/connected-devices", connectedDevices);
router.get("/device-details/:id", deviceDetails);
router.get("/disconnected-devices", disconnectedDevices);
router.get("/device-consumption", devicesConsumption )

export default router;