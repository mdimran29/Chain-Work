import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className = "", glass = false }: CardProps) {
  const base = "rounded-2xl border border-white/8 p-6 transition-all";
  const glassStyle = glass ? "bg-white/[0.04] backdrop-blur-md" : "bg-[hsl(224,18%,18%)]";

  return <div className={`${base} ${glassStyle} ${className}`}>{children}</div>;
}
