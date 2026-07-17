import { Router } from "express";

import { connectedAppliances, applianceDetails, disconnectedAppliances, appliancesConsumption, hourlyConsumption } from "../controllers/appliances.controller.js";

const router = Router();

router.get("/connected-appliances", connectedAppliances);
router.get("/appliance-details/:applianceId", applianceDetails);
router.get("/disconnected-appliances", disconnectedAppliances);
router.get("/appliances-consumption", appliancesConsumption )

export default router;