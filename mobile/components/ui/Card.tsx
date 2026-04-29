import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { THEME } from "@/constants/theme";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: THEME.colors.surface,
          borderRadius: THEME.radius.lg,
          padding: THEME.layout.cardPadding,
          borderWidth: 1,
          borderColor: THEME.colors.border,
        },
        THEME.shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}