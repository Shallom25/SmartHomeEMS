import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "@/constants/theme";

type ChartPoint = {
  time: string;
  value: number;
};

type Props = {
  title: string;
  data: ChartPoint[];
  unit?: string;
  color?: string;
};

export function HourlyConsumptionChart({
  title,
  data,
  unit = "kWh",
  color = THEME.colors.primaryMid,
}: Props) {
  const max = Math.max(...data.map(d => d.value), 1);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View
      style={{
        backgroundColor: "#1F1F22",
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "#323236",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#A8FF00"
        />
      </View>

      {/* Body */}

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
            color,
            fontSize: 42,
            fontWeight: "800",
            marginTop: 2,
          }}
        >
          {total.toFixed(1)}
          <Text
            style={{
              fontSize: 24,
            }}
          >
            {unit}
          </Text>
        </Text>

        {/* Graph */}

        <View
          style={{
            height: 180,
            marginTop: 24,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {data.map(item => {
            const height = (item.value / max) * 150;

            return (
              <View
                key={item.time}
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: 3,
                    height: 150,
                    backgroundColor: "#4A4A4A",
                    position: "absolute",
                    bottom: 20,
                    borderRadius: 999,
                  }}
                />

                <View
                  style={{
                    width: 5,
                    height,
                    backgroundColor: color,
                    borderRadius: 999,
                    marginBottom: 20,
                  }}
                />

                <Text
                  style={{
                    color: "#8F8F92",
                    fontSize: 11,
                  }}
                >
                  {item.time}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}