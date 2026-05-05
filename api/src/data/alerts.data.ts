import type { Alert } from "../types/alert.types.js";

export const alerts: Alert[] = [
  {
    id: "1",
    title: "High Power Usage",
    message: "Air Conditioner is consuming excessive power.",
    device: "Air Conditioner",
    level: "danger",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Voltage Stable",
    message: "Voltage is within safe operating range.",
    device: "Main Supply",
    level: "info",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Cost Warning",
    message: "Daily cost is approaching threshold.",
    device: "System",
    level: "warning",
    createdAt: new Date().toISOString(),
  },
];