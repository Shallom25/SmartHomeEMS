import { Device } from "./device.types.js";

export interface Energy {
  voltage: number;
  current: number;
  power: number;
  dailyKwh: number;
  cost: number;
  status: "Optimal" | "Warning" | "Critical";
}

export interface SourceReading {
  sourceVoltage: number;
  sourceCurrent: number;
}

export type VoltageStatus =
  | "Low Voltage"
  | "Normal Voltage"
  | "High Voltage";

export type EnergyAnalytics = {
  sourceReading: SourceReading;

  voltageStatus: VoltageStatus;

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