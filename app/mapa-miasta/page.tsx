"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Trophy, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function MapaMiastaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: api.getTeams,
  });

  const { data: territories, isLoading: territoriesLoading } = useQuery({
    queryKey: ["territories"],
    queryFn: api.getTerritories,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
  });

  const userTeam = teams?.find((t) => t.id === user?.teamId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Mapa Miasta</h1>
            <p className="text-muted-foreground">
              Bitwa drużyn o terytoria Łodzi
            </p>
          </div>

          {/* User Team Card */}
          {userTeam && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="rounded-2xl border-2 shadow-lg" style={{ borderColor: userTeam.color }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: userTeam.color }}
                      >
                        {userTeam.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{userTeam.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Twoja drużyna • Dzielnica: {userTeam.district}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full text-lg px-4 py-2">
                      #{userTeam.rank}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">{userTeam.members}</p>
                      <p className="text-xs text-muted-foreground">Członków</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <Trophy className="h-5 w-5 mx-auto mb-1 text-secondary" />
                      <p className="text-2xl font-bold">{userTeam.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Punktów</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted/50">
                      <Target className="h-5 w-5 mx-auto mb-1 text-accent" />
                      <p className="text-2xl font-bold">{userTeam.territoriesControlled}</p>
                      <p className="text-xs text-muted-foreground">Terytoriów</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs defaultValue="map" className="space-y-6">
            <TabsList className="rounded-xl">
              <TabsTrigger value="map" className="rounded-lg">
                <Map className="h-4 w-4 mr-2" />
                Mapa
              </TabsTrigger>
              <TabsTrigger value="teams" className="rounded-lg">
                <Users className="h-4 w-4 mr-2" />
                Drużyny
              </TabsTrigger>
              <TabsTrigger value="territories" className="rounded-lg">
                <Target className="h-4 w-4 mr-2" />
                Terytoria
              </TabsTrigger>
            </TabsList>

            {/* Map Tab */}
            <TabsContent value="map">
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                    <div className="relative z-10 text-center">
                      <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-semibold mb-2">Interaktywna Mapa Łodzi</p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Tutaj będzie wyświetlana mapa miasta z zaznaczonymi terytoriami kontrolowanymi przez drużyny
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-sm">
                      <strong>Jak to działa:</strong> Drużyny zdobywają terytoria poprzez aktywność fizyczną w danym obszarze. 
                      Im więcej członków drużyny jest aktywnych na danym terenie, tym większa szansa na jego przejęcie!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-4">
              {teamsLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Ładowanie drużyn...
                </div>
              ) : teams && teams.length > 0 ? (
                teams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
                      className="rounded-2xl border-2 shadow-lg hover:shadow-xl transition-shadow"
                      style={{ borderColor: team.color }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: team.color }}
                            >
                              #{team.rank}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{team.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                Dzielnica: {team.district}
                              </p>
                            </div>
                          </div>
                          {team.id === user?.teamId && (
                            <Badge variant="default" className="rounded-full">
                              Twoja drużyna
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-lg font-bold">{team.members}</p>
                            <p className="text-xs text-muted-foreground">Członków</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-lg font-bold">{team.points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Punktów</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-lg font-bold">{team.territoriesControlled}</p>
                            <p className="text-xs text-muted-foreground">Terytoriów</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="rounded-2xl p-12 text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Brak drużyn</h3>
                  <p className="text-sm text-muted-foreground">
                    Dołącz do drużyny lub stwórz własną!
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* Territories Tab */}
            <TabsContent value="territories" className="space-y-4">
              {territoriesLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Ładowanie terytoriów...
                </div>
              ) : territories && territories.length > 0 ? (
                territories.map((territory, index) => {
                  const controllingTeam = teams?.find((t) => t.id === territory.controlledBy);
                  
                  return (
                    <motion.div
                      key={territory.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="rounded-2xl border-2 shadow-lg">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{territory.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                Dzielnica: {territory.district}
                              </p>
                            </div>
                            <Badge variant="secondary" className="rounded-full">
                              {territory.points} pkt
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {controllingTeam ? (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                              <div
                                className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: controllingTeam.color }}
                              >
                                {controllingTeam.name[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Kontrolowane przez: {controllingTeam.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Aktywnie bronione
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                              <p className="text-sm font-medium text-accent">
                                🎯 Wolne terytorium - gotowe do przejęcia!
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <Card className="rounded-2xl p-12 text-center">
                  <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Brak terytoriów</h3>
                  <p className="text-sm text-muted-foreground">
                    Terytoria pojawią się wkrótce
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

