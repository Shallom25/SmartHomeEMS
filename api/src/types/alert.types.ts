export type AlertLevel = "info" | "warning" | "danger";

export interface Alert {
  id: string;
  title: string;
  message: string;
  appliance: string;
  level: AlertLevel;
  createdAt: string;
}