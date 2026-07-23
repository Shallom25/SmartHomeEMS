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
import { useApplianceDetails } from "../hooks/useDevices";

export function ApplianceDetailsScreen() {
  const { applianceDetails } = useApplianceDetails();

  const appliance = applianceDetails;

  if (!appliance?.id) {
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
          Appliance not found
        </Text>
      </View>
    );
  }

  const tariff = 250;
  const dailyKwh = calculateDailyKwh(appliance.power);
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
            {appliance.name}
          </Text>

          <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
            {appliance.room}
          </Text>
        </View>

        <Badge
          label={appliance.status}
          variant={appliance.status === "ON" ? "success" : "neutral"}
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Appliance Power"
          value={formatPower(appliance.power)}
          subtitle="Current simulated load"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <MetricCard label="Voltage" value={formatVoltage(appliance.voltage)} />
        <MetricCard label="Current" value={formatCurrent(appliance.current)} />
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
          Appliance Insight
        </Text>

        <Text style={{ color: THEME.colors.textSecondary, marginTop: 10 }}>
          {appliance.power > 1000
            ? "This appliance is using high energy. It should trigger a warning in the alerts module."
            : appliance.status === "OFF"
            ? "This appliance is currently off and has no active load."
            : "This appliance is operating within a normal simulated range."}
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