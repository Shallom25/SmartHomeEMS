export interface Energy {
  voltage: number;
  current: number;
  power: number;
  dailyKwh: number;
  cost: number;
  status: "Optimal" | "Warning" | "Critical";
}