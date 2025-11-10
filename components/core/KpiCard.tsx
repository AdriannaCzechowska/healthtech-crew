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

  const bgColorClasses = {
    primary: "bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30",
    secondary: "bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30",
    accent: "bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30",
    muted: "bg-gradient-to-br from-muted/20 to-muted/10 border-muted/30",
    purple: "bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-purple-500/30",
    blue: "bg-gradient-to-br from-blue-500/20 to-blue-500/10 border-blue-500/30",
    indigo: "bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 border-indigo-500/30",
    cyan: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border-cyan-500/30",
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
      <Card className={`overflow-hidden rounded-2xl border ${bgColorClasses[color as keyof typeof bgColorClasses] || bgColorClasses.primary} backdrop-blur-sm hover:border-border transition-all relative`}>
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
