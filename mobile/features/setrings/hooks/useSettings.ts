import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useSettings = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [settings, setSettings] = useState({
    simulationMode: true,
    costLimit: 3000,
    tariff: 210,
    powerLimit: 3000,
    minVoltage: 180,
    maxVoltage: 250,
  });

  const loadSettings = useCallback(async () => {
    try {
    } catch (error) {
      console.error("error", error);
    }

    const response = await axios.get(`${API_URL}/settings/get-settings`);
    setSettings(response.data);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    loadSettings();
    setRefreshing(false);
  }, [loadSettings]);
  return {
    settings,
    refresh,
    refreshing,
  };
};

interface Settings {
  simulationMode: boolean;
  costLimit: number;
  tariff: number;
  powerLimit: number;
  minVoltage: number;
  maxVoltage: number;
}

const useUpdateSettings = (settings: Settings) => {

  const [updateSettings, setUpdateSettings ] = useState({})
  const patchSettings = useCallback(async () => {
    try {
      if (!API_URL) {
        console.log("NO API URL FOUND");
        return;
      }
      const response = await axios.patch(`${API_URL}/settings/update-settings`, settings);
      setUpdateSettings(response.data)
    } catch (error) {
      console.error("error", error)
    }
  }, [settings]);

  useEffect(() => {
    patchSettings()
  },[patchSettings])

  return {
    patchSettings,
    updateSettings
  };
};

export { useSettings, useUpdateSettings };
