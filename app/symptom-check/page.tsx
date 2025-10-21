"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, AlertCircle, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import type { AIReport } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const symptomSchema = z.object({
  symptoms: z.string().min(3, "Please describe your symptoms"),
  severity: z.number().min(1).max(10),
  duration: z.string().min(1, "Please specify duration"),
  additionalNotes: z.string().optional(),
});

type SymptomFormData = z.infer<typeof symptomSchema>;

export default function SymptomCheckPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [report, setReport] = useState<AIReport | null>(null);
  const [symptomTags, setSymptomTags] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SymptomFormData>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      severity: 5,
    },
  });

  const severityValue = watch("severity");

  const submitMutation = useMutation({
    mutationFn: api.submitSymptomReport,
    onSuccess: (data) => {
      setReport(data);
    },
  });

  const onSubmit = (data: SymptomFormData) => {
    submitMutation.mutate({
      symptoms: symptomTags,
      severity: data.severity,
      duration: data.duration,
      additionalNotes: data.additionalNotes,
    });
  };

  const addSymptom = () => {
    if (currentSymptom.trim() && !symptomTags.includes(currentSymptom.trim())) {
      setSymptomTags([...symptomTags, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptomTags(symptomTags.filter((s) => s !== symptom));
  };

  const getUrgencyColor = (urgency: AIReport["urgency"]) => {
    switch (urgency) {
      case "Emergency":
        return "destructive";
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return "text-red-600";
    if (severity >= 4) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Symptom Check</h1>
            <p className="text-muted-foreground">
              AI-powered symptom analysis and triage guidance
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
                    <CardTitle>Describe Your Symptoms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Symptom Tags */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Symptoms</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., headache, fever, cough"
                          value={currentSymptom}
                          onChange={(e) => setCurrentSymptom(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSymptom();
                            }
                          }}
                          className="rounded-xl"
                        />
                        <Button
                          type="button"
                          onClick={addSymptom}
                          className="rounded-xl"
                        >
                          Add
                        </Button>
                      </div>
                      {symptomTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {symptomTags.map((symptom) => (
                            <Badge
                              key={symptom}
                              variant="secondary"
                              className="rounded-full px-3 py-1"
                            >
                              {symptom}
                              <button
                                type="button"
                                onClick={() => removeSymptom(symptom)}
                                className="ml-2"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      {symptomTags.length === 0 && (
                        <p className="text-xs text-destructive">
                          Please add at least one symptom
                        </p>
                      )}
                    </div>

                    {/* Severity Slider */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Severity (1-10)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register("severity", { valueAsNumber: true })}
                          className="flex-1"
                        />
                        <span
                          className={`text-2xl font-bold ${getSeverityColor(
                            severityValue
                          )}`}
                        >
                          {severityValue}
                        </span>
                      </div>
                      {errors.severity && (
                        <p className="text-xs text-destructive">
                          {errors.severity.message}
                        </p>
                      )}
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        How long have you had these symptoms?
                      </label>
                      <Input
                        {...register("duration")}
                        placeholder="e.g., 2 days, 1 week"
                        className="rounded-xl"
                      />
                      {errors.duration && (
                        <p className="text-xs text-destructive">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Additional Notes (Optional)
                      </label>
                      <Textarea
                        {...register("additionalNotes")}
                        placeholder="Any other relevant information..."
                        className="rounded-xl min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitMutation.isPending || symptomTags.length === 0}
                      className="w-full rounded-xl"
                      size="lg"
                    >
                      {submitMutation.isPending ? "Analyzing..." : "Analyze Symptoms"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-primary" />
                      <CardTitle>Analysis Results</CardTitle>
                    </div>
                    <Badge
                      variant={getUrgencyColor(report.urgency)}
                      className="rounded-full"
                    >
                      {report.urgency} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Symptoms Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Reported Symptoms:</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="rounded-full">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold mb-2">AI Analysis:</h3>
                    <p className="text-sm">{report.analysis}</p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-3">Recommended Actions:</h3>
                    <div className="space-y-2">
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
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setReport(null);
                        setSymptomTags([]);
                        reset();
                      }}
                      variant="outline"
                      className="rounded-xl flex-1"
                    >
                      New Check
                    </Button>
                    <Button className="rounded-xl flex-1">
                      Schedule Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

