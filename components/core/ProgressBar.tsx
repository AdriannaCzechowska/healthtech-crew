"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "secondary" | "accent";
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  color = "primary",
}: ProgressBarProps) {
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  };

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">{value}%</span>
          )}
        </div>
      )}
      <div className="relative">
        <Progress value={value} className="h-3" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-3 rounded-full ${
            colorClasses[color]
          }`}
        />
      </div>
    </div>
  );
}

