"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Visit } from "@/lib/types";

export default function VisitsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: visits, isLoading } = useQuery({
    queryKey: ["visits"],
    queryFn: api.getVisits,
  });

  const upcomingVisits = visits?.filter((v) => new Date(v.date) >= new Date());
  const pastVisits = visits?.filter((v) => new Date(v.date) < new Date());

  const getStatusVariant = (status: Visit["status"]) => {
    switch (status) {
      case "Confirmed":
        return "default";
      case "Pending":
        return "secondary";
      case "Cancelled":
        return "destructive";
    }
  };

  const translateStatus = (status: Visit["status"]) => {
    switch (status) {
      case "Confirmed":
        return "Potwierdzona";
      case "Pending":
        return "Oczekująca";
      case "Cancelled":
        return "Anulowana";
      default:
        return status;
    }
  };
// --- Tłumaczenia nazw, miejsc i notatek wizyt ---

const translateVisitNotes = (text: string) => {
  switch (text) {
    case "Follow-up for test results":
      return "Wizyta kontrolna po wynikach badań";
    case "Annual cardiovascular screening":
      return "Coroczne badanie kardiologiczne";
    case "Skin check completed":
      return "Kontrola dermatologiczna zakończona";
    case "Annual physical examination":
      return "Roczne badanie ogólne";
    default:
      return text;
  }
};

const translateSpecialty = (specialty: string) => {
  switch (specialty) {
    case "General Practice":
      return "Medycyna rodzinna";
    case "Cardiology":
      return "Kardiologia";
    case "Dermatology":
      return "Dermatologia";
    default:
      return specialty;
  }
};

const translatePlace = (place: string) => {
  switch (place) {
    case "City Health Clinic":
      return "Miejska Przychodnia Zdrowia";
    case "Cardiology Centre":
      return "Centrum Kardiologiczne";
    default:
      return place;
  }
};

// --- Komponent VisitCard ---

const VisitCard = ({ visit, index }: { visit: Visit; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Card className="rounded-2xl p-4 border-2 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{visit.doctor}</h3>
          <p className="text-sm text-muted-foreground">
            {translateSpecialty(visit.specialty ?? "")
}
          </p>
        </div>
        <Badge variant={getStatusVariant(visit.status)} className="rounded-full">
          {translateStatus(visit.status)}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(visit.date).toLocaleDateString("pl-PL", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="text-muted-foreground">
          <p>📍 {translatePlace(visit.place)}</p>
        </div>

        {visit.notes && (
          <div className="mt-2 p-2 rounded-lg bg-muted/50">
            <p className="text-xs">{translateVisitNotes(visit.notes)}</p>
          </div>
        )}
      </div>
    </Card>
  </motion.div>
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Wizyty lekarskie</h1>
            <p className="text-muted-foreground">
              Zarządzaj swoimi terminami wizyt i konsultacji medycznych.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Ładowanie wizyt...
            </div>
          ) : (
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList className="rounded-xl">
                <TabsTrigger value="upcoming" className="rounded-lg">
                  Nadchodzące ({upcomingVisits?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="past" className="rounded-lg">
                  Archiwalne ({pastVisits?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingVisits && upcomingVisits.length > 0 ? (
                  upcomingVisits.map((visit, index) => (
                    <VisitCard key={visit.id} visit={visit} index={index} />
                  ))
                ) : (
                  <Card className="rounded-2xl p-12 text-center">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Brak nadchodzących wizyt
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Umów się na wizytę u swojego lekarza.
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastVisits && pastVisits.length > 0 ? (
                  pastVisits.map((visit, index) => (
                    <VisitCard key={visit.id} visit={visit} index={index} />
                  ))
                ) : (
                  <Card className="rounded-2xl p-12 text-center">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Brak archiwalnych wizyt
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Historia Twoich wizyt pojawi się tutaj po zakończonych spotkaniach.
                    </p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
