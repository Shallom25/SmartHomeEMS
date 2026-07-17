import type { Alert } from "../types/alert.types.js";

export const alerts: Alert[] = [
  {
    id: "1",
    title: "High Power Usage",
    message: "Air Conditioner is consuming excessive power.",
    appliance: "Air Conditioner",
    level: "danger",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Voltage Stable",
    message: "Voltage is within safe operating range.",
    appliance: "Main Supply",
    level: "info",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Cost Warning",
    message: "Daily cost is approaching threshold.",
    appliance: "System",
    level: "warning",
    createdAt: new Date().toISOString(),
  },
];