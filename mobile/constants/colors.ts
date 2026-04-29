export const COLORS = {
  // Base
  background: "#050816",
  surface: "#111827",
  surfaceSoft: "#0F172A",
  border: "#1F2937",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",

  // Brand (Xolarie gradient)
  primaryStart: "#3D57FB",
  primaryMid: "#9E1BF1",
  primaryEnd: "#E40079",

  // Status
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",

  // Status backgrounds (soft)
  successBg: "rgba(34,197,94,0.15)",
  warningBg: "rgba(245,158,11,0.15)",
  dangerBg: "rgba(239,68,68,0.15)",

  // Special
  white: "#FFFFFF",
  black: "#000000",
};

// Gradient helper (use everywhere)
export const GRADIENTS = {
  primary: [
    COLORS.primaryStart,
    COLORS.primaryMid,
    COLORS.primaryEnd,
  ],
};