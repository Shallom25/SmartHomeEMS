import type { Alert } from "../types/alert.types.js";
import type { Device } from "../types/device.types.js";
import type { Energy } from "../types/energy.types.js";
import { settings } from "../data/settings.data.js";

type AlertLevel = "info" | "warning" | "danger";


let Critical = 0;
let warning = 0;

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
  if (energy.power >= settings.powerLimit) {
    alerts.push(
      createAlert(
        "High Power Usage",
        "Total system power exceeded safe limit.",
        "System",
        "danger"
      )
    );
    Critical += 1;
  }

  // 2. Cost alert
  if (energy.cost >= settings.costLimit) {
    alerts.push(
      createAlert(
        "Cost Threshold Warning",
        "Estimated cost is above configured limit.",
        "System",
        "warning"
      )
    );
    warning += 1;
  }

  // 3. Voltage safety
  if (energy.voltage < settings.minVoltage || energy.voltage > settings.maxVoltage) {
    alerts.push(
      createAlert(
        "Voltage Issue",
        "Voltage is outside safe operating range.",
        "Main Supply",
        "danger"
      )
    );
    Critical += 1;
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