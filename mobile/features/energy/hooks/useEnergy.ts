import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import { calculateDailyKwh, getEnergyStatus } from "@/utils/calculations";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useEnergy = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [energy, setEnergy] = useState({
    sourceReading: {
      sourceVoltage: 0,
      sourceCurrent: 0,
    },
    totalPower: 0,
    totalDailyUsage: 0,
    totalDeviceLoadKw: 0,
    totalCurrent: 0,
    highestDevice: "",
    estimatedCost: 0,
    status: "Loading",
    peakPower: {
      id: "",
      name: "",
      room: "",
      status: "",
      currentType: "",
      voltage: 0,
      current: 0,
      power: 0,
      activeHours: 0,
    },
    hourlyUsage: [{
      time : "6AM",
      value : 5
    }]
  });

  const loadEnergy = useCallback(async () => {
    try {
      if (!API_URL) {
        console.log("NO API URL FOUND");
        return;
      }

      const response = await axios.get(`${API_URL}/energy/energy-data`);

      console.log("FULL RESPONSE:", response);
      console.log("DATA:", response.data);

      setEnergy(response.data);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  }, []);

  useEffect(() => {
    loadEnergy();
  }, [loadEnergy]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await loadEnergy();

    setRefreshing(false);
  }, [loadEnergy]);

  return {
    energy,
    refreshing,
    refresh,
  };
};

export { useEnergy };