import "./Alert.css";
import type { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
}

const icons: Record<AlertVariant, ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <AlertCircle size={18} />,
};

export default function Alert({ variant = "info", children }: AlertProps) {
  return (
    <div className={`alert alert--${variant}`} role="alert">
      <span className="alert__icon">{icons[variant]}</span>
      <div className="alert__content">{children}</div>
    </div>
  );
}
