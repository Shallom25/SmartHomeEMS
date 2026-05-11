export type DeviceStatus = "ON" | "OFF";
export type CurrentType = "AC" | "DC";

export interface Device {
  id: string;
  name: string;
  room: string;
  status: DeviceStatus;
  currentType: CurrentType;
  voltage: number;
  current: number;
  power: number;
  activeHours: number;
}