import { router } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { EnergyCard } from "@/components/energy/EnergyCard";
import { ApplianceCard } from "@/components/appliances/ApplianceCard";
import { THEME } from "@/constants/theme";
import { formatCurrent, formatPower, formatVoltage } from "@/utils/format";
import { useAppliances } from "../hooks/useDevices";

export function AppliancesScreen() {
  const { appliances, activeAppliances, totalAppliances, totalPower, refresh, refreshing } = useAppliances();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: THEME.colors.background }}
      contentContainerStyle={{
        padding: THEME.layout.containerPadding,
        paddingBottom: 100,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    >
      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 30,
          fontWeight: THEME.fontWeight.heavy,
        }}
      >
        Appliances
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        Monitor smart home appliance loads
      </Text>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Total Appliance Load"
          value={formatPower(totalPower)}
          subtitle={`${activeAppliances} active appliances · ${totalAppliances} registered`}
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            color: THEME.colors.textPrimary,
            fontSize: 18,
            fontWeight: THEME.fontWeight.bold,
          }}
        >
          Connected Appliances
        </Text>

        {appliances.map((appliance) => (
          <ApplianceCard
            key={appliance.id}
            name={appliance.name}
            room={appliance.room}
            status={appliance.status}
            power={formatPower(appliance.power)}
            voltage={formatVoltage(appliance.voltage)}
            current={formatCurrent(appliance.current)}
            onPress={() =>
              router.push({
                pathname: "/appliances/[applianceId]" as any,
                params: { applianceId: appliance.id },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}