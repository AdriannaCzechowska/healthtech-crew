"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { LabResult } from "@/lib/types";

export default function LabResultsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: labResults, isLoading } = useQuery({
    queryKey: ["labResults"],
    queryFn: api.getLabResults,
  });



  const getDescription = (result: LabResult): string | undefined => {
    const anyResult = result as any; 
    return anyResult.description ?? anyResult.summary ?? undefined;
  };

  const getStatusVariant = (status: LabResult["status"]) => {
    switch (status) {
      case "Normal":
        return "secondary";
      case "Abnormal":
        return "destructive";
      case "Pending":
        return "default";
    }
  };

  const getStatusLabel = (status: LabResult["status"]) => {
    switch (status) {
      case "Normal":
        return "Prawidłowy";
      case "Abnormal":
        return "Nieprawidłowy";
      case "Pending":
        return "W trakcie";
      default:
        return status;
    }
  };

  const translateTestName = (name?: string) => {
    switch (name) {
      case "Complete Blood Count":
        return "Morfologia krwi";
      case "Lipid Panel":
        return "Profil lipidowy";
      case "Vitamin D Level":
        return "Poziom witaminy D";
      case "Thyroid Function":
        return "Funkcja tarczycy";
      default:
        return name || "Nieznane badanie";
    }
  };

  const translateValue = (value?: string) => {
    if (!value) return "";
    return value
      .replace("(Low)", "(Niski)")
      .replace("(High)", "(Wysoki)")
      .replace("(Normal)", "(Prawidłowy)")
      .replace("Total cholesterol", "Cholesterol całkowity")
      .replace("TSH", "TSH");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Wyniki badań laboratoryjnych</h1>
            <p className="text-muted-foreground">
              Przeglądaj i śledź swoje wyniki badań laboratoryjnych
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Ładowanie wyników badań...
            </div>
          ) : labResults && labResults.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {labResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-xl ${
                              result.status === "Normal"
                                ? "bg-secondary/10 text-secondary"
                                : result.status === "Abnormal"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <FlaskConical className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {translateTestName(result.name ?? "")}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(result.date).toLocaleDateString("pl-PL", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={getStatusVariant(result.status)}
                          className="rounded-full"
                        >
                          {getStatusLabel(result.status)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {result.value && (
                        <div className="p-3 rounded-xl bg-muted/50">
                          <p
                            className={`text-sm font-medium ${
                              result.status === "Abnormal"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {translateValue(result.value)}
                          </p>
                        </div>
                      )}

                     

                      {result.fileUrl && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Dostępny szczegółowy raport
                          </span>
                        </div>
                      )}

                      {result.repeatAt && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20">
                          <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium">
                              Zalecane powtórzenie badania
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Zaplanowano na{" "}
                              {new Date(result.repeatAt).toLocaleDateString("pl-PL", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl p-12 text-center">
              <FlaskConical className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Brak wyników badań</h3>
              <p className="text-sm text-muted-foreground">
                Twoje wyniki badań laboratoryjnych pojawią się tutaj po ich dodaniu.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
