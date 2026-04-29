import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENTS } from "@/constants/colors";
import { THEME } from "@/constants/theme";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  children,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  if (isPrimary) {
    return (
      <TouchableOpacity activeOpacity={0.85} style={style} {...props}>
        <LinearGradient
          colors={GRADIENTS.primary as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderRadius: THEME.radius.md,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        {
          backgroundColor:
            variant === "danger" ? THEME.colors.dangerBg : THEME.colors.surface,
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: THEME.radius.md,
          borderWidth: 1,
          borderColor:
            variant === "danger" ? THEME.colors.danger : THEME.colors.border,
          alignItems: "center",
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: variant === "danger" ? THEME.colors.danger : THEME.colors.textPrimary,
          fontWeight: "700",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}