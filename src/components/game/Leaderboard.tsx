import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface LeaderboardEntry {
  username: string;
  highest_prize: number;
  games_played: number;
}

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from("leaderboard")
        .select("*")
        .order("highest_prize", { ascending: false });

      if (data) {
        setLeaderboard(data);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Ranking</h2>
      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.username}
            className="flex items-center justify-between p-4 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{index + 1}º</span>
              <div>
                <p className="font-medium">{entry.username}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.games_played} partidas jogadas
                </p>
              </div>
            </div>
            <span className="text-xl font-bold">
              R$ {entry.highest_prize.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;
