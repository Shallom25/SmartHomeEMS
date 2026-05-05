import type { Alert } from "../types/alert.types.js";
import type { Device } from "../types/device.types.js";
import type { Energy } from "../types/energy.types.js";

type AlertLevel = "info" | "warning" | "danger";

const POWER_LIMIT = 2000;
const COST_LIMIT = 3000;
const MIN_VOLTAGE = 200;
const MAX_VOLTAGE = 240;

function createAlert(
  title: string,
  message: string,
  device: string,
  level: AlertLevel
): Alert {
  return {
    id: crypto.randomUUID(),
    title,
    message,
    device,
    level,
    createdAt: new Date().toISOString(),
  };
}

export function generateAlerts(
  devices: Device[],
  energy: Energy
): Alert[] {
  const alerts: Alert[] = [];

  // 1. System power alert
  if (energy.power >= POWER_LIMIT) {
    alerts.push(
      createAlert(
        "High Power Usage",
        "Total system power exceeded safe limit.",
        "System",
        "danger"
      )
    );
  }

  // 2. Cost alert
  if (energy.cost >= COST_LIMIT) {
    alerts.push(
      createAlert(
        "Cost Threshold Warning",
        "Estimated cost is above configured limit.",
        "System",
        "warning"
      )
    );
  }

  // 3. Voltage safety
  if (energy.voltage < MIN_VOLTAGE || energy.voltage > MAX_VOLTAGE) {
    alerts.push(
      createAlert(
        "Voltage Issue",
        "Voltage is outside safe operating range.",
        "Main Supply",
        "danger"
      )
    );
  } else {
    alerts.push(
      createAlert(
        "Voltage Stable",
        "Voltage is within safe range.",
        "Main Supply",
        "info"
      )
    );
  }

  // 4. Device-level alerts
  devices.forEach((device) => {
    if (device.power > 1000) {
      alerts.push(
        createAlert(
          "High Device Consumption",
          `${device.name} is consuming high power.`,
          device.name,
          "warning"
        )
      );
    }

    if (device.status === "OFF" && device.power > 0) {
      alerts.push(
        createAlert(
          "Inconsistent State",
          `${device.name} is OFF but drawing power.`,
          device.name,
          "danger"
        )
      );
    }
  });

  return alerts;
}