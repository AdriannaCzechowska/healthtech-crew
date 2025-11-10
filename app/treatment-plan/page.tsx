"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/core/ProgressBar";
import { TrendingUp, Activity, Droplet, Utensils, Pill } from "lucide-react";
import { motion } from "framer-motion";
import type { Task } from "@/lib/types";

export default function TreatmentPlanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: treatmentPlan, isLoading } = useQuery({
    queryKey: ["treatmentPlan"],
    queryFn: api.getTreatmentPlan,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, done }: { taskId: string; done: boolean }) =>
      api.updateTaskStatus(taskId, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatmentPlan"] });
    },
  });

  const getGroupIcon = (group: Task["group"]) => {
    switch (group) {
      case "Activity":
        return <Activity className="h-4 w-4" />;
      case "Hydration":
        return <Droplet className="h-4 w-4" />;
      case "Diet":
        return <Utensils className="h-4 w-4" />;
      case "Medication":
        return <Pill className="h-4 w-4" />;
    }
  };

  const groupedTasks = treatmentPlan?.tasks.reduce((acc, task) => {
    if (!acc[task.group]) {
      acc[task.group] = [];
    }
    acc[task.group].push(task);
    return acc;
  }, {} as Record<string, Task[]>);


  const taskLabelTranslations: Record<string, string> = {
    "30 minutes walking": "30 minut spaceru",
    "20 minutes cardio exercise": "20 minut ćwiczeń cardio",
    "Meditation or relaxation": "Medytacja lub relaks",
    "Drink 2L water": "Wypij 2 litry wody",
    "Take vitamin D supplement": "Przyjmij suplement witaminy D",
    "Eat 5 portions of vegetables": "Zjedz 5 porcji warzyw",
  };


  const taskFrequencyTranslations: Record<string, string> = {
    "Daily": "Codziennie",
    "3x per week": "3 razy w tygodniu",
    "Weekly": "Raz w tygodniu",
    "Monthly": "Raz w miesiącu",
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Plan Leczenia</h1>
            <p className="text-muted-foreground">
              Śledź swoje codzienne cele zdrowotne i postępy
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Ładowanie planu leczenia...
            </div>
          ) : treatmentPlan ? (
            <div className="space-y-6">
              {/* Karta z podsumowaniem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <CardTitle>
                          {treatmentPlan.name ===
                          "Preventive Health & Wellness Plan"
                            ? "Plan profilaktyki i dobrostanu"
                            : treatmentPlan.name}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="rounded-full text-sm">
                        {treatmentPlan.motivation === "High"
                          ? "Wysoka motywacja"
                          : "Motywacja"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ProgressBar
                      value={treatmentPlan.progress}
                      label="Postęp ogólny"
                      color="primary"
                    />
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Rozpoczęto</p>
                        <p className="font-medium">
                          {new Date(treatmentPlan.startDate).toLocaleDateString("pl-PL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ukończone zadania</p>
                        <p className="font-medium">
                          {treatmentPlan.tasks.filter((t) => t.done).length} z{" "}
                          {treatmentPlan.tasks.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Grupy zadań */}
              <div className="grid gap-4 md:grid-cols-2">
                {groupedTasks &&
                  Object.entries(groupedTasks).map(([group, tasks], groupIndex) => {
                    const translatedGroup =
                      group === "Activity"
                        ? "Aktywność"
                        : group === "Hydration"
                        ? "Nawodnienie"
                        : group === "Diet"
                        ? "Dieta"
                        : group === "Medication"
                        ? "Leki"
                        : group;

                    return (
                      <motion.div
                        key={group}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                      >
                        <Card className="rounded-2xl border-2 shadow-lg">
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              {getGroupIcon(group as Task["group"])}
                              <CardTitle className="text-lg">{translatedGroup}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {tasks.map((task, taskIndex) => (
                                <motion.div
                                  key={task.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: taskIndex * 0.05,
                                  }}
                                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <Checkbox
                                    id={task.id}
                                    checked={task.done}
                                    onCheckedChange={(checked) =>
                                      updateTaskMutation.mutate({
                                        taskId: task.id,
                                        done: checked as boolean,
                                      })
                                    }
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1">
                                    <label
                                      htmlFor={task.id}
                                      className={`text-sm font-medium cursor-pointer ${
                                        task.done
                                          ? "line-through text-muted-foreground"
                                          : ""
                                      }`}
                                    >
                                      {taskLabelTranslations[task.label] || task.label}

                                    </label>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {taskFrequencyTranslations[task.frequency] || task.frequency}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <Card className="rounded-2xl p-12 text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nie znaleziono planu leczenia
              </h3>
              <p className="text-sm text-muted-foreground">
                Skontaktuj się ze swoim lekarzem, aby utworzyć spersonalizowany plan
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
