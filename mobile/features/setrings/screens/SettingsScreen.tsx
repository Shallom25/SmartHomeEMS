import {
  RefreshControl,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { THEME } from "@/constants/theme";
import { useSettings, useUpdateSettings } from "../hooks/useSettings";
import { useState } from "react";

export function SettingsScreen() {
  const { settings, refresh, refreshing } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const { patchSettings  } = useUpdateSettings(localSettings);

  const [simulationMode, setSimulationMode] = useState(settings.simulationMode);

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
        Settings
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        Configure EMS simulation, pricing, and safety limits
      </Text>

      <Card style={{ marginTop: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={sectionTitle}>System Mode</Text>
            <Text style={sectionSubtitle}>
              Use simulated values before Proteus integration
            </Text>
          </View>

          <Badge
            label={simulationMode ? "Simulation" : "Real"}
            variant={simulationMode ? "info" : "success"}
          />
        </View>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={labelStyle}>Simulation Mode</Text>

          <Switch
            value={simulationMode}
            onValueChange={setSimulationMode}
            trackColor={{ false: "#374151", true: "#9E1BF1" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </Card>

      <Card style={{ marginTop: 18 }}>
        <Text style={sectionTitle}>Energy Pricing</Text>
        <Text style={sectionSubtitle}>Used to estimate daily energy cost</Text>

        <InputBlock
          label="Electricity Tariff"
          value={String(localSettings.tariff)}
          onChangeText={(text) =>
            setLocalSettings((prev) => ({
              ...prev,
              tariff: Number(text),
            }))
          }
          suffix="₦/kWh"
        />
      </Card>

      <Card style={{ marginTop: 18 }}>
        <Text style={sectionTitle}>Safety Thresholds</Text>
        <Text style={sectionSubtitle}>
          These values control warning and critical states
        </Text>

        <InputBlock
          label="Power Limit"
          value={String(localSettings.powerLimit)}
          onChangeText={(text) =>
            setLocalSettings((prev) => ({
              ...prev,
              powerLimit: Number(text),
            }))
          }
          suffix="W"
        />

        <View style={{ flexDirection: "row", gap: 12 }}>
          <InputBlock
            label="Min Voltage"
            value={String(localSettings.minVoltage)}
            onChangeText={(text) =>
              setLocalSettings((prev) => ({
                ...prev,
                minVoltage: Number(text),
              }))
            }
            suffix="V"
            half
          />

          <InputBlock
            label="Max Voltage"
            value={String(localSettings.maxVoltage)}
            onChangeText={(text) =>
              setLocalSettings((prev) => ({
                ...prev,
                maxVoltage: Number(text),
              }))
            }
            suffix="V"
            half
          />
        </View>
      </Card>

      <Card style={{ marginTop: 18 }}>
        <Text style={sectionTitle}>Lab Integration</Text>

        <Text
          style={{
            color: THEME.colors.textSecondary,
            marginTop: 10,
            lineHeight: 22,
          }}
        >
          Proteus serial data will later connect through the Express backend.
          For now, the app uses mock and manual simulation values.
        </Text>
      </Card>

      <View style={{ marginTop: 24 }}>
        <Button
          onPress={patchSettings}
        >
          Save Settings
        </Button>
      </View>
    </ScrollView>
  );
}

function InputBlock({
  label,
  value,
  onChangeText,
  suffix,
  half = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  suffix: string;
  half?: boolean;
}) {
  return (
    <View style={{ marginTop: 16, flex: half ? 1 : undefined }}>
      <Text style={labelStyle}>{label}</Text>

      <View
        style={{
          marginTop: 8,
          backgroundColor: THEME.colors.surfaceSoft,
          borderRadius: THEME.radius.md,
          borderWidth: 1,
          borderColor: THEME.colors.border,
          paddingHorizontal: 14,
          height: 52,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          // keyboardType="numeric"
          placeholderTextColor={THEME.colors.textMuted}
          style={{
            flex: 1,
            color: THEME.colors.textPrimary,
            fontSize: 16,
            fontWeight: THEME.fontWeight.bold,
          }}
        />

        <Text style={{ color: THEME.colors.textMuted }}>{suffix}</Text>
      </View>
    </View>
  );
}

const sectionTitle = {
  color: THEME.colors.textPrimary,
  fontSize: 18,
  fontWeight: THEME.fontWeight.bold,
};

const sectionSubtitle = {
  color: THEME.colors.textMuted,
  marginTop: 6,
};

const labelStyle = {
  color: THEME.colors.textSecondary,
  fontSize: 13,
};
