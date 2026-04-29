import { COLORS } from "./colors";

export const THEME = {
  colors: COLORS,

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    full: 999,
  },

  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
    display: 36,
  },

  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    heavy: "800" as const,
  },

  shadow: {
    card: {
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
  },

  layout: {
    containerPadding: 20,
    cardPadding: 16,
  },
};