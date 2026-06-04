import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { THEME } from "@/constants/theme";
import { useAlerts } from "../hooks/useAlerts";

type AlertLevel = "warning" | "danger" | "info" | "success" | "neutral";

const getLabelForLevel = (level: AlertLevel): string => {
  if (level === "danger") return "Critical";
  if (level === "warning") return "Warning";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export function AlertsScreen() {
  const { alerts, refresh, refreshing } = useAlerts();

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
        Alerts
      </Text>

      <Text style={{ color: THEME.colors.textMuted, marginTop: 6 }}>
        System warnings and energy safety notifications
      </Text>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <SummaryCard
          label="Critical"
          value={String(alerts.summary.critical)}
          variant="danger"
        />
        <SummaryCard
          label="Warnings"
          value={String(alerts.summary.warnings)}
          variant="warning"
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
          Recent Alerts
        </Text>

        {alerts.alerts.map((alert) => (
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
                  {alert.device} · {alert.createdAt}
                </Text>
              </View>

              <Badge
                label={getLabelForLevel(alert.level as AlertLevel)}
                variant={alert.level as AlertLevel}
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
