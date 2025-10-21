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

  const getStatusColor = (status: LabResult["status"]) => {
    switch (status) {
      case "Normal":
        return "text-green-600";
      case "Abnormal":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Lab Results</h1>
            <p className="text-muted-foreground">
              View and track your laboratory test results
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading lab results...
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
                            <CardTitle className="text-lg">{result.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(result.date).toLocaleDateString("en-GB", {
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
                          {result.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.value && (
                        <div className="p-3 rounded-xl bg-muted/50">
                          <p className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                            {result.value}
                          </p>
                        </div>
                      )}

                      {result.fileUrl && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Detailed report available
                          </span>
                        </div>
                      )}

                      {result.repeatAt && (
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20">
                          <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium">Repeat test recommended</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Scheduled for{" "}
                              {new Date(result.repeatAt).toLocaleDateString("en-GB", {
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
              <h3 className="text-lg font-semibold mb-2">No lab results yet</h3>
              <p className="text-sm text-muted-foreground">
                Your laboratory test results will appear here
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

