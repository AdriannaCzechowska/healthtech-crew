"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { KpiCard } from "@/components/core/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  MapPin,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function DashboardContent() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: api.getTeams,
  });

  const { data: events } = useQuery({
    queryKey: ["neighborhoodEvents"],
    queryFn: api.getNeighborhoodEvents,
  });

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: api.getMessages,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations"],
    queryFn: api.getRecommendations,
  });

  const userTeam = teams?.find((t) => t.id === user?.teamId);
  const unreadCount = messages?.filter((m) => m.unread)?.length ?? 0;
  const upcomingEvents = events?.filter((e) => e.status === "upcoming") || [];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Witaj, {user?.name || "Użytkowniku"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Twój postęp w grze "Łódź w Ruchu"
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <KpiCard
            title="Twoje Punkty"
            value={user?.points.toLocaleString() ?? "0"}
            icon={Trophy}
            description="+250 w tym tygodniu"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <KpiCard
            title="Pozycja Drużyny"
            value={`#${userTeam?.rank || "-"}`}
            icon={Users}
            description={userTeam ? `${userTeam.members} członków` : "Brak drużyny"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Link href="/sasiedzkie-wyjscia">
            <KpiCard
              title="Nadchodzące Wydarzenia"
              value={upcomingEvents.length.toString()}
              icon={Calendar}
              description="Kliknij aby zobaczyć"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Link href="/messages">
            <KpiCard
              title="Wiadomości"
              value={unreadCount.toString()}
              icon={MessageSquare}
              description={unreadCount > 0 ? "Nowe wiadomości" : "Brak nowych"}
            />
          </Link>
        </motion.div>
      </div>

      {/* Team Card */}
      {userTeam && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
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
                      Dzielnica: {userTeam.district}
                    </p>
                  </div>
                </div>
                <Link href="/mapa-miasta">
                  <Button className="rounded-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Zobacz Mapę
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Trophy className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-2xl font-bold">{userTeam.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Punktów drużyny</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <Target className="h-5 w-5 mx-auto mb-1 text-secondary" />
                  <p className="text-2xl font-bold">{userTeam.territoriesControlled}</p>
                  <p className="text-xs text-muted-foreground">Terytoriów</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/50">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-accent" />
                  <p className="text-2xl font-bold">#{userTeam.rank}</p>
                  <p className="text-xs text-muted-foreground">Ranking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="rounded-2xl border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Nadchodzące Wydarzenia
                </CardTitle>
                <Link href="/sasiedzkie-wyjscia">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Zobacz wszystkie
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-xl bg-muted/50 border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(new Date(event.date), "d MMM, HH:mm", { locale: pl })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {event.points} pkt
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Brak nadchodzących wydarzeń</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="rounded-2xl border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Rekomendacje AI
                </CardTitle>
                <Link href="/ai-recommendations">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Zobacz wszystkie
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations && recommendations.length > 0 ? (
                recommendations.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-muted/50 border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{rec.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rec.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          rec.severity === "High"
                            ? "destructive"
                            : rec.severity === "Medium"
                            ? "default"
                            : "secondary"
                        }
                        className="rounded-full"
                      >
                        {rec.severity === "High" && "Wysoki"}
                        {rec.severity === "Medium" && "Średni"}
                        {rec.severity === "Low" && "Niski"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Brak rekomendacji</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <Card className="rounded-2xl border-2 shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle>Szybkie Akcje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/symptom-check">
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 rounded-xl"
                >
                  <Sparkles className="h-6 w-6" />
                  <span className="text-sm">Sprawdź Objawy</span>
                </Button>
              </Link>
              <Link href="/nagrody">
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 rounded-xl"
                >
                  <Gift className="h-6 w-6" />
                  <span className="text-sm">Wymień Nagrody</span>
                </Button>
              </Link>
              <Link href="/mapa-miasta">
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 rounded-xl"
                >
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm">Mapa Miasta</span>
                </Button>
              </Link>
              <Link href="/smart-city-lodz">
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 rounded-xl"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">Smart City</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

