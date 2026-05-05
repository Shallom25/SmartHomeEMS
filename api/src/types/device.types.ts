export type DeviceStatus = "ON" | "OFF";

export interface Device {
  id: string;
  name: string;
  room: string;
  status: DeviceStatus;
  voltage: number;
  current: number;
  power: number;
}