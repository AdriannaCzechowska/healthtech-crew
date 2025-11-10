"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { AIReport } from "@/lib/types";

export default function SymptomCheckPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [report, setReport] = useState<AIReport | null>(null);

  const symptomsList = [
    "Gorączka",
    "Kaszel",
    "Ból głowy",
    "Ból gardła",
    "Katar",
    "Duszność",
    "Zmęczenie",
    "Ból mięśni",
    "Nudności",
    "Ból brzucha",
    "Wysypka",
    "Zawroty głowy",
    "Utrata smaku lub węchu",
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = useMutation({
    mutationFn: async (symptoms: string[]) => {
      // symulacja „analizy AI” – w prawdziwej wersji możesz podpiąć backend lub model
      const seriousSymptoms = ["Duszność", "Gorączka", "Ból w klatce piersiowej"];
      const moderateSymptoms = ["Ból głowy", "Ból brzucha", "Wysypka", "Nudności"];

      const hasSerious = symptoms.some((s) => seriousSymptoms.includes(s));
      const hasModerate = symptoms.some((s) => moderateSymptoms.includes(s));

      let urgency: "Emergency" | "High" | "Medium" | "Low" = "Low";
      let recommendation = "";

      if (hasSerious) {
        urgency = "Emergency";
        recommendation =
          "Twoje objawy mogą być poważne. Skontaktuj się natychmiast z lekarzem lub udaj się na ostry dyżur.";
      } else if (hasModerate && symptoms.length > 2) {
        urgency = "High";
        recommendation =
          "Objawy sugerują umiarkowane ryzyko. Wskazana konsultacja lekarska w najbliższych dniach.";
      } else if (hasModerate) {
        urgency = "Medium";
        recommendation =
          "Objawy wydają się łagodne. Obserwuj swój stan i odpoczywaj.";
      } else {
        urgency = "Low";
        recommendation =
          "Objawy są łagodne i nie wskazują na poważny stan. Pamiętaj o odpoczynku i nawodnieniu.";
      }

      return {
        symptoms,
        urgency,
        analysis: `Na podstawie wybranych objawów: ${symptoms.join(", ")}, poziom ryzyka został oceniony jako: ${urgency}.`,
        recommendations: [recommendation],
      } as AIReport;
    },
    onSuccess: (data) => {
      setReport(data);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Sprawdź Objawy</h1>
            <p className="text-muted-foreground">
              Wybierz swoje objawy i sprawdź, czy potrzebna jest konsultacja lekarska
            </p>
          </div>

          {!report ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    <CardTitle>Wybierz objawy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {symptomsList.map((symptom) => (
                      <label
                        key={symptom}
                        className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer ${
                          selectedSymptoms.includes(symptom)
                            ? "bg-primary/10 border border-primary"
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <Checkbox
                          checked={selectedSymptoms.includes(symptom)}
                          onCheckedChange={() => toggleSymptom(symptom)}
                        />
                        <span className="text-sm">{symptom}</span>
                      </label>
                    ))}
                  </div>

                  <Button
                    onClick={() => analyzeSymptoms.mutate(selectedSymptoms)}
                    disabled={selectedSymptoms.length === 0}
                    className="w-full rounded-xl"
                    size="lg"
                  >
                    {analyzeSymptoms.isPending ? "Analizowanie..." : "Analizuj objawy"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-primary" />
                      <CardTitle>Wyniki analizy</CardTitle>
                    </div>
                    <Badge
                      variant={
                        report.urgency === "Emergency"
                          ? "destructive"
                          : report.urgency === "High"
                          ? "secondary"
                          : "default"
                      }
                      className="rounded-full"
                    >
                      Priorytet: {report.urgency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Wybrane objawy:</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="rounded-full">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold mb-2">Analiza:</h3>
                    <p className="text-sm">{report.analysis}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Zalecenia:</h3>
                    {report.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-xl bg-secondary/10"
                      >
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      setReport(null);
                      setSelectedSymptoms([]);
                    }}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    Nowe sprawdzenie
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
