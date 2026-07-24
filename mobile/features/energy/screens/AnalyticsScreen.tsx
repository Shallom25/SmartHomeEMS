import { RefreshControl, ScrollView, Text, View } from "react-native";
import { EnergyCard } from "@/components/energy/EnergyCard";
import { Card } from "@/components/ui/Card";
import { ConsumptionChart } from "@/components/energy/ComsumptionChart";
import { THEME } from "@/constants/theme";
import { formatCurrency, formatKwh, formatPower } from "@/utils/format";
import { useEnergy } from "../hooks/useEnergy";
import { useApplianceConsumption } from "@/features/devices/hooks/useDevices";
import { HourlyConsumptionChart } from "@/components/energy/HourlyConsumptionChart";



export function AnalyticsScreen() {

  const { energy, refreshing: refreshingEnergy, refresh: refreshEnergy } = useEnergy();
  const { appliancesConsumption, refresh: refreshApplianceConsumption, refreshing: refreshingApplianceConsumption } = useApplianceConsumption();

  


  const totalKwh = energy.totalDailyUsage;
  const estimatedCost = energy.estimatedCost;
  const peakAppliance = energy.peakPower;

  const refresh = async () => {
    await Promise.all([refreshEnergy(), refreshApplianceConsumption()]);
  };

  const refreshing = refreshingEnergy || refreshingApplianceConsumption;



  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: THEME.colors.background }}
      contentContainerStyle={{
        padding: THEME.layout.containerPadding,
        paddingBottom: 100,
      }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
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
          subtitle="Estimated from simulated appliance loads"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <MetricCard label="Estimated Cost" value={formatCurrency(estimatedCost)} />
        <MetricCard label="Peak Load" value={peakAppliance.name} />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <MetricCard label="Highest Appliance" value={peakAppliance.name} />
        <MetricCard label="Peak Power" value={formatPower(1200)} />
      </View>

      <View style={{ marginTop: 24 }}>
        <HourlyConsumptionChart
    title="Hourly Usage"
    data={energy.hourlyUsage}
    color="#2EA8FF"
/>
      </View>

      <View style={{ marginTop: 18 }}>
        <ConsumptionChart title="Appliance Consumption" data={appliancesConsumption} />
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
          The air conditioner is currently the highest consuming appliance. In a real
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