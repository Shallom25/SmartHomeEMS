import type { Device } from "../types/device.types.js";
import { settings } from "../data/settings.data.js";
import { EnergyAnalytics } from "../types/energy.types.js";
import { sourceValue } from "../data/energy.data.js";
import { VoltageStatus } from "../types/energy.types.js";

import {
  calculateKwh,
  calculateDailyCost,
  getEnergyStatus,
} from "../utils/calculations.js";

const getVoltageStatus = (): VoltageStatus => {
  if (sourceValue.sourceVoltage < settings.minVoltage) return "Low Voltage";
  if (sourceValue.sourceVoltage > settings.maxVoltage) return "High Voltage";

  return "Normal Voltage";
};

const slots = [
  { label: "6AM", start: 6 },
  { label: "9AM", start: 9 },
  { label: "12PM", start: 12 },
  { label: "3PM", start: 15 },
  { label: "6PM", start: 18 },
  { label: "9PM", start: 21 },
];

const slotEnergy: Record<string, number> = {
  "6AM": 0,
  "9AM": 0,
  "12PM": 0,
  "3PM": 0,
  "6PM": 0,
  "9PM": 0,
};

const getDayKey = () => new Date().toISOString().split("T")[0];

let lastUpdate = Date.now();
let lastResetDate = getDayKey();

const getCurrentSlot = () => {
  const hour = new Date().getHours();

  for (let i = slots.length - 1; i >= 0; i--) {
    if (hour >= slots[i].start) {
      return slots[i].label;
    }
  }

  return "6AM";
};

const computeHourlyUsage = (devices: Device[]) => {
  // RESET DAILY
  if (getDayKey() !== lastResetDate) {
    Object.keys(slotEnergy).forEach((k) => (slotEnergy[k] = 0));
    lastResetDate = getDayKey();
    lastUpdate = Date.now();
  }

  const nowMs = Date.now();

  // SAFE DELTA (prevents spikes)
  const rawDelta = (nowMs - lastUpdate) / (1000 * 60 * 60);
  const deltaHours = Math.min(rawDelta, 0.25);

  lastUpdate = nowMs;

  const currentSlot = getCurrentSlot();
  const currentSlotIndex = slots.findIndex((s) => s.label === currentSlot);

  const totalPower = devices.reduce((sum, d) => {
    if (d.status !== "ON") return sum;
    return sum + d.power;
  }, 0);

  const kwh = (totalPower * deltaHours) / 1000;

  for (let i = 0; i <= currentSlotIndex; i++) {
    slotEnergy[slots[i].label] += kwh / (currentSlotIndex + 1);
  }

  return Object.entries(slotEnergy).map(([time, value]) => ({
    time,
    value: Number(value.toFixed(2)),
  }));
};

export const getEnergyAnalytics = (devices: Device[]): EnergyAnalytics => {
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
  const hourlyUsage = computeHourlyUsage(devices);

  const estimatedCost = calculateDailyCost(totalDailyUsage, settings.tariff);

  const status = getEnergyStatus(totalPower, settings.powerLimit);

  return {
    sourceReading: sourceValue,

    totalPower,

    totalDailyUsage,

    totalDeviceLoadKw,

    totalCurrent,

    highestDevice,

    estimatedCost,

    peakPower,

    voltageStatus: getVoltageStatus(),

    status,

    hourlyUsage,
  };
};
