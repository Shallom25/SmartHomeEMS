import { Stack } from "expo-router";
import { ApplianceDetailsScreen } from "@/features/devices/screens/ApplianceDetailsScreen";

export default function ApplianceDetailsRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Appliance Details",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#050816",
          },
          headerTintColor: "#fff",
        }}
      />

      <ApplianceDetailsScreen />
    </>
  );
}
