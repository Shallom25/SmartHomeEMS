export type AlertLevel = "info" | "warning" | "danger";

export interface Alert {
  id: string;
  title: string;
  message: string;
  device: string;
  level: AlertLevel;
  createdAt: string;
}