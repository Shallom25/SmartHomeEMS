import type { Device } from "../types/device.types.js";
import {
  calculateCurrentHourKwh,
  calculateKwh,
  calculateDailyCost,
} from "../utils/calculations.js";

const currentHour = new Date().getHours(); // 0–23
// const tarrif = 225;

const getHourlyUsage = (devices: Device[], hour: number): number => {
  let totalPower = 0;
  for (const device of devices) {
    totalPower += device.power;
  }
  return calculateCurrentHourKwh(totalPower, hour);
};

const getDeviceConsumption = (
  devices: Device[],
  deviceId: string,
  activeHour: number,
): number => {
  const device = devices.find((d) => d.id === deviceId);
  if (!device) return 0;
  return calculateCurrentHourKwh(device.power, activeHour);
};

const getPeakPower = (devices: { name: string; power: number }[]) => {
  return devices.reduce((peak, device) => {
    return device.power > peak.power ? device : peak;
  }, devices[0]);
};

const getEstimateCost = (
  devices: Device[],
  hour: number,
  tariff: number,
): number => {
  // let estimateCost = 0;
  let totalPower = 0;
  for (const device of devices) {
    totalPower += calculateKwh(device.power, hour);
  }

  return calculateDailyCost(totalPower, tariff);
};
