import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type User = {
  id: string;
  fullName: string;
  email: string;
};

const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const { data } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("token", data.token);



      setUser(data.user);

      return data.user;
    } catch (err: any) {
      const message = err.response?.data?.error || "Login failed";
      console.log(err);

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
  };
};

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/user/register`, {
        fullName,
        email,
        password,
      });


      await AsyncStorage.setItem("token", data.token);

      return data.user;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendResetLink = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });

      return data;
    } catch (err: any) {
      const message = err.response?.data?.error || "Unable to send reset link";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    sendResetLink,
  };
};

const useVerifyToken = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data.user);
      } catch {
        await AsyncStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    // checkAuth,
    user,
    loading,
  };
};

export { useLogin, useRegister, useForgotPassword, useVerifyToken };
