import { Text, View } from "react-native";
import { THEME } from "@/constants/theme";

type ChartPoint = {
  applianceName: string;
  dailyKwh: number;
};

type ConsumptionChartProps = {
  title: string;
  data: ChartPoint[];
};

export function ConsumptionChart({ title, data }: ConsumptionChartProps) {
  const maxValue = Math.max(...data.map((item) => item.dailyKwh), 1);

  return (
    <View
      style={{
        backgroundColor: THEME.colors.surface,
        borderRadius: THEME.radius.lg,
        padding: THEME.layout.cardPadding,
        borderWidth: 1,
        borderColor: THEME.colors.border,
      }}
    >
      <Text
        style={{
          color: THEME.colors.textPrimary,
          fontSize: 18,
          fontWeight: THEME.fontWeight.bold,
        }}
      >
        {title}
      </Text>

      <View style={{ marginTop: 18, gap: 12 }}>
        {data.map((item) => {
          const width = `${(item.dailyKwh / maxValue).toFixed(1)}%`;

          return (
            <View key={item.applianceName}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text style={{ color: THEME.colors.textSecondary }}>
                  {item.applianceName}
                </Text>

                <Text style={{ color: THEME.colors.textPrimary, fontWeight: "700" }}>
                  {item.dailyKwh} kWh
                </Text>
              </View>

              <View
                style={{
                  height: 10,
                  backgroundColor: THEME.colors.surfaceSoft,
                  borderRadius: THEME.radius.full,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: width as any,
                    height: "100%",
                    backgroundColor: THEME.colors.primaryMid,
                    borderRadius: THEME.radius.full,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}