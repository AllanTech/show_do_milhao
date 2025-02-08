import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import LoginContainer from "./auth/LoginContainer";
import GameContainer from "./game/GameContainer";
import Leaderboard from "./game/Leaderboard";
import { Button } from "./ui/button";

const Home = () => {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUsername(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUsername(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUsername = async (userId: string) => {
    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("id", userId)
      .single();

    if (data) {
      setUsername(data.username);
    }
  };

  const handleSignIn = async (provider: string) => {
    if (provider === "github") {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: window.location.origin,
        },
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUsername("");
  };

  const handleGameEnd = (prize: number) => {
    setIsPlaying(false);
    setShowLeaderboard(true);
  };

  if (!session) {
    return (
      <LoginContainer
        onProviderSelect={handleSignIn}
        authStatus="idle"
        statusMessage="Faça login para jogar o Show do Milhão!"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Show do Milhão</h1>
          <div className="flex items-center gap-4">
            <span>Olá, {username}</span>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>

        {!isPlaying && !showLeaderboard && (
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" onClick={() => setIsPlaying(true)}>
              Começar Novo Jogo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowLeaderboard(true)}
            >
              Ver Ranking
            </Button>
          </div>
        )}

        {isPlaying && (
          <GameContainer userId={session.user.id} onGameEnd={handleGameEnd} />
        )}

        {showLeaderboard && (
          <div>
            <Leaderboard />
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowLeaderboard(false)}
              >
                Voltar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
