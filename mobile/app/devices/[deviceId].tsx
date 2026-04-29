import { Stack } from "expo-router";
import { DeviceDetailsScreen } from "@/features/devices/screens/DeviceDetailsScreen";

export default function DeviceDetailsRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Device Details",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#050816",
          },
          headerTintColor: "#fff",
        }}
      />

      <DeviceDetailsScreen />
    </>
  );
}