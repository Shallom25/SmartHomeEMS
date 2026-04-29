import { ScrollView, Text, View } from "react-native";
import { EnergyCard } from "@/components/energy/EnergyCard";
import { Card } from "@/components/ui/Card";
import { ConsumptionChart } from "@/components/energy/ComsumptionChart";
import { THEME } from "@/constants/theme";
import { formatCurrency, formatKwh, formatPower } from "@/utils/format";

const hourlyUsage = [
  { label: "6AM", value: 0.7 },
  { label: "9AM", value: 1.1 },
  { label: "12PM", value: 1.8 },
  { label: "3PM", value: 2.4 },
  { label: "6PM", value: 3.2 },
  { label: "9PM", value: 2.1 },
];

const deviceUsage = [
  { label: "AC", value: 28.8 },
  { label: "Fridge", value: 4.32 },
  { label: "Fan", value: 1.8 },
  { label: "Bulb", value: 0.43 },
  { label: "TV", value: 0 },
];

export function AnalyticsScreen() {
  const totalKwh = deviceUsage.reduce((sum, item) => sum + item.value, 0);
  const tariff = 250;
  const estimatedCost = totalKwh * tariff;
  const peakDevice = deviceUsage[0];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: THEME.colors.background }}
      contentContainerStyle={{
        padding: THEME.layout.containerPadding,
        paddingBottom: 100,
      }}
    >
      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 30,
          fontWeight: THEME.fontWeight.heavy,
        }}
      >
        Analytics
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        Energy usage intelligence and consumption trends
      </Text>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Total Daily Consumption"
          value={formatKwh(totalKwh)}
          subtitle="Estimated from simulated device loads"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <MetricCard label="Estimated Cost" value={formatCurrency(estimatedCost)} />
        <MetricCard label="Peak Load" value={peakDevice.label} />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <MetricCard label="Highest Device" value={peakDevice.label} />
        <MetricCard label="Peak Power" value={formatPower(1200)} />
      </View>

      <View style={{ marginTop: 24 }}>
        <ConsumptionChart title="Hourly Usage" data={hourlyUsage} />
      </View>

      <View style={{ marginTop: 18 }}>
        <ConsumptionChart title="Device Consumption" data={deviceUsage} />
      </View>

      <Card style={{ marginTop: 24 }}>
        <Text
          style={{
            color: THEME.colors.textPrimary,
            fontSize: 18,
            fontWeight: THEME.fontWeight.bold,
          }}
        >
          Energy Insight
        </Text>

        <Text
          style={{
            color: THEME.colors.textSecondary,
            marginTop: 10,
            lineHeight: 22,
          }}
        >
          The air conditioner is currently the highest consuming device. In a real
          EMS setup, this would be the first load to optimize for cost reduction.
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
          fontSize: 18,
          fontWeight: THEME.fontWeight.heavy,
          marginTop: 6,
        }}
      >
        {value}
      </Text>
    </Card>
  );
}