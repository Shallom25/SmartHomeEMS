import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useAlerts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState({
    "summary": {
    "critical": 0,
    "warnings": 0,
    "total": 0
  },
    "alerts": [
    {
      "id": "",
      "title": "",
      "message": "",
      "device": "",
      "level": "",
      "createdAt": ""
    }]
  });

  const loadAlert = useCallback(async () => {
    try {
      if (!API_URL) {
        return;
      }

      const response = await axios.get(`${API_URL}/alerts/get-alert`);

      setAlerts(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }, []);



  useEffect(() => {
    loadAlert();
  },[loadAlert])


    const refresh = useCallback(async () => {
    setRefreshing(true)
    loadAlert();
    setRefreshing(false)
  },[loadAlert])
  return {
    alerts,
    refresh,
    refreshing
  };
};


export { useAlerts}