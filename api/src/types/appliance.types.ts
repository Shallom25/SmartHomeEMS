export type ApplianceStatus = "ON" | "OFF";
export type CurrentType = "AC" | "DC";

export interface Appliance {
  id: string;
  name: string;
  room: string;
  status: ApplianceStatus;
  currentType: CurrentType;
  voltage: number;
  current: number;
  power: number;
  activeHours: number;
}