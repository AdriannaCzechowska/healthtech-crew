"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  RefreshCw,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Recommendation } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AIRecommendationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: api.getRecommendations,
  });

  const refreshMutation = useMutation({
    mutationFn: api.refreshRecommendations,
    onSuccess: (data) => {
      queryClient.setQueryData(["recommendations"], data);
    },
  });

  const getSeverityIcon = (severity: Recommendation["severity"]) => {
    switch (severity) {
      case "High":
        return <AlertCircle className="h-5 w-5" />;
      case "Medium":
        return <AlertTriangle className="h-5 w-5" />;
      case "Low":
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Recommendation["severity"]) => {
    switch (severity) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
    }
  };

  // Mapowanie poziomu ryzyka na polskie etykiety
  const translateSeverity = (severity: string) => {
    switch (severity) {
      case "High":
        return "Wysoki";
      case "Medium":
        return "Średni";
      case "Low":
        return "Niski";
      default:
        return severity;
    }
  };

  // Tłumaczenie kategorii
  const translateCategory = (category: string) => {
    switch (category) {
      case "Appointments":
        return "Wizyty lekarskie";
      case "Preventive Care":
        return "Profilaktyka zdrowotna";
      case "Lifestyle":
        return "Styl życia";
      case "Wellness":
        return "Samopoczucie";
      default:
        return category;
    }
  };

  // Tłumaczenie tytułów i opisów rekomendacji
  const translateTitle = (title: string) => {
    switch (title) {
      case "Schedule Follow-up Visit":
        return "Umów wizytę kontrolną";
      case "Preventive Screening Due":
        return "Wykonaj badania profilaktyczne";
      case "Increase Physical Activity":
        return "Zwiększ aktywność fizyczną";
      case "Hydration Goals":
        return "Cele nawodnienia";
      default:
        return title;
    }
  };

  const translateDescription = (desc: string) => {
    if (desc.includes("follow-up consultation"))
      return "Twoje ostatnie wyniki sugerują potrzebę konsultacji kontrolnej z lekarzem w ciągu najbliższych 2 tygodni.";
    if (desc.includes("Annual cardiovascular screening"))
      return "Na podstawie Twojego wieku i profilu zdrowotnego zalecane jest roczne badanie kardiologiczne.";
    if (desc.includes("activity levels are below"))
      return "Twój poziom aktywności jest niższy od zalecanego. Spróbuj dodać 30 minut spaceru dziennie.";
    if (desc.includes("hydration goals"))
      return "Osiągasz 85% dziennego celu nawodnienia. Świetna robota – utrzymuj ten poziom!";
    return desc;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Rekomendacje AI</h1>
              <p className="text-muted-foreground">
                Spersonalizowane wskazówki zdrowotne oparte na analizie danych.
              </p>
            </div>
            <Button
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
              className="rounded-xl"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  refreshMutation.isPending ? "animate-spin" : ""
                }`}
              />
              {refreshMutation.isPending ? "Analizowanie..." : "Odśwież analizę"}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Ładowanie rekomendacji...
            </div>
          ) : recommendations && recommendations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all ${
                      rec.actionUrl ? "cursor-pointer" : ""
                    }`}
                    onClick={() => rec.actionUrl && router.push(rec.actionUrl)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-xl ${
                              rec.severity === "High"
                                ? "bg-destructive/10 text-destructive"
                                : rec.severity === "Medium"
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/10 text-secondary"
                            }`}
                          >
                            {getSeverityIcon(rec.severity)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {translateTitle(rec.title)}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                              {translateCategory(rec.category)}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={getSeverityColor(rec.severity)}
                          className="rounded-full"
                        >
                          {translateSeverity(rec.severity)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {translateDescription(rec.description)}
                      </p>
                      {rec.actionUrl && (
                        <Button
                          variant="link"
                          className="px-0 mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(rec.actionUrl!);
                          }}
                        >
                          Podejmij działanie →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl p-12 text-center">
              <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Brak rekomendacji
              </h3>
              <p className="text-sm text-muted-foreground">
                Wróć później, aby zobaczyć spersonalizowane wskazówki zdrowotne.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}