export function calculatePower(voltage: number, current: number) {
  return voltage * current; // watts
}

export function calculateKwh(powerWatts: number, hours: number) {
  return (powerWatts * hours) / 1000;
}

export function calculateCost(kwh: number, tariff: number) {
  return kwh * tariff;
}

export function calculateCurrent(powerWatts: number, voltage: number) {
  if (voltage === 0) return 0;
  return powerWatts / voltage;
}

export function calculateDailyKwh(powerWatts: number) {
  return (powerWatts * 24) / 1000;
}

export function calculateMonthlyKwh(dailyKwh: number) {
  return dailyKwh * 30;
}

export function calculateMonthlyCost(dailyKwh: number, tariff: number) {
  return dailyKwh * 30 * tariff;
}

export function calculateTotalPower(devices: { power: number }[]) {
  return devices.reduce((total, device) => total + device.power, 0);
}

export function calculateTotalKwh(devices: { dailyKwh: number }[]) {
  return devices.reduce((total, device) => total + device.dailyKwh, 0);
}

export function calculateTotalCost(devices: { cost: number }[]) {
  return devices.reduce((total, device) => total + device.cost, 0);
}

export function calculateDevicePercentage(devicePower: number, totalPower: number) {
  if (totalPower === 0) return 0;
  return (devicePower / totalPower) * 100;
}

export function getEnergyStatus(powerWatts: number, limitWatts: number) {
  if (powerWatts >= limitWatts) return "Critical";
  if (powerWatts >= limitWatts * 0.75) return "Warning";
  return "Optimal";
}

export function isVoltageSafe(voltage: number, min = 200, max = 240) {
  return voltage >= min && voltage <= max;
}

export function calculateEfficiencyScore(powerWatts: number, limitWatts: number) {
  if (limitWatts === 0) return 100;

  const score = 100 - (powerWatts / limitWatts) * 100;
  return Math.max(0, Math.min(100, score));
}