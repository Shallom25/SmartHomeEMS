import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { THEME } from "@/constants/theme";

type DeviceCardProps = {
  name: string;
  room: string;
  status: string;
  power: string;
  voltage: string;
  current: string;
  onPress?: () => void;
};

export function DeviceCard({
  name,
  room,
  status,
  power,
  voltage,
  current,
  onPress,
}: DeviceCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={{ marginTop: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: THEME.colors.textPrimary, fontSize: 17, fontWeight: "700" }}>
              {name}
            </Text>

            <Text style={{ color: THEME.colors.textMuted, marginTop: 4 }}>
              {room}
            </Text>
          </View>

          <Badge
            label={status}
            variant={status === "ON" ? "success" : "neutral"}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
          <MiniMetric label="Power" value={power} />
          <MiniMetric label="Voltage" value={voltage} />
          <MiniMetric label="Current" value={current} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.colors.surfaceSoft,
        borderRadius: THEME.radius.md,
        padding: 10,
      }}
    >
      <Text style={{ color: THEME.colors.textMuted, fontSize: 11 }}>{label}</Text>
      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 14,
          fontWeight: "700",
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}