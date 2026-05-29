import { useCallback, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useDevices = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [devices, setDevices] = useState([
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

  const loadDevices = useCallback(async () => {
    try {
      if (!API_URL) {
        return;
      }

      const response = await axios.get(`${API_URL}/devices/connected-devices`);

      console.log("Full response", response);
      console.log("response data", response.data);
      setDevices(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const activeDevices = devices.filter(
    (device) => device.status === "ON",
  ).length;

  const totalPower = devices.reduce((total, device) => {
    return total + device.power;
  }, 0);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    await loadDevices();

    setRefreshing(false);
  }, [loadDevices]);

  return {
    devices,
    activeDevices,
    totalPower,
    totalDevices: devices.length,
    refresh,
    refreshing,
  };
};

const useDevicesDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState({
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

const deviceId = Array.isArray(params.deviceId)
  ? params.deviceId[0]
  : params.deviceId;

const loadDeviceDetails = useCallback(async () => {
  try {
    if (!API_URL || !deviceId) {
      return;
    }

    console.log("deviceId:", deviceId);

    const response = await axios.get(
      `${API_URL}/devices/device-details/${deviceId}`
    );

    setDeviceDetails(response.data);
  } catch (error) {
    console.error("error", error);
  }
}, [deviceId]);

  useEffect(() => {
    loadDeviceDetails();
  }, [loadDeviceDetails]);

  const refresh = useCallback(async () => {
    setRefreshing(true)
    loadDeviceDetails()
    setRefreshing(false)
  },[loadDeviceDetails])
  return {
    deviceDetails,
    refresh
  };
};

export { useDevices, useDevicesDetails };
