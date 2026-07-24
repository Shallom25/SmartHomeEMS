import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "@/constants/theme";

type ChartPoint = {
  applianceName: string;
  dailyKwh: number;
};

type Props = {
  title: string;
  data: ChartPoint[];
};

export function ConsumptionChart({ title, data }: Props) {
  const max = Math.max(...data.map(i => i.dailyKwh), 1);

  const total = data.reduce((sum, i) => sum + i.dailyKwh, 0);

  return (
    <View
      style={{
        backgroundColor: THEME.colors.surface,
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: THEME.colors.textPrimary,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 24,
          }}
        >
          {title}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#A8FF00"
        />
      </View>

      <View style={{ padding: 20 }}>

        <Text
          style={{
            color: "#D0D0D0",
            fontSize: 18,
          }}
        >
          Today
        </Text>

        <Text
          style={{
            color: "#2EA8FF",
            fontSize: 40,
            fontWeight: "800",
            marginBottom: 24,
          }}
        >
          {total.toFixed(1)}
          <Text style={{ fontSize: 22 }}>kWh</Text>
        </Text>

        {/* Chart */}

        <View
          style={{
            height: 170,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {data.map(item => {
            const height = (item.dailyKwh / max) * 140;

            return (
              <View
                key={item.applianceName}
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                {/* background line */}

                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    width: 3,
                    height: 140,
                    backgroundColor: "#47474D",
                    borderRadius: 999,
                  }}
                />

                {/* value */}

                <View
                  style={{
                    width: 6,
                    height,
                    backgroundColor: "#2EA8FF",
                    borderRadius: 999,
                    marginBottom: 5,
                  }}
                />

                <Text
                  numberOfLines={1}
                  style={{
                    color: "#9CA3AF",
                    fontSize: 10,
                    width: 36,
                    textAlign: "center",
                  }}
                >
                  {item.applianceName.slice(0, 3)}
                </Text>
              </View>
            );
          })}
        </View>

      </View>
    </View>
  );
}