"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Trophy,
  Footprints,
  Bike,
  Dumbbell
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default function SasiedzkeWyjsciaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["neighborhoodEvents"],
    queryFn: api.getNeighborhoodEvents,
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: api.getTeams,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
  });

  const joinEventMutation = useMutation({
    mutationFn: (eventId: string) => api.joinEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["neighborhoodEvents"] });
    },
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "walk":
        return <Footprints className="h-5 w-5" />;
      case "run":
        return <Footprints className="h-5 w-5" />;
      case "bike":
        return <Bike className="h-5 w-5" />;
      case "workout":
        return <Dumbbell className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "walk":
        return "Spacer";
      case "run":
        return "Bieg";
      case "bike":
        return "Rower";
      case "workout":
        return "Trening";
      default:
        return "Wydarzenie";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="secondary" className="rounded-full">
            Nadchodzące
          </Badge>
        );
      case "ongoing":
        return (
          <Badge variant="default" className="rounded-full">
            W trakcie
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="rounded-full">
            Zakończone
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Sąsiedzkie Wyjścia</h1>
            <p className="text-muted-foreground">
              Organizuj i dołączaj do wspólnych aktywności w Twojej dzielnicy
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {events?.filter((e) => e.status === "upcoming").length || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Nadchodzące wydarzenia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {events?.reduce((sum, e) => sum + e.participants, 0) || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Aktywnych uczestników</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="rounded-2xl border-2 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {events?.reduce((sum, e) => sum + e.points, 0) || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">Punktów do zdobycia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Ładowanie wydarzeń...
              </div>
            ) : events && events.length > 0 ? (
              events.map((event, index) => {
                const team = teams?.find((t) => t.id === event.teamId);
                const spotsLeft = event.maxParticipants - event.participants;
                const isUserTeam = team?.id === user?.teamId;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getEventIcon(event.type)}
                              <CardTitle className="text-xl">{event.title}</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className="rounded-full">
                                {getEventTypeLabel(event.type)}
                              </Badge>
                              {getStatusBadge(event.status)}
                              {isUserTeam && (
                                <Badge variant="default" className="rounded-full">
                                  Twoja drużyna
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {format(new Date(event.date), "d MMMM yyyy, HH:mm", {
                                    locale: pl,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>
                                  {event.participants}/{event.maxParticipants} uczestników
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Trophy className="h-4 w-4" />
                                <span>{event.points} punktów</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {team && (
                              <div
                                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: team.color }}
                                title={team.name}
                              >
                                {team.name[0]}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-sm">
                            <p className="text-muted-foreground">Organizator:</p>
                            <p className="font-medium">{event.organizer}</p>
                          </div>

                          {event.status === "upcoming" && (
                            <Button
                              onClick={() => joinEventMutation.mutate(event.id)}
                              disabled={
                                spotsLeft === 0 || joinEventMutation.isPending
                              }
                              className="rounded-full"
                            >
                              {spotsLeft === 0
                                ? "Brak miejsc"
                                : joinEventMutation.isPending
                                ? "Dołączanie..."
                                : "Dołącz"}
                            </Button>
                          )}
                        </div>

                        {spotsLeft > 0 && spotsLeft <= 5 && event.status === "upcoming" && (
                          <div className="mt-3 p-2 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent">
                            ⚡ Zostało tylko {spotsLeft} {spotsLeft === 1 ? "miejsce" : "miejsca"}!
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <Card className="rounded-2xl p-12 text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Brak wydarzeń</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Bądź pierwszą osobą, która zorganizuje wydarzenie w Twojej dzielnicy!
                </p>
                <Button className="rounded-full">Stwórz wydarzenie</Button>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

