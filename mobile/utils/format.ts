// Number formatting (with commas)
export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Currency (₦ by default)
export function formatCurrency(value: number, currency = "₦") {
  return `${currency}${formatNumber(value, 2)}`;
}

// Power formatting (W / kW auto switch)
export function formatPower(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} kW`;
  }
  return `${formatNumber(value)} W`;
}

// Energy usage (kWh)
export function formatKwh(value: number) {
  return `${value.toFixed(2)} kWh`;
}

// Voltage
export function formatVoltage(value: number) {
  return `${value} V`;
}

// Current
export function formatCurrent(value: number) {
  return `${value.toFixed(2)} A`;
}

// Percentage
export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

// Time formatting (hours → readable)
export function formatHours(hours: number) {
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  return `${hours.toFixed(1)} hrs`;
}

// Compact large numbers (for analytics)
export function formatCompact(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

// Status label formatting
export function formatStatus(status: string) {
  return status.toUpperCase();
}

// Timestamp → readable time
export function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Date → readable
export function formatDate(date: Date) {
  return date.toLocaleDateString();
}