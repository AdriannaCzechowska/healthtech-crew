"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Gift, 
  Crown,
  Medal,
  Star,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { ConfirmDialog } from "@/components/core/ConfirmDialog";

export default function NagrodyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: rewards, isLoading: rewardsLoading } = useQuery({
    queryKey: ["rewards"],
    queryFn: api.getRewards,
  });

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: api.getTeams,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
  });

  const redeemMutation = useMutation({
    mutationFn: (rewardId: string) => api.redeemReward(rewardId),
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setSelectedReward(null);
      }
    },
  });

  const handleRedeem = () => {
    if (selectedReward) {
      redeemMutation.mutate(selectedReward);
    }
  };

  const selectedRewardData = rewards?.find((r) => r.id === selectedReward);
  const canAfford = user && selectedRewardData && user.points >= selectedRewardData.points;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Strefa Nagród</h1>
            <p className="text-muted-foreground">
              Wymień punkty na nagrody i sprawdź ranking drużyn
            </p>
          </div>

          {/* User Points Card */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="rounded-2xl border-2 shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Twoje punkty</p>
                        <p className="text-4xl font-bold">{user.points.toLocaleString()}</p>
                      </div>
                    </div>
                    <Trophy className="h-12 w-12 text-primary/30" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs defaultValue="rewards" className="space-y-6">
            <TabsList className="rounded-xl">
              <TabsTrigger value="rewards" className="rounded-lg">
                <Gift className="h-4 w-4 mr-2" />
                Nagrody
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="rounded-lg">
                <Trophy className="h-4 w-4 mr-2" />
                Ranking
              </TabsTrigger>
            </TabsList>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-4">
              {rewardsLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Ładowanie nagród...
                </div>
              ) : rewards && rewards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewards.map((reward, index) => {
                    const canAffordReward = user && user.points >= reward.points;
                    
                    return (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card 
                          className={`rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all ${
                            !reward.available ? "opacity-60" : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2">{reward.title}</CardTitle>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {reward.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="rounded-full">
                                    {reward.category}
                                  </Badge>
                                  <Badge variant="secondary" className="rounded-full">
                                    {reward.partner}
                                  </Badge>
                                </div>
                              </div>
                              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                                <Gift className="h-6 w-6 text-accent" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold">{reward.points}</span>
                                <span className="text-sm text-muted-foreground">punktów</span>
                              </div>
                              <Button
                                onClick={() => setSelectedReward(reward.id)}
                                disabled={!reward.available || !canAffordReward}
                                className="rounded-full"
                                variant={canAffordReward ? "default" : "outline"}
                              >
                                {!reward.available
                                  ? "Niedostępne"
                                  : !canAffordReward
                                  ? "Za mało punktów"
                                  : "Wymień"}
                              </Button>
                            </div>
                            {!canAffordReward && reward.available && user && (
                              <div className="mt-3 p-2 rounded-lg bg-muted text-sm text-muted-foreground">
                                Brakuje Ci {(reward.points - user.points).toLocaleString()} punktów
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <Card className="rounded-2xl p-12 text-center">
                  <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Brak nagród</h3>
                  <p className="text-sm text-muted-foreground">
                    Nagrody pojawią się wkrótce
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-4">
              {teamsLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Ładowanie rankingu...
                </div>
              ) : teams && teams.length > 0 ? (
                teams.map((team, index) => {
                  const isUserTeam = team.id === user?.teamId;
                  const medals = [
                    { rank: 1, icon: Crown, color: "text-yellow-500" },
                    { rank: 2, icon: Medal, color: "text-gray-400" },
                    { rank: 3, icon: Medal, color: "text-orange-600" },
                  ];
                  const medal = medals.find((m) => m.rank === team.rank);

                  return (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className={`rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all ${
                          isUserTeam ? "ring-2 ring-primary" : ""
                        }`}
                        style={{ borderColor: team.color }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {medal ? (
                                <medal.icon className={`h-10 w-10 ${medal.color}`} />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                                  #{team.rank}
                                </div>
                              )}
                            </div>

                            <div
                              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                              style={{ backgroundColor: team.color }}
                            >
                              {team.name[0]}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold">{team.name}</h3>
                                {isUserTeam && (
                                  <Badge variant="default" className="rounded-full">
                                    Twoja drużyna
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {team.district} • {team.members} członków • {team.territoriesControlled} terytoriów
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end mb-1">
                                <Trophy className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold">
                                  {team.points.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">punktów</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <Card className="rounded-2xl p-12 text-center">
                  <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Brak drużyn w rankingu</h3>
                  <p className="text-sm text-muted-foreground">
                    Dołącz do drużyny i zacznij zdobywać punkty!
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Redeem Confirmation Dialog */}
      <ConfirmDialog
        open={!!selectedReward}
        onOpenChange={(open) => !open && setSelectedReward(null)}
        title="Wymień nagrodę"
        description={
          selectedRewardData
            ? `Czy na pewno chcesz wymienić ${selectedRewardData.points} punktów na "${selectedRewardData.title}"?`
            : ""
        }
        onConfirm={handleRedeem}
        confirmLabel="Wymień"
        cancelLabel="Anuluj"
      />
    </div>
  );
}

