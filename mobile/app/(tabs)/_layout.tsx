import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#9E1BF1",
        tabBarInactiveTintColor: "#6B7280",

        tabBarStyle: {
          backgroundColor: THEME.colors.background,
          borderTopColor: THEME.colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse";

          switch (route.name) {
            case "index":
              iconName = "home";
              break;

            case "appliances/index":
              iconName = "hardware-chip";
              break;

            case "analytics/index":
              iconName = "bar-chart";
              break;

            case "alerts/index":
              iconName = "warning";
              break;

            case "settings/index":
              iconName = "settings";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />

      <Tabs.Screen name="appliances/index" options={{ title: "Appliances" }} />

      <Tabs.Screen name="analytics/index" options={{ title: "Analytics" }} />

      <Tabs.Screen name="alerts/index" options={{ title: "Alerts" }} />

      <Tabs.Screen name="settings/index" options={{ title: "Settings" }} />
    </Tabs>
  );
}