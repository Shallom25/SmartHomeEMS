import { devices } from "./devices.data.js";
import {
  calculateDailyKwh,
  calculateCost,
  getEnergyStatus,
} from "../utils/calculations.js";
import type { Energy } from "../types/energy.types.js";

const TARIFF = 250;
const LIMIT = 2000;

export function getEnergyData(): Energy {
  const voltage = 220;

  const totalPower = devices.reduce((sum, d) => sum + d.power, 0);
  const totalCurrent = devices.reduce((sum, d) => sum + d.current, 0);

  const dailyKwh = calculateDailyKwh(totalPower);
  const cost = calculateCost(dailyKwh, TARIFF);
  const status = getEnergyStatus(totalPower, LIMIT);

  return {
    voltage,
    current: totalCurrent,
    power: totalPower,
    dailyKwh,
    cost,
    status,
  };
}