import { Appliance } from "./appliance.types.js";

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

export type HourlyUsagePoint = {
  time: string;
  value: number;
};

export type HourlyUsage = HourlyUsagePoint[];



export type VoltageStatus =
  | "Low Voltage"
  | "Normal Voltage"
  | "High Voltage";

export type EnergyAnalytics = {
  sourceReading: SourceReading;

  voltageStatus: VoltageStatus;

  totalPower: number;

  totalApplianceLoadKw: number;

  totalCurrent: number;

  estimatedCost: number;

  totalDailyUsage: number;

  peakPower: Appliance | null;

  highestAppliance: string;

  status: string;

    hourlyUsage: HourlyUsage;
};