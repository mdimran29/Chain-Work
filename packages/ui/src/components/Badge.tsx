import React from "react";

export interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  success: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  error: "bg-red-500/15 text-red-400 ring-red-500/30",
  info: "bg-blue-500/15 text-blue-400 ring-blue-500/30",
  default: "bg-white/5 text-white/70 ring-white/10",
};

export function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ring-1 ring-inset ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
