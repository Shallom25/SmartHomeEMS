import { useCallback, useState } from "react";
import {
  calculateDailyKwh,
  getEnergyStatus,
} from "@/utils/calculations";

const MOCK_ENERGY = {
  voltage: 220,
  current: 2.5,
  tariff: 250,
  limitWatts: 2000,
};

export function useEnergy() {
  const [refreshing, setRefreshing] = useState(false);

  const power = MOCK_ENERGY.voltage * MOCK_ENERGY.current;
  const dailyKwh = calculateDailyKwh(power);
  const cost = dailyKwh * MOCK_ENERGY.tariff;
  const status = getEnergyStatus(power, MOCK_ENERGY.limitWatts);

  const energy = {
    power,
    voltage: MOCK_ENERGY.voltage,
    current: MOCK_ENERGY.current,
    dailyKwh,
    cost,
    status,
  };

  const refresh = useCallback(async () => {
    setRefreshing(true);

    // Later: call Express API here
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  return {
    energy,
    refreshing,
    refresh,
  };
}