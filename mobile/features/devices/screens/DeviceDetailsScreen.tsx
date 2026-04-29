import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { EnergyCard } from "@/components/energy/EnergyCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { THEME } from "@/constants/theme";
import {
  formatCurrency,
  formatCurrent,
  formatKwh,
  formatPower,
  formatVoltage,
} from "@/utils/format";
import { calculateDailyKwh, calculateCost } from "@/utils/calculations";
import { useDevices } from "../hooks/useDevices";

export function DeviceDetailsScreen() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  const { devices } = useDevices();

  const device = devices.find((item) => item.id === deviceId);

  if (!device) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.colors.background,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800" }}>
          Device not found
        </Text>
      </View>
    );
  }

  const tariff = 250;
  const dailyKwh = calculateDailyKwh(device.power);
  const dailyCost = calculateCost(dailyKwh, tariff);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: THEME.colors.background }}
      contentContainerStyle={{
        padding: THEME.layout.containerPadding,
        paddingBottom: 100,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              color: THEME.colors.textPrimary,
              fontSize: 30,
              fontWeight: THEME.fontWeight.heavy,
            }}
          >
            {device.name}
          </Text>

          <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
            {device.room}
          </Text>
        </View>

        <Badge
          label={device.status}
          variant={device.status === "ON" ? "success" : "neutral"}
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Device Power"
          value={formatPower(device.power)}
          subtitle="Current simulated load"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <MetricCard label="Voltage" value={formatVoltage(device.voltage)} />
        <MetricCard label="Current" value={formatCurrent(device.current)} />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <MetricCard label="Daily Usage" value={formatKwh(dailyKwh)} />
        <MetricCard label="Daily Cost" value={formatCurrency(dailyCost)} />
      </View>

      <Card style={{ marginTop: 24 }}>
        <Text
          style={{
            color: THEME.colors.textPrimary,
            fontSize: 18,
            fontWeight: THEME.fontWeight.bold,
          }}
        >
          Device Insight
        </Text>

        <Text style={{ color: THEME.colors.textSecondary, marginTop: 10 }}>
          {device.power > 1000
            ? "This device is using high energy. It should trigger a warning in the alerts module."
            : device.status === "OFF"
            ? "This device is currently off and has no active load."
            : "This device is operating within a normal simulated range."}
        </Text>
      </Card>
    </ScrollView>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ flex: 1 }}>
      <Text style={{ color: THEME.colors.textMuted, fontSize: 12 }}>
        {label}
      </Text>

      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 20,
          fontWeight: THEME.fontWeight.heavy,
          marginTop: 6,
        }}
      >
        {value}
      </Text>
    </Card>
  );
}