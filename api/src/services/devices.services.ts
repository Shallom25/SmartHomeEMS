
import type { Device } from "../types/device.types.js";
import { calculateDailyKwh, calculateCost, calculatePower } from "../utils/calculations.js";



const slots = [
  { time: "6AM", start: 6 },
  { time: "9AM", start: 9 },
  { time: "12PM", start: 12 },
  { time: "3PM", start: 15 },
  { time: "6PM", start: 18 },
  { time: "9PM", start: 21 },
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
      return slots[i].time;
    }
  }

  return "6AM";
};



const getConnectedDevices = (devices: Device[]): Device[] => devices;

const getActiveDevices = (devices: Device[]): Device[] =>
  devices.filter((d) => d.status === "ON");

const getInactiveDevices = (devices: Device[]): Device[] =>
  devices.filter((d) => d.status === "OFF");

const getDeviceDetails = (
  devices: Device[],
  deviceId: string,
): Device | undefined => devices.find((d) => d.id === deviceId);

const getDailyUsage = (devices: Device[], deviceId: string): number => {
  const device = devices.find((d) => d.id === deviceId);
  if (!device) return 0;
  return calculateDailyKwh(device.power);
};

const getDaillyCost = (devices: Device[], deviceId: string, tarrif : number): number => {
  const device = devices.find((d) => d.id === deviceId);
  if (!device) return 0;
  return calculateCost(calculateDailyKwh(device.power), tarrif);
};

const getDevicePower = (devices: Device[], deviceId: string): number => {
  const device = devices.find((d) => d.id === deviceId);
  if (!device) return 0;
  return calculatePower(device.voltage, device.current)
};

const getDevicesConsumption = (devices : Device[]) => {
  return devices.map((device) =>({
    deviceName : device.name,
    dailyKwh : calculateDailyKwh(device.power)
  }))
}

const getHourlyConsumption = (devices: Device[]) => {

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
  const currentSlotIndex = slots.findIndex(s => s.time === currentSlot);

  const totalPower = devices.reduce((sum, d) => {
    if (d.status !== "ON") return sum;
    return sum + d.power;
  }, 0);

  const kwh = (totalPower * deltaHours) / 1000;

  for (let i = 0; i <= currentSlotIndex; i++) {
    slotEnergy[slots[i].time] += kwh / (currentSlotIndex + 1);
  }

  return Object.entries(slotEnergy).map(([label, value]) => ({
    label,
    value: Number(value.toFixed(2)),
  }));
};

export { getActiveDevices, getConnectedDevices, getDaillyCost, getDailyUsage, getDeviceDetails, getDevicePower, getInactiveDevices, getDevicesConsumption, getHourlyConsumption }