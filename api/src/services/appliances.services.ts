
import type { Appliance } from "../types/appliance.types.js";
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



const getConnectedAppliances = (appliances: Appliance[]): Appliance[] => appliances;

const getActiveAppliances = (appliances: Appliance[]): Appliance[] =>
  appliances.filter((d) => d.status === "ON");

const getInactiveAppliances = (appliances: Appliance[]): Appliance[] =>
  appliances.filter((d) => d.status === "OFF");

const getApplianceDetails = (
  appliances: Appliance[],
  applianceId: string,
): Appliance | undefined => appliances.find((d) => d.id === applianceId);

const getDailyUsage = (appliances: Appliance[], applianceId: string): number => {
  const appliance = appliances.find((d) => d.id === applianceId);
  if (!appliance) return 0;
  return calculateDailyKwh(appliance.power);
};

const getDaillyCost = (appliances: Appliance[], applianceId: string, tarrif : number): number => {
  const appliance = appliances.find((d) => d.id === applianceId);
  if (!appliance) return 0;
  return calculateCost(calculateDailyKwh(appliance.power), tarrif);
};

const getAppliancePower = (appliances: Appliance[], applianceId: string): number => {
  const appliance = appliances.find((d) => d.id === applianceId);
  if (!appliance) return 0;
  return calculatePower(appliance.voltage, appliance.current)
};

const getAppliancesConsumption = (appliances : Appliance[]) => {
  return appliances.map((appliance) =>({
    applianceName : appliance.name,
    dailyKwh : calculateDailyKwh(appliance.power)
  }))
}

const getHourlyConsumption = (appliances: Appliance[]) => {

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

  const totalPower = appliances.reduce((sum, d) => {
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

export { getActiveAppliances, getConnectedAppliances, getDaillyCost, getDailyUsage, getApplianceDetails, getAppliancePower, getInactiveAppliances, getAppliancesConsumption, getHourlyConsumption }