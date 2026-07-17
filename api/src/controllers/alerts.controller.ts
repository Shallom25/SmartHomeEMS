import type { Request, Response } from "express";

import { appliances } from "../data/appliances.data.js";
import { getEnergyData } from "../data/energy.data.js";
import { generateAlerts } from "../services/alerts.services.js";

export const getAlerts = (_req: Request, res: Response) => {
  const energy = getEnergyData();

  const alerts = generateAlerts(appliances, energy);

  const criticalCount = alerts.filter((alert) => alert.level === "danger").length;

  const warningCount = alerts.filter((alert) => alert.level === "warning").length;

  res.json({
    summary: {
      critical: criticalCount,
      warnings: warningCount,
      total: alerts.length,
    },
    alerts,
  });
};