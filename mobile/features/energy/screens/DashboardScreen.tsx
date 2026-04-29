import { ScrollView, Text, View, RefreshControl } from "react-native";
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
import { useEnergy } from "../hooks/useEnergy";

export function DashboardScreen() {
  const { energy, refreshing, refresh } = useEnergy();

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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              color: THEME.colors.textPrimary,
              fontSize: 30,
              fontWeight: THEME.fontWeight.heavy,
            }}
          >
            Xolarie EMS
          </Text>

          <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
            Smart Energy Intelligence
          </Text>
        </View>

        <Badge
          label={energy.status}
          variant={
            energy.status === "Optimal"
              ? "success"
              : energy.status === "Warning"
              ? "warning"
              : "danger"
          }
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Current Power"
          value={formatPower(energy.power)}
          subtitle="Live simulated household load"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <StatCard label="Voltage" value={formatVoltage(energy.voltage)} />
        <StatCard label="Current" value={formatCurrent(energy.current)} />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <StatCard label="Daily Usage" value={formatKwh(energy.dailyKwh)} />
        <StatCard label="Cost" value={formatCurrency(energy.cost)} />
      </View>

      <Card style={{ marginTop: 24 }}>
        <Text
          style={{
            color: THEME.colors.textPrimary,
            fontSize: 18,
            fontWeight: THEME.fontWeight.bold,
          }}
        >
          System Insights
        </Text>

        <Text style={insightStyle}>• Energy usage is within safe range</Text>
        <Text style={insightStyle}>• No abnormal power spike detected</Text>
        <Text style={insightStyle}>• Proteus simulation mode ready</Text>
      </Card>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
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

const insightStyle = {
  color: THEME.colors.textSecondary,
  marginTop: 8,
};