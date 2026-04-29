export type Device = {
  id: string;
  name: string;
  room: string;
  status: "ON" | "OFF";
  power: number;
  voltage: number;
  current: number;
};

const MOCK_DEVICES: Device[] = [
  {
    id: "fan",
    name: "Smart Fan",
    room: "Living Room",
    status: "ON",
    power: 75,
    voltage: 220,
    current: 0.34,
  },
  {
    id: "bulb",
    name: "LED Bulb",
    room: "Bedroom",
    status: "ON",
    power: 18,
    voltage: 220,
    current: 0.08,
  },
  {
    id: "tv",
    name: "Smart TV",
    room: "Living Room",
    status: "OFF",
    power: 0,
    voltage: 0,
    current: 0,
  },
  {
    id: "fridge",
    name: "Refrigerator",
    room: "Kitchen",
    status: "ON",
    power: 180,
    voltage: 220,
    current: 0.82,
  },
  {
    id: "ac",
    name: "Air Conditioner",
    room: "Bedroom",
    status: "ON",
    power: 1200,
    voltage: 220,
    current: 5.45,
  },
];

export function useDevices() {
  const devices = MOCK_DEVICES;

  const activeDevices = devices.filter((device) => device.status === "ON").length;

  const totalPower = devices.reduce((total, device) => {
    return total + device.power;
  }, 0);

  return {
    devices,
    activeDevices,
    totalPower,
    totalDevices: devices.length,
  };
}