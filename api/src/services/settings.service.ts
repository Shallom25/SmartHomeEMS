import { settings } from "../data/settings.data.js";
import type { Settings } from "../types/settings.types.js";

export function getSettings(): Settings {
  return settings;
}

export function updateSettings(
  newSettings: Partial<Settings>
): Settings {
  Object.assign(settings, newSettings);

  return settings;
}