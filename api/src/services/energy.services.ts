import type { Device } from "../types/device.types.js";
import { settings } from "../data/settings.data.js";

import {
  calculateCurrentHourKwh,
  calculateKwh,
  calculateDailyCost,
  getEnergyStatus,
} from "../utils/calculations.js";

const TARIFF = 250;
const LIMIT = 2000;

export type EnergyAnalytics = {
  totalPower: number;

  totalDeviceLoadKw: number;

  totalCurrent: number;

  hourlyUsage: number;

  estimatedCost: number;

  totalDailyUsage: number;

  peakPower: Device | null;

  highestDevice: string;

  status: string;
};

export const getEnergyAnalytics = (
  devices: Device[]
): EnergyAnalytics => {
  let totalPower = 0;

  let totalCurrent = 0;

  let totalDailyUsage = 0;

  let totalActiveHours = 0;

  let peakPower: Device | null = null;

  let highestDevice: string = "";

  for (const device of devices) {
    const deviceUsage = calculateKwh(device.power, device.activeHours);

    totalActiveHours += device.activeHours;

    totalDailyUsage += deviceUsage;
    // total power
    totalPower += device.power;

    // total current
    totalCurrent += device.current;

    // peak power
    if (!peakPower || device.power > peakPower.power) {
      peakPower = device;
      highestDevice = peakPower.currentType;
    }
  }

  // total load in kW
  const totalDeviceLoadKw = totalPower / 1000;

  // derived calculations
  const hourlyUsage = calculateCurrentHourKwh(totalPower, totalActiveHours);

  const estimatedCost = calculateDailyCost(totalDailyUsage, settings.tariff);

  const status = getEnergyStatus(totalPower, settings.powerLimit);

  return {
    totalPower,

    totalDailyUsage,

    totalDeviceLoadKw,

    totalCurrent,

    hourlyUsage,

    highestDevice,

    estimatedCost,

    peakPower,

    status,
  };
};
