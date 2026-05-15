import type { Settings } from "../types/settings.types.js";

export let settings: Settings = {
  simulationMode: true,

  costLimit : 3000,

  tariff: 250,

  powerLimit: 2000,
  
  minVoltage: 200,
  maxVoltage: 240,
};