import { Text, View } from "react-native";
import { THEME } from "@/constants/theme";

type BadgeProps = {
  label: string;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
};

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const styles = {
    success: [THEME.colors.successBg, THEME.colors.success],
    warning: [THEME.colors.warningBg, THEME.colors.warning],
    danger: [THEME.colors.dangerBg, THEME.colors.danger],
    info: ["rgba(59,130,246,0.15)", THEME.colors.info],
    neutral: [THEME.colors.surfaceSoft, THEME.colors.textSecondary],
  } as const;

  const [bg, color] = styles[variant];

  return (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: THEME.radius.full,
      }}
    >
      <Text style={{ color, fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}