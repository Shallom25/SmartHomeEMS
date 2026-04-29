import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#050816", // Xolarie dark base
          },
        }}
      >
        {/* Tabs (main app) */}
        <Stack.Screen name="(tabs)" />

        {/* Device details (pushed on top of tabs) */}
        <Stack.Screen
          name="devices/[deviceId]"
          options={{
            headerShown: true,
            title: "Device Details",
            headerStyle: {
              backgroundColor: "#050816",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </>
  );
}