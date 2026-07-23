import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ApplianceSummary = {
  id: string;
  name: string;
  room: string;
  status: string;
  power: number;
  voltage: number;
  current: number;
};

type ApplianceDetails = {
  id: string;
  name: string;
  room: string;
  status: string;
  currentType: string;
  voltage: number;
  current: number;
  power: number;
  activeHours: number;
  dailyUsage: number;
  dailyCost: number;
};

type ApplianceConsumption = {
  applianceName: string;
  dailyKwh: number;
};

const useAppliances = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [appliances, setAppliances] = useState<ApplianceSummary[]>([
    {
      id: "",
      name: "",
      room: "",
      status: "",
      power: 0,
      voltage: 0,
      current: 0,
    },
  ]);

  const loadAppliances = useCallback(async () => {
    try {
      if (!API_URL) {
        return;
      }

      const response = await axios.get(`${API_URL}/appliances/connected-appliances`);
      setAppliances(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    loadAppliances();
  }, [loadAppliances]);

  const activeAppliances = appliances.filter(
    (appliance) => appliance.status === "ON",
  ).length;

  const totalPower = appliances.reduce((total, appliance) => {
    return total + appliance.power;
  }, 0);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadAppliances();
    setRefreshing(false);
  }, [loadAppliances]);

  return {
    appliances,
    activeAppliances,
    totalPower,
    totalAppliances: appliances.length,
    refresh,
    refreshing,
  };
};

const useApplianceDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [applianceDetails, setApplianceDetails] = useState<ApplianceDetails>({
    id: "",
    name: "",
    room: "",
    status: "",
    currentType: "",
    voltage: 0,
    current: 0,
    power: 0,
    activeHours: 0,
    dailyUsage: 0,
    dailyCost: 0,
  });

  const params = useLocalSearchParams();

  const applianceId = Array.isArray(params.applianceId)
    ? params.applianceId[0]
    : params.applianceId;

  const loadApplianceDetails = useCallback(async () => {
    try {
      if (!API_URL || !applianceId) {
        return;
      }

      const response = await axios.get(
        `${API_URL}/appliances/appliance-details/${applianceId}`,
      );

      setApplianceDetails(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }, [applianceId]);

  useEffect(() => {
    loadApplianceDetails();
  }, [loadApplianceDetails]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadApplianceDetails();
    setRefreshing(false);
  }, [loadApplianceDetails]);

  return {
    applianceDetails,
    refresh,
    refreshing,
  };
};

const useApplianceConsumption = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [appliancesConsumption, setAppliancesConsumption] = useState<ApplianceConsumption[]>([
    {
      applianceName: "",
      dailyKwh: 0,
    },
  ]);

  const loadApplianceConsumption = useCallback(async () => {
    try {
      if (!API_URL) {
        return;
      }

      const response = await axios.get(`${API_URL}/appliances/appliances-consumption`);
      setAppliancesConsumption(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    loadApplianceConsumption();
  }, [loadApplianceConsumption]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadApplianceConsumption();
    setRefreshing(false);
  }, [loadApplianceConsumption]);

  return {
    appliancesConsumption,
    refreshing,
    refresh,
  };
};

export { useAppliances, useApplianceDetails, useApplianceConsumption };
export {
  useAppliances as useDevices,
  useApplianceDetails as useDevicesDetails,
  useApplianceConsumption as useDevicesConsuption,
};
