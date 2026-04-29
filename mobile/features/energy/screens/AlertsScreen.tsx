import { ScrollView, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { THEME } from "@/constants/theme";

type AlertLevel = "warning" | "danger" | "info";

const alerts: {
  id: string;
  title: string;
  message: string;
  device: string;
  time: string;
  level: AlertLevel;
}[] = [
  {
    id: "1",
    title: "High Power Usage",
    message: "Air Conditioner is consuming above the recommended simulation limit.",
    device: "Air Conditioner",
    time: "2 mins ago",
    level: "danger",
  },
  {
    id: "2",
    title: "Voltage Stable",
    message: "System voltage is operating within the safe range.",
    device: "Main Supply",
    time: "8 mins ago",
    level: "info",
  },
  {
    id: "3",
    title: "Cost Threshold Warning",
    message: "Estimated daily energy cost is getting close to your configured limit.",
    device: "Home EMS",
    time: "15 mins ago",
    level: "warning",
  },
];

export function AlertsScreen() {
  const criticalCount = alerts.filter((alert) => alert.level === "danger").length;
  const warningCount = alerts.filter((alert) => alert.level === "warning").length;

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
        Alerts
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        System warnings and energy safety notifications
      </Text>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <SummaryCard label="Critical" value={String(criticalCount)} variant="danger" />
        <SummaryCard label="Warnings" value={String(warningCount)} variant="warning" />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            color: THEME.colors.textPrimary,
            fontSize: 18,
            fontWeight: THEME.fontWeight.bold,
          }}
        >
          Recent Alerts
        </Text>

        {alerts.map((alert) => (
          <Card key={alert.id} style={{ marginTop: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: THEME.colors.textPrimary,
                    fontSize: 17,
                    fontWeight: THEME.fontWeight.bold,
                  }}
                >
                  {alert.title}
                </Text>

                <Text style={{ color: THEME.colors.textMuted, marginTop: 4 }}>
                  {alert.device} · {alert.time}
                </Text>
              </View>

              <Badge
                label={alert.level === "danger" ? "Critical" : alert.level}
                variant={alert.level}
              />
            </View>

            <Text
              style={{
                color: THEME.colors.textSecondary,
                marginTop: 12,
                lineHeight: 22,
              }}
            >
              {alert.message}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

function SummaryCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "danger" | "warning";
}) {
  return (
    <Card style={{ flex: 1 }}>
      <Badge label={label} variant={variant} />

      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 34,
          fontWeight: THEME.fontWeight.heavy,
          marginTop: 12,
        }}
      >
        {value}
      </Text>
    </Card>
  );
}