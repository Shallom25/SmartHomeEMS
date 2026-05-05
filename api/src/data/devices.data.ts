import type { Device } from "../types/device.types.js";

export const devices: Device[] = [
  {
    id: "fan",
    name: "Smart Fan",
    room: "Living Room",
    status: "ON",
    voltage: 220,
    current: 0.34,
    power: 75,
  },
  {
    id: "bulb",
    name: "LED Bulb",
    room: "Bedroom",
    status: "ON",
    voltage: 220,
    current: 0.08,
    power: 18,
  },
  {
    id: "tv",
    name: "Smart TV",
    room: "Living Room",
    status: "OFF",
    voltage: 0,
    current: 0,
    power: 0,
  },
  {
    id: "fridge",
    name: "Refrigerator",
    room: "Kitchen",
    status: "ON",
    voltage: 220,
    current: 0.82,
    power: 180,
  },
  {
    id: "ac",
    name: "Air Conditioner",
    room: "Bedroom",
    status: "ON",
    voltage: 220,
    current: 5.45,
    power: 1200,
  },
];