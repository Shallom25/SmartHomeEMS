import { router } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { EnergyCard } from "@/components/energy/EnergyCard";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { THEME } from "@/constants/theme";
import { formatCurrent, formatPower, formatVoltage } from "@/utils/format";
import { useDevices } from "../hooks/useDevices";

export function DevicesScreen() {
  const { devices, activeDevices, totalDevices, totalPower,refresh, refreshing } = useDevices();


  

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
        Devices
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        Monitor simulated smart home loads
      </Text>

      <View style={{ marginTop: 24 }}>
        <EnergyCard
          label="Total Device Load"
          value={formatPower(totalPower)}
          subtitle={`${activeDevices} active devices · ${totalDevices} registered`}
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
          Connected Devices
        </Text>

        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            name={device.name}
            room={device.room}
            status={device.status}
            power={formatPower(device.power)}
            voltage={formatVoltage(device.voltage)}
            current={formatCurrent(device.current)}
            onPress={() =>
              router.push({
                pathname: "/devices/[deviceId]",
                params: { deviceId: device.id },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}