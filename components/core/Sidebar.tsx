"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  ClipboardList,
  Calendar,
  FileText,
  Activity,
  Map,
  Users,
  Gift,
  Leaf,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigation = [
  { name: "Panel Główny", href: "/", icon: LayoutDashboard },
  { name: "Mapa Miasta", href: "/mapa-miasta", icon: Map },
  { name: "Sąsiedzkie Wyjścia", href: "/sasiedzkie-wyjscia", icon: Users },
  { name: "Nagrody", href: "/nagrody", icon: Gift },
  { name: "Smart City Łódź", href: "/smart-city-lodz", icon: Leaf },
  { name: "Wiadomości", href: "/messages", icon: MessageSquare },
  { name: "Rekomendacje AI", href: "/ai-recommendations", icon: Sparkles },
];

const healthNavigation = [
  { name: "Plan Leczenia", href: "/treatment-plan", icon: ClipboardList },
  { name: "Wizyty", href: "/visits", icon: Calendar },
  { name: "Wyniki Badań", href: "/lab-results", icon: FileText },
  { name: "Sprawdź Objawy", href: "/symptom-check", icon: Activity },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background z-40 transition-transform duration-300 overflow-y-auto",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          {/* Health Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: navigation.length * 0.05 }}
            className="mt-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Heart className="h-4 w-4" />
              <span>Zdrowie</span>
            </div>
          </motion.div>

          {healthNavigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: (navigation.length + index + 1) * 0.05,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
