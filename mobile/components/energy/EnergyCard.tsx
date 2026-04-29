import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENTS } from "@/constants/colors";
import { THEME } from "@/constants/theme";

type EnergyCardProps = {
  label: string;
  value: string;
  subtitle?: string;
};

export function EnergyCard({ label, value, subtitle }: EnergyCardProps) {
  return (
    <LinearGradient
      colors={GRADIENTS.primary as [string, string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: THEME.radius.xl,
        padding: 22,
      }}
    >
      <Text style={{ color: "#E5E7EB", fontSize: 13 }}>{label}</Text>

      <Text
        style={{
          color: "#fff",
          fontSize: 42,
          fontWeight: "800",
          marginTop: 6,
        }}
      >
        {value}
      </Text>

      {subtitle ? (
        <Text style={{ color: "#F9FAFB", marginTop: 8 }}>{subtitle}</Text>
      ) : null}
    </LinearGradient>
  );
}