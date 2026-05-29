import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

const useAuth = () => {
  return { user: 1 }; // replace later with real auth
};

export default function RootLayout() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuth =
      segments[0] === "(auth)" ||
      segments[0] === "login" ||
      segments[0] === "register" ||
      segments[0] === "forgot-password";

    if (!user && !inAuth) {
      router.replace("/(auth)/login");
    }

    if (user && inAuth) {
      router.replace("/(tabs)");
    }
  }, [isReady, user, segments]);

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#050816" },
        }}
      >
        {/* AUTH FLOW */}
        <Stack.Screen name="(auth)" />

        {/* MAIN APP */}
        <Stack.Screen name="(tabs)" />

        {/* DETAILS */}
        <Stack.Screen
          name="devices/[deviceId]"
          options={{
            headerShown: true,
            title: "Device Details",
          }}
        />
      </Stack>
    </>
  );
}