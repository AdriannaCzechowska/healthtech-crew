"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Wind,
  Flower2,
  Route,
  Calendar,
  TrendingUp,
  MapPin,
  Activity,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SmartCityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: cityData, isLoading } = useQuery({
    queryKey: ["smartCity"],
    queryFn: api.getSmartCityData,
  });

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-600";
    if (aqi <= 100) return "text-yellow-600";
    if (aqi <= 150) return "text-orange-600";
    return "text-red-600";
  };

  const getAQIBadge = (level: string) => {
    const colors: Record<string, string> = {
      Good: "secondary",
      Moderate: "default",
      Unhealthy: "destructive",
    };
    return colors[level] || "default";
  };

  const getPollenBadge = (level: string) => {
    const colors: Record<string, string> = {
      Low: "secondary",
      Moderate: "default",
      High: "destructive",
    };
    return colors[level] || "default";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Smart City Health Insights</h1>
            <p className="text-muted-foreground">
              Urban environmental data and community health resources
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading city data...
            </div>
          ) : cityData ? (
            <Tabs defaultValue="environment" className="space-y-6">
              <TabsList className="rounded-xl">
                <TabsTrigger value="environment" className="rounded-lg">
                  <Wind className="h-4 w-4 mr-2" />
                  Environment
                </TabsTrigger>
                <TabsTrigger value="routes" className="rounded-lg">
                  <Route className="h-4 w-4 mr-2" />
                  Routes
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="rounded-lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Campaigns
                </TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-lg">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Environment Tab */}
              <TabsContent value="environment" className="space-y-4">
                {/* Air Quality Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wind className="h-6 w-6 text-primary" />
                          <CardTitle>Air Quality Index</CardTitle>
                        </div>
                        <Badge
                          variant={getAQIBadge(cityData.airQuality.level) as any}
                          className="rounded-full"
                        >
                          {cityData.airQuality.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-6">
                        <div
                          className={`text-6xl font-bold ${getAQIColor(
                            cityData.airQuality.aqi
                          )}`}
                        >
                          {cityData.airQuality.aqi}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Current AQI Level
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {cityData.airQuality.pollutants.map((pollutant) => (
                          <div
                            key={pollutant.name}
                            className="p-3 rounded-xl bg-muted/50"
                          >
                            <p className="text-xs text-muted-foreground">
                              {pollutant.name}
                            </p>
                            <p className="text-lg font-bold">
                              {pollutant.value} {pollutant.unit}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <p className="text-sm">
                          <strong>Health Tip:</strong> Air quality is good today.
                          Perfect conditions for outdoor activities and exercise.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Pollen Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="rounded-2xl border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flower2 className="h-6 w-6 text-secondary" />
                          <CardTitle>Pollen Levels</CardTitle>
                        </div>
                        <Badge
                          variant={getPollenBadge(cityData.pollen.level) as any}
                          className="rounded-full"
                        >
                          {cityData.pollen.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {cityData.pollen.types.map((type) => (
                          <div
                            key={type.name}
                            className="p-3 rounded-xl bg-muted/50 text-center"
                          >
                            <p className="text-sm font-medium">{type.name}</p>
                            <Badge
                              variant={getPollenBadge(type.level) as any}
                              className="rounded-full mt-2"
                            >
                              {type.level}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                        <p className="text-sm">
                          <strong>Forecast:</strong> {cityData.pollen.forecast}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Routes Tab */}
              <TabsContent value="routes" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Recommended Walking Routes
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Health-optimized routes based on air quality and green spaces
                  </p>
                </div>

                {cityData.walkingRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-accent" />
                            <CardTitle className="text-lg">{route.name}</CardTitle>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="rounded-full">
                              {route.distance} km
                            </Badge>
                            <Badge variant="outline" className="rounded-full">
                              {route.duration} min
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Green Score
                              </p>
                              <p className="text-lg font-bold text-green-600">
                                {route.greenScore}%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Air Quality
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                {route.airQualityScore}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Campaigns Tab */}
              <TabsContent value="campaigns" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Community Health Campaigns
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Free health screenings and educational programs in your area
                  </p>
                </div>

                {cityData.healthCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border-2 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {campaign.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {campaign.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="rounded-full">
                            {campaign.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{campaign.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(campaign.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    District Health Analytics
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Preventive care participation and health scores by district
                  </p>
                </div>

                {cityData.districtHealth.map((district, index) => (
                  <motion.div
                    key={district.district}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border-2 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">
                              {district.district} District
                            </CardTitle>
                          </div>
                          <Badge
                            variant={
                              district.healthScore >= 85
                                ? "secondary"
                                : district.healthScore >= 75
                                ? "default"
                                : "destructive"
                            }
                            className="rounded-full"
                          >
                            Score: {district.healthScore}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 rounded-xl bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                              Participation
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              {district.participationRate}%
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-xl bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                              Screenings
                            </p>
                            <p className="text-2xl font-bold text-secondary">
                              {district.screeningsConducted.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-xl bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                              Health Score
                            </p>
                            <p className="text-2xl font-bold text-accent">
                              {district.healthScore}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              Participation Rate
                            </span>
                            <span className="font-medium">
                              {district.participationRate}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${district.participationRate}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="rounded-2xl p-12 text-center">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No city data available</h3>
              <p className="text-sm text-muted-foreground">
                Smart city data will be available soon
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

