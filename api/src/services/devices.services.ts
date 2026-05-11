import { devices } from "../data/devices.data.js";
import type { Device } from "../types/device.types.js";
import { calculateDailyKwh, calculateCost, calculatePower } from "../utils/calculations.js";

// const tarrif = 225;

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

export { getActiveDevices, getConnectedDevices, getDaillyCost, getDailyUsage, getDeviceDetails, getDevicePower, getInactiveDevices, getDevicesConsumption }