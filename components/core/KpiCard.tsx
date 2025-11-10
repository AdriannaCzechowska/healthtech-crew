"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "primary",
  children,
  onClick,
}: KpiCardProps) {
  const iconColorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-muted-foreground",
    purple: "text-purple-500",
    blue: "text-blue-500",
    indigo: "text-indigo-500",
    cyan: "text-cyan-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      className={onClick ? "cursor-pointer" : ""}
      onClick={onClick}
    >
      <Card className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all relative">
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-3">{title}</p>
              <div className="text-3xl font-bold mb-1">{value}</div>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
              {trend && (
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs font-medium ${
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                </div>
              )}
              {children}
            </div>
            <div className={`${iconColorClasses[color as keyof typeof iconColorClasses] || iconColorClasses.primary}`}>
              <Icon className="h-6 w-6 opacity-70" />
            </div>
          </div>
        </CardContent>
        
        {/* Large background icon shadow */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <Icon className="h-32 w-32 -mr-8 -mb-8" />
        </div>
      </Card>
    </motion.div>
  );
}
