"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressBar } from "@/components/core/ProgressBar";
import {
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SmartCityLodzPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["smartCityData"],
    queryFn: api.getSmartCityData,
  });

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Dobra", color: "text-green-600", bg: "bg-green-100" };
    if (aqi <= 100) return { label: "Umiarkowana", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (aqi <= 150) return { label: "Niezdrowa dla wrażliwych", color: "text-orange-600", bg: "bg-orange-100" };
    return { label: "Niezdrowa", color: "text-red-600", bg: "bg-red-100" };
  };

  const getPollenLevel = (level: string) => {
    switch (level) {
      case "low":
        return { label: "Niski", color: "text-green-600" };
      case "medium":
        return { label: "Średni", color: "text-yellow-600" };
      case "high":
        return { label: "Wysoki", color: "text-orange-600" };
      case "very-high":
        return { label: "Bardzo wysoki", color: "text-red-600" };
      default:
        return { label: "Nieznany", color: "text-gray-600" };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="md:pl-64 pt-16">
          <div className="container py-6 px-4">
            <div className="text-center py-12 text-muted-foreground">
              Ładowanie danych Smart City...
            </div>
          </div>
        </main>
      </div>
    );
  }

  const aqiStatus = data ? getAQIStatus(data.airQuality.aqi) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Smart City Łódź</h1>
            <p className="text-muted-foreground">
              Dane środowiskowe i zdrowotne miasta w czasie rzeczywistym
            </p>
          </div>

          <Tabs defaultValue="environment" className="space-y-6">
            <TabsList className="rounded-xl">
              <TabsTrigger value="environment" className="rounded-lg">
                <Leaf className="h-4 w-4 mr-2" />
                Środowisko
              </TabsTrigger>
              <TabsTrigger value="routes" className="rounded-lg">
                <MapPin className="h-4 w-4 mr-2" />
                Trasy
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="rounded-lg">
                <Activity className="h-4 w-4 mr-2" />
                Kampanie
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analityka
              </TabsTrigger>
            </TabsList>

            {/* Environment Tab */}
            <TabsContent value="environment" className="space-y-6">
              {/* Air Quality */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-primary" />
                        <CardTitle>Jakość Powietrza</CardTitle>
                      </div>
                      {aqiStatus && (
                        <Badge className={`rounded-full ${aqiStatus.bg} ${aqiStatus.color}`}>
                          {aqiStatus.label}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">
                        Wskaźnik AQI
                      </p>
                      <p className="text-5xl font-bold">{data?.airQuality.aqi}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Pomiar z Piotrkowskiej, Łódź
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {data?.airQuality.pollutants.map((pollutant) => (
                        <div
                          key={pollutant.name}
                          className="p-3 rounded-xl bg-muted/50 border"
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            {pollutant.name}
                          </p>
                          <p className="text-lg font-bold">{pollutant.value} µg/m³</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-start gap-2">
                        {data && data.airQuality.aqi <= 50 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium mb-1">Wskazówka zdrowotna</p>
                          <p className="text-sm text-muted-foreground">
                            {data && data.airQuality.aqi <= 50
                              ? "Doskonałe warunki do aktywności na świeżym powietrzu! Skorzystaj z tras spacerowych w parkach."
                              : "Rozważ aktywność w pomieszczeniach lub wybierz tereny z lepszą jakością powietrza."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pollen Levels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="rounded-2xl border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-secondary" />
                      <CardTitle>Poziom Pyłków</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {data?.pollen.types.map((pollen) => {
                      const level = getPollenLevel(pollen.level.toLowerCase());
                      return (
                        <div key={pollen.name} className="p-3 rounded-xl bg-muted/50 border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{pollen.name}</span>
                            <Badge variant="outline" className={`rounded-full ${level.color}`}>
                              {level.label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    <div className="p-3 rounded-xl bg-muted/50 border">
                      <p className="text-sm text-muted-foreground">
                        <strong>Prognoza:</strong> {data?.pollen.forecast}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>


            </TabsContent>

            {/* Routes Tab */}
            <TabsContent value="routes" className="space-y-4">
              {data?.walkingRoutes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Dystans</p>
                          <p className="text-lg font-bold">{route.distance} km</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Czas</p>
                          <p className="text-lg font-bold">{route.duration} min</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Ocena zieleni</span>
                          <span className="font-medium">{route.greenScore}/10</span>
                        </div>
                        <ProgressBar value={(route.greenScore / 10) * 100} showPercentage={false} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Jakość powietrza</span>
                          <span className="font-medium">{route.airQualityScore}/10</span>
                        </div>
                        <ProgressBar value={(route.airQualityScore / 10) * 100} showPercentage={false} />
                      </div>


                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-4">
              {data?.healthCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.title}</CardTitle>
                        <Badge variant="secondary" className="rounded-full">
                          {campaign.type === "screening" && "Badanie"}
                          {campaign.type === "education" && "Edukacja"}
                          {campaign.type === "support" && "Wsparcie"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{campaign.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="h-4 w-4" />
                          <span>{campaign.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              {data?.districtHealth.map((district, index) => (
                <motion.div
                  key={district.district}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">{district.district}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Udział w profilaktyce</span>
                          <span className="font-medium">{district.participationRate}%</span>
                        </div>
                        <ProgressBar value={district.participationRate} showPercentage={false} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Wykonane badania</span>
                          <span className="font-medium">{district.screeningsConducted.toLocaleString()}</span>
                        </div>
                        <ProgressBar value={(district.screeningsConducted / 5000) * 100} showPercentage={false} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Wskaźnik zdrowia</span>
                          <span className="font-medium">{district.healthScore}/100</span>
                        </div>
                        <ProgressBar value={district.healthScore} showPercentage={false} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

